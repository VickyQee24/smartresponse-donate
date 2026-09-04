import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NGN, SITE } from '../../core/site-config';

@Component({
  selector: 'app-thank-you',
  imports: [RouterLink],
  templateUrl: './thank-you.html',
  styleUrl: './thank-you.css'
})
export class ThankYou {

  /** Query params, bound by withComponentInputBinding(). */
  type = input<string>('donation');   // 'donation' | 'order'
  method = input<string>('card');     // 'card' | 'transfer'
  ref = input<string>('');
  item = input<string>('');
  qty = input<string>('');
  amount = input<string>('');

  readonly site = SITE;

  readonly isOrder = computed(() => this.type() === 'order');
  readonly isTransfer = computed(() => this.method() === 'transfer');

  readonly amountLabel = computed(() => {
    const value = Number(this.amount());
    return value > 0 ? NGN.format(value) : '';
  });
}
