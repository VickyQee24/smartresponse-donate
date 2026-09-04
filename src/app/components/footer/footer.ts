import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE } from '../../core/site-config';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  readonly site = SITE;
  readonly year = new Date().getFullYear();

  /** The Naira account, shown as the quick transfer option in the footer. */
  readonly ngnAccount = SITE.bank.accounts[0];
}
