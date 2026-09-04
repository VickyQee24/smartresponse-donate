import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE } from '../../core/site-config';
import { BLOG_POSTS } from '../../data/blog-posts';

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

// TODO: replace with real testimonials as they come in from outreaches.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'I used to miss school every month. The pack I received meant I did ' +
      'not have to choose between my dignity and my education.',
    name: 'Student beneficiary',
    role: 'Save Her Dignity outreach'
  },
  {
    quote:
      'Volunteering with Smart Response showed me that young people do not ' +
      'have to wait to be given permission to solve problems.',
    name: 'Campus volunteer',
    role: 'Adeleke University'
  },
  {
    quote:
      'What impressed me was the respect. The team treated every girl like ' +
      'she mattered, not like a statistic.',
    name: 'Community partner',
    role: 'Lagos outreach'
  }
];

@Component({
  selector: 'app-blog',
  imports: [RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog {

  readonly site = SITE;
  readonly posts = BLOG_POSTS;
  readonly testimonials = TESTIMONIALS;
}
