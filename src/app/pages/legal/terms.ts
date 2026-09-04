import { Component } from '@angular/core';
import { SITE } from '../../core/site-config';

@Component({
  selector: 'app-terms',
  imports: [],
  templateUrl: './terms.html',
  styleUrl: './legal.css'
})
export class Terms {
  readonly site = SITE;
  readonly updated = 'September 2026';
}
