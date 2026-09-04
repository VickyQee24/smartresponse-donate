import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE } from '../../core/site-config';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  readonly site = SITE;
}
