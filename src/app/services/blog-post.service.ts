import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    date: string; // human-friendly date
    isoDate?: string; // ISO date for sorting
    readTime: string;
    category: string;
    link: string;
    source?: 'debuggerme' | 'jamith';
}

@Injectable({ providedIn: 'root' })
export class BlogPostService {
    private readonly apiUrl = 'https://debuggerme.com/wp-json/wp/v2/posts?_embed&per_page=3'; // _embed gets image & categories
    private readonly rssFeedUrl = 'https://blog.jamith.com/rss.xml';
    private readonly EXCERPT_MAX = 100; // limit excerpt to 100 characters

    constructor(private http: HttpClient) {}

    getRecentPosts(): Observable<BlogPost[]> {
        return forkJoin([this.getWordpressPosts(), this.getRssFeedPosts()]).pipe(
            map(([wpPosts, rssPosts]: [BlogPost[], BlogPost[]]) => {
                const combined = [...wpPosts, ...rssPosts];
                combined.sort((a, b) => {
                    const aTime = a.isoDate ? new Date(a.isoDate).getTime() : Date.parse(a.date);
                    const bTime = b.isoDate ? new Date(b.isoDate).getTime() : Date.parse(b.date);
                    return bTime - aTime;
                });
                return combined.slice(0, 6);
            })
        );
    }

