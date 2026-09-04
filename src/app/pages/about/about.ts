import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE } from '../../core/site-config';
import { TRUSTEES } from '../../data/trustees';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

  readonly site = SITE;
  readonly trustees = TRUSTEES;

  /** Names whose portrait failed to load, so we fall back to initials. */
  private missing = signal<ReadonlySet<string>>(new Set());

  hasPhoto(name: string, photo: string): boolean {
    return photo.length > 0 && !this.missing().has(name);
  }

  onPhotoError(name: string): void {
    this.missing.update(set => new Set(set).add(name));
  }
}
