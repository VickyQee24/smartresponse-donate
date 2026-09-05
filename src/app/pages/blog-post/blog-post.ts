import { Component, computed, input, signal } from '@angular/core';
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

  /** Portraits that failed to load, so we fall back to an initial. */
  private missing = signal<ReadonlySet<string>>(new Set());

  hasPhoto(photo: string): boolean {
    return photo.length > 0 && !this.missing().has(photo);
  }

  onPhotoError(photo: string): void {
    this.missing.update(set => new Set(set).add(photo));
  }
}