    private getWordpressPosts(): Observable<BlogPost[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            map((posts: any[]) => posts.map((post: any) => this.mapToBlogPost(post, 'debuggerme')))
        );
    }

    private getRssFeedPosts(): Observable<BlogPost[]> {
        return this.http.get(this.rssFeedUrl, { responseType: 'text' }).pipe(
            map((xml: string) => {
                try {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(xml, 'application/xml');
                    // Support both RSS (<item>) and Atom (<entry>) feeds
                    const rssItems = Array.from(doc.getElementsByTagName('item')) as Element[];
                    if (rssItems.length > 0) {
                        return rssItems.map((item: Element) => this.mapRssItemToBlogPost(item));
                    }

                    const atomEntries = Array.from(doc.getElementsByTagName('entry')) as Element[];
                    if (atomEntries.length > 0) {
                        return atomEntries.map((entry: Element) => this.mapAtomEntryToBlogPost(entry));
                    }

                    // fallback: try items by localName
                    const fallbackItems = Array.from(doc.getElementsByTagName('*')).filter(n => (n.localName || '').toLowerCase() === 'item');
                    if (fallbackItems.length > 0) return fallbackItems.map((it: any) => this.mapRssItemToBlogPost(it));

                    return [] as BlogPost[];
                } catch (e) {
                    console.error('Failed to parse RSS/Atom feed', e);
                    return [] as BlogPost[];
                }
            })
        );
    }

    private mapToBlogPost(post: any, source: 'debuggerme' | 'jamith' = 'debuggerme'): BlogPost {
        const wordCount = this.estimateWordCount(post.content?.rendered || '');
        const readTime = `${Math.max(1, Math.round(wordCount / 200))} min read`;

        const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? 'assets/images/blog/default.jpg';

        const category = post._embedded?.['wp:term']?.[0]?.[0]?.name ?? 'General';

        const iso = post.date ?? undefined;

        const excerptRaw = this.stripHtml(post.excerpt?.rendered ?? post.content?.rendered ?? '');
        const excerpt = excerptRaw.length > this.EXCERPT_MAX ? excerptRaw.slice(0, this.EXCERPT_MAX) : excerptRaw;

        return {
            id: post.id,
            title: this.decodeHtml(post.title?.rendered ?? ''),
            excerpt,
            image,
            date: iso ? new Date(iso).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            }) : new Date().toLocaleDateString('en-US'),
            isoDate: iso,
            readTime,
            category,
            link: post.link,
            source
        };
    }

    private mapRssItemToBlogPost(item: Element): BlogPost {
        const title = this.getFirstTagText(item, ['title']) || 'Untitled';
        const link = this.getFirstTagText(item, ['link']) || '#';
        const pubDateText = this.getFirstTagText(item, ['pubDate', 'published', 'updated']) || new Date().toUTCString();
        const iso = (() => {
            const d = new Date(pubDateText);
            return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
        })();

        const content = this.getFirstTagText(item, ['content:encoded', 'encoded', 'description']) || '';

        const excerptRaw = this.stripHtml(content);
        const excerpt = excerptRaw.length > this.EXCERPT_MAX ? excerptRaw.slice(0, this.EXCERPT_MAX) : excerptRaw;
        const wordCount = this.estimateWordCount(content || excerpt);
        const readTime = `${Math.max(1, Math.round(wordCount / 200))} min read`;

        // Prefer dedicated image tags/fields, then look inside content
        const image = this.extractImageFromElement(item) || this.extractImageFromContent(content) || 'assets/images/blog/default.jpg';

        const category = this.getCategoryFromElement(item) || 'General';

        const id = Date.parse(iso);

        return {
            id: isNaN(id) ? Math.floor(Math.random() * 1000000) : id,
            title,
            excerpt: this.stripHtml(excerpt),
            image,
            date: new Date(iso).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            }),
            isoDate: iso,
            readTime,
            category,
            link,
            source: 'jamith'
        };
    }

    private getCategoryFromElement(parent: Element): string | null {
        // Prefer <category term="..."/> (Atom) or <category>text</category> (RSS)
        const categoryEls = parent.getElementsByTagName('category');
        if (categoryEls && categoryEls.length > 0) {
            const first = categoryEls[0];
            // check for term attribute (Atom)
            const term = first.getAttribute && first.getAttribute('term');
            if (term && term.trim()) return term.trim();
            // fallback to text content
            const txt = first.textContent;
            if (txt && txt.trim()) return txt.trim();
        }
        // sometimes category may be provided as <dc:subject> or similar; try common fallbacks
        const dcSubjects = parent.getElementsByTagName('dc:subject');
        if (dcSubjects && dcSubjects.length > 0) {
            const txt = dcSubjects[0].textContent;
            if (txt && txt.trim()) return txt.trim();
        }
        return null;
    }

    private mapAtomEntryToBlogPost(entry: Element): BlogPost {
        const title = this.getFirstTagText(entry, ['title']) || 'Untitled';
        // <link> in Atom is often an element with href attribute
        const linkEls = entry.getElementsByTagName('link');
        let link: string | null;
        if (linkEls && linkEls.length > 0) {
            const href = linkEls[0].getAttribute('href');
            link = href ?? (linkEls[0].textContent || null);
        } else {
            link = this.getFirstTagText(entry, ['link']);
        }
        if (!link) link = '#';

        const pubDateText = this.getFirstTagText(entry, ['published', 'updated', 'pubDate']) || new Date().toUTCString();
        const iso = (() => {
            const d = new Date(pubDateText);
            return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
        })();

        const content = this.getFirstTagText(entry, ['content', 'summary', 'description']) || '';

        const excerptRaw = this.stripHtml(content);
        const excerpt = excerptRaw.length > this.EXCERPT_MAX ? excerptRaw.slice(0, this.EXCERPT_MAX) : excerptRaw;
        const wordCount = this.estimateWordCount(content || excerpt);
        const readTime = `${Math.max(1, Math.round(wordCount / 200))} min read`;

        const image = this.extractImageFromElement(entry) || this.extractImageFromContent(content) || 'assets/images/blog/default.jpg';

        const category = this.getCategoryFromElement(entry) || 'General';

        const idText = this.getFirstTagText(entry, ['id']) || link || iso;
        const id = this.hashStringToInt(String(idText));

        return {
            id: isNaN(id) ? Math.floor(Math.random() * 1000000) : id,
            title,
            excerpt: this.stripHtml(excerpt),
            image,
            date: new Date(iso).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            }),
            isoDate: iso,
            readTime,
            category,
            link,
            source: 'jamith'
        };
    }

    private extractImageFromElement(parent: Element): string | null {
        if (!parent) return null;
        // check for explicit image_url tag used in your updated feed
        const imageUrl = this.getFirstTagText(parent, ['image_url', 'image']);
        if (imageUrl && imageUrl.trim()) return imageUrl.trim();

        // media:content (common in some feeds) may have a url attribute
        const mediaContents = parent.getElementsByTagName('media:content');
        if (mediaContents && mediaContents.length > 0) {
            const url = mediaContents[0].getAttribute && mediaContents[0].getAttribute('url');
            if (url) return url;
        }

        // enclosure with url attribute
        const enclosures = parent.getElementsByTagName('enclosure');
        if (enclosures && enclosures.length > 0) {
            const url = enclosures[0].getAttribute && enclosures[0].getAttribute('url');
            if (url) return url;
        }

        // <img ... /> directly under element
        const imgEls = parent.getElementsByTagName('img');
        if (imgEls && imgEls.length > 0) {
            const src = imgEls[0].getAttribute && imgEls[0].getAttribute('src');
            if (src) return src;
            if (imgEls[0].textContent && imgEls[0].textContent.trim()) return imgEls[0].textContent.trim();
        }

        return null;
    }

    private extractImageFromContent(content: string): string | null {
        if (!content) return null;
        // look for <img src="..."> in content string
        const imgRegex = /<img[^>]+src\s*=\s*['"]([^'"]+)['"]/i;
        const m = content.match(imgRegex);
        if (m && m[1]) return m[1];
        // try looking for <figure><img src="..."> or markdown-style ![alt](url)
        const mdRegex = /!\[[^]]*\]\((https?:[^)\s]+)\)/i;
        const mm = content.match(mdRegex);
        if (mm && mm[1]) return mm[1];
        return null;
    }

    private hashStringToInt(str: string): number {
        // simple hash to produce a stable numeric id from a string
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0; // convert to 32bit integer
        }
        return Math.abs(hash);
    }

    private getFirstTagText(parent: Element, tagNames: string[]): string | null {
        for (const tag of tagNames) {
            const nodes = parent.getElementsByTagName(tag);
            if (nodes && nodes.length > 0) {
                return nodes[0].textContent || null;
            }
        }
        // try fallback by localName (for namespaced tags like content:encoded)
        for (const tag of tagNames) {
            const nodes = Array.from(parent.childNodes).filter(n => (n as Element).localName === tag.split(':').pop());
            if (nodes.length > 0) return (nodes[0].textContent) || null;
        }
        return null;
    }

    private stripHtml(html: string): string {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    private decodeHtml(html: string): string {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    private estimateWordCount(html: string): number {
        const stripped = this.stripHtml(html).trim();
        if (!stripped) return 0;
        return stripped.split(/\s+/).length;
    }
}