import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectModalComponent } from '../../shared/components/project-modal/project-modal.component';
import { TestimonialModalComponent } from '../../shared/components/testimonial-modal/testimonial-modal.component';
import { AboutSectionComponent } from '../../shared/components/sections/about-section/about-section.component';
import { WhatIDoSectionComponent } from '../../shared/components/sections/what-i-do-section/what-i-do-section.component';
import { FeaturedProjectsSectionComponent } from '../../shared/components/sections/featured-projects-section/featured-projects-section.component';
import { SkillsSectionComponent } from '../../shared/components/sections/skills-section/skills-section.component';
import { TestimonialsSectionComponent } from '../../shared/components/sections/testimonials-section/testimonials-section.component';
import { ExperienceSectionComponent } from '../../shared/components/sections/experience-section/experience-section.component';
import { EducationSectionComponent } from '../../shared/components/sections/education-section/education-section.component';
import { LanguagesSectionComponent } from '../../shared/components/sections/languages-section/languages-section.component';
import { ContactSectionComponent } from '../../shared/components/sections/contact-section/contact-section.component';
import { BlogPostsSectionComponent } from '../../shared/components/sections/blog-posts-section/blog-posts-section.component';

export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  link?: string;
  demoUrl?: string;
  category: string;
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  image?: string;
  text: string;
  rating: number;
  featured?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    ProjectModalComponent, 
    TestimonialModalComponent,
    AboutSectionComponent,
    WhatIDoSectionComponent,
    FeaturedProjectsSectionComponent,
    SkillsSectionComponent,
    TestimonialsSectionComponent,
    ExperienceSectionComponent,
    EducationSectionComponent,
    ContactSectionComponent,
    BlogPostsSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isProjectModalOpen = false;
  isTestimonialModalOpen = false;
  isContactModalOpen = false;
  
  recentProjects: Project[] = [
    {
      id: 1,
      title: "Landing Page for South Lanka Constructions",
      description: "A modern and responsive landing page for a construction company, showcasing their services and projects.",
      image: "assets/images/projects/southlankaconstructions.webp",
      technologies: ["HTML5", "CSS3", "PHP", "JavaScript"],
      demoUrl: "https://www.southlankaconstruction.com/",
      category: "Web"
    },
    {
      id: 5,
      title: "Personal Portfolio Website",
      description: "Personal portfolio website showcasing projects and skills with a modern, responsive design.",
      image: "assets/images/projects/personal-portfolio.webp",
      technologies: ["Angular", "TypeScript", "TailwindCSS"],
      link: "https://github.com/JamithNimantha/jamithnimantha.github.io",
      demoUrl: "https://jamith.com",
      category: "Web"
    },
  ];
  
  allProjects: Project[] = [
    ...this.recentProjects,
    {
      id: 3,
      title: "Ebook Cover Generator",
      description: "The Ebook Cover Generator is a simple JavaFX desktop application designed to generate bulk ebook cover images based on provided combinations.",
      image: "assets/images/projects/ebook-cover-generator.webp",
      technologies: ["Java", "JavaFX"],
      link: "https://github.com/JamithNimantha/ebook-cover-generator",
      category: "Desktop"
    },
    // {
    //   id: 4,
    //   title: "Weather Dashboard",
    //   description: "Real-time weather forecasting application with interactive maps and alerts system.",
    //   image: "assets/images/projects/weather.jpg",
    //   technologies: ["JavaScript", "OpenWeatherAPI", "Chart.js", "Leaflet"],
    //   link: "https://github.com/johndoe/weather-dashboard",
    //   demoUrl: "https://weather.johndoe.com",
    //   category: "Web"
    // },
    // {
    //   id: 6,
    //   title: "Inventory Management System",
    //   description: "Comprehensive inventory tracking system for small businesses with barcode scanning and reporting.",
    //   image: "assets/images/projects/inventory.jpg",
    //   technologies: ["Angular", "Node.js", "PostgreSQL", "Docker"],
    //   link: "https://github.com/johndoe/inventory-system",
    //   demoUrl: "https://inventory-demo.johndoe.com",
    //   category: "Web"
    // },
    // {
    //   id: 2,
    //   title: "Task Management App",
    //   description: "A collaborative task management application with real-time updates and team workflow features.",
    //   image: "assets/images/projects/taskmanager.jpg",
    //   technologies: ["React", "Firebase", "Material UI", "Redux"],
    //   link: "https://github.com/johndoe/task-manager",
    //   demoUrl: "https://task-manager-demo.johndoe.com",
    //   category: "Web"
    // }
  ];
  
  // Featured testimonials shown on the home page

  // All testimonials including those not shown on the home page
  allTestimonials: Testimonial[] = [
    {
      id: 3,
      name: "selenabernadett",
      company: "Fiverr Client - United States",
      text: "I can’t thank him enough! He delivered a brilliant job in no time and was incredibly helpful throughout the process. Truly one of the best freelancers I’ve ever worked with.",
      rating: 5,
      featured: true,
    },
    {
      id: 4,
      name: "vijaykoul165",
      company: "Fiverr Client - United States",
      text: "This seller is phenomenal! His dedication, creativity, and work ethic are unmatched. Every project is delivered flawlessly and goes beyond expectations. I’m a repeat customer and will continue to be!",
      rating: 5,
      featured: true,
    },
    {
      id: 5,
      name: "user44227652",
      company: "Fiverr Client - United Arab Emirates",
      text: "Highly professional, reliable, and extremely helpful. One of the best sellers I’ve worked with on Fiverr. I’ll definitely be placing more orders soon!",
      rating: 5,
      featured: true,
    },
    {
      id: 14,
      name: "nikkik",
      company: "Fiverr Client - United States",
      text: "Great Job! Really fast turnaround on some bulk spreadsheet edits. Incredible value, thank you so much, I will buy your gig again. A pleasure to converse with in messages. Highly recommend.",
      rating: 5,
    },
    {
      id: 13,
      name: "selenabernadett",
      company: "Fiverr Client - United States",
      text: "I can't thank Him Enough For His Help. Very Brilliant Job. Very fast Job too. Thank you so much, My Friend For your Help.",
      rating: 5,
    },
    {
      id: 1,
      name: "wanghud",
      company: "Fiverr Client - Sweden",
      text: "Very Amazing experience, highly accurate, and perfect work, must try him, highly recommended, A+++++",
      rating: 5,
    },
    {
      id: 10,
      name: "marcineko5",
      company: "Fiverr Client - United Kingdom",
      text: "Great seller fast efficiency and professional attitude. Worth to recommend to everyone. Many thanks",
      rating: 5,
    },
    {
      id: 20,
      name: "user52230585",
      company: "Fiverr Client - Bangladesh",
      text: "he Is truly amazing, Just Save my day! I check the job for some random rows it's showing Accurate. Thank you so much for your Hard and quick Job. I will Definitely Buy More Gig from you!",
      rating: 5,
    },
    {
      id: 22,
      name: "teslerrob",
      company: "Fiverr Client - Germany",
      text: "Great experience. Fast delivery and good communication upfront. Thanks",
      rating: 5,
    },
    {
      id: 19,
      name: "torcolato",
      company: "Fiverr Client - Germany",
      text: "Highly recommended: Great communication and great results.",
      rating: 5,
    },
    {
      id: 15,
      name: "user91812334",
      company: "Fiverr Client - France",
      text: "2nd time with Jamith, it is still an amazing work. This guy is really responsive and pro-active in his work. I recommend",
      rating: 5,
    },
    {
      id: 8,
      name: "gokhanaykac",
      company: "Fiverr Client - Turkey",
      text: "Great closer! Perfect job. Strongly recommended.",
      rating: 5,
    },
    {
      id: 21,
      name: "user44227652",
      company: "Fiverr Client - United Arab Emirates",
      text: "Highly recommend this seller. Extremely professional service and very helpful. We will be placing more orders in the future.",
      rating: 5,
    },
    {
      id: 7,
      name: "user06061787",
      company: "Fiverr Client - United States",
      text: "Great Work, Thanks.",
      rating: 5,
    },
    {
      id: 12,
      name: "tinasoft2",
      company: "Fiverr Client - Albania",
      text: "Good seller, got what i wanted really fast, i expected in 15 days but finished on 4 days. Vouch for this seller",
      rating: 5,
    },
    {
      id: 9,
      name: "jasonsingapore",
      company: "Fiverr Client - Singapore",
      text: "I can see why he is called the boss. He is better than all the other scrapers I have used. And faster!",
      rating: 5,
    },
    {
      id: 3,
      name: "scottpooch",
      company: "Fiverr Client - United States",
      text: "Super speedy and responsive. Delivered exactly what I had wanted (very quickly!).",
      rating: 5,
    },
    {
      id: 6,
      name: "thesportsnetwor",
      company: "Fiverr Client - Luxembourg",
      text: "Great job again, for the third time. Will hire again!",
      rating: 5,
    },
    {
      id: 11,
      name: "senmychan",
      company: "Fiverr Client - Lithuania",
      text: "super perfect!!!",
      rating: 5,
    },
    {
      id: 16,
      name: "iancope",
      company: "Fiverr Client - Canada",
      text: "great work",
      rating: 5,
    },
    {
      id: 4,
      name: "vijaykoul165",
      company: "Fiverr Client - United States",
      text: "Awesome seller. Goes above and beyond the Specs. 10 out of 10. Will keep working with the seller in future.",
      rating: 5,
    },
    {
      id: 23,
      name: "zoozaxe",
      company: "Fiverr Client - Germany",
      text: "Very good job, very good communication. Will hire again for sure!",
      rating: 5,
    },
    {
      id: 17,
      name: "iamjrad",
      company: "Fiverr Client - United States",
      text: "Very well done and helpful! Will use again.",
      rating: 5,
    },
    {
      id: 2,
      name: "enermax2",
      company: "Fiverr Client - Italy",
      text: "tutto come richiesto",
      rating: 5,
    },
    {
      id: 18,
      name: "ivanprime",
      company: "Fiverr Client - Brazil",
      text: "Very professional!",
      rating: 5,
    },
    {
      id: 5,
      name: "princely",
      company: "Fiverr Client - United States",
      text: "Well done.",
      rating: 5,
    },
  ];

  featuredTestimonials: Testimonial[] = this.allTestimonials.filter(testimonial => testimonial.featured);



  openProjectModal() {
    this.isProjectModalOpen = true;
  }
  
  closeProjectModal() {
    this.isProjectModalOpen = false;
  }
  
  openTestimonialModal() {
    this.isTestimonialModalOpen = true;
  }
  
  closeTestimonialModal() {
    this.isTestimonialModalOpen = false;
  }
  
  openContactModal() {
    this.isContactModalOpen = true;
  }
}
