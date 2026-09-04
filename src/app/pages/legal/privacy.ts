import { Component } from '@angular/core';
import { SITE } from '../../core/site-config';

@Component({
  selector: 'app-privacy',
  imports: [],
  templateUrl: './privacy.html',
  styleUrl: './legal.css'
})
export class Privacy {
  readonly site = SITE;
  readonly updated = 'September 2026';
}
