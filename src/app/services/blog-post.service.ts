import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    readTime: string;
    category: string;
    link: string;
}

@Injectable({ providedIn: 'root' })
export class BlogPostService {
    private readonly apiUrl = 'https://debuggerme.com/wp-json/wp/v2/posts?_embed&per_page=3'; // _embed gets image & categories

    constructor(private http: HttpClient) {}

    getRecentPosts(): Observable<BlogPost[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            map(posts => posts.map(post => this.mapToBlogPost(post)))
        );
    }

    private mapToBlogPost(post: any): BlogPost {
        const wordCount = this.estimateWordCount(post.content?.rendered || '');
        const readTime = `${Math.max(1, Math.round(wordCount / 200))} min read`;

        const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? 'assets/images/blog/default.jpg';

        const category = post._embedded?.['wp:term']?.[0]?.[0]?.name ?? 'General';

        return {
            id: post.id,
            title: this.decodeHtml(post.title?.rendered ?? ''),
            excerpt: this.stripHtml(post.excerpt?.rendered ?? ''),
            image,
            date: new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            }),
            readTime,
            category,
            link: post.link
        };
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
        return this.stripHtml(html).split(/\s+/).length;
    }
}