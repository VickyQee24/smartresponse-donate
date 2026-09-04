import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE } from '../../core/site-config';
import { BLOG_POSTS, findPost } from '../../data/blog-posts';

@Component({
  selector: 'app-blog-post',
  imports: [RouterLink],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.css'
})
export class BlogPost {

  /** Bound from the route parameter via withComponentInputBinding(). */
  slug = input<string>('');

  readonly site = SITE;

  readonly post = computed(() => findPost(this.slug()));

  readonly others = computed(() =>
    BLOG_POSTS.filter(post => post.slug !== this.slug())
  );
}
