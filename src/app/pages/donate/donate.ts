import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { NGN, SITE } from '../../core/site-config';
import { Paystack } from '../../core/paystack';
import { DONATION_PRESETS, FREQUENCIES, Frequency } from '../../data/products';

@Component({
  selector: 'app-donate',
  imports: [FormsModule, RouterLink],
  templateUrl: './donate.html',
  styleUrl: './donate.css'
})
export class Donate {

  private paystack = inject(Paystack);

  /** False until a Paystack public key is set, so the UI can explain why. */
  readonly paystackReady = this.paystack.configured;

  readonly site = SITE;
  readonly presets = DONATION_PRESETS;
  readonly frequencies = FREQUENCIES;

  frequency = signal<Frequency>('once');
  amount = signal<number>(10000);
  customAmount = signal<string>('');

  name = signal('');
  email = signal('');

  processing = signal(false);
  error = signal('');
  reference = signal('');

  readonly recurring = computed(() => this.frequency() !== 'once');

  /** A typed amount always wins over the selected preset. */
  readonly effectiveAmount = computed(() => {
    const typed = Number(this.customAmount());

    return this.customAmount().trim() !== '' && typed > 0
      ? Math.floor(typed)
      : this.amount();
  });

  readonly canGive = computed(() =>
    this.effectiveAmount() >= 100 &&
    this.email().includes('@') &&
    !this.processing()
  );

  format(value: number): string {
    return NGN.format(value);
  }

  selectPreset(value: number): void {
    this.amount.set(value);
    this.customAmount.set('');
  }

  setFrequency(freq: Frequency): void {
    this.frequency.set(freq);
  }

  frequencyLabel(): string {
    const found = this.frequencies.find(f => f.id === this.frequency());
    return found ? found.note.toLowerCase() : '';
  }

  async give(): Promise<void> {
    this.error.set('');
    this.reference.set('');

    if (!this.canGive()) {
      return;
    }

    this.processing.set(true);

    try {
      // Recurring gifts need a Paystack Plan for this exact amount, which
      // only the server can mint.
      const plan = this.recurring()
        ? await this.resolvePlan()
        : undefined;

      const result = await this.paystack.checkout({
        email: this.email(),
        amount: this.effectiveAmount(),
        plan,
        metadata: {
          donor_name: this.name(),
          frequency: this.frequency(),
          campaign: 'Save Her Dignity'
        }
      });

      if (result.status === 'success') {
        this.reference.set(result.reference ?? '');
      }
    } catch (err) {
      this.error.set(
        err instanceof Error ? err.message : 'Something went wrong.'
      );
    } finally {
      this.processing.set(false);
    }
  }

  /**
   * Asks the server for a plan code matching the chosen amount + frequency.
   * Throws with a readable message if recurring is not set up yet.
   */
  private async resolvePlan(): Promise<string> {
    const response = await fetch('/api/paystack-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: this.effectiveAmount(),
        frequency: this.frequency()
      })
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok || !payload.plan) {
      throw new Error(
        payload.error ||
        'We could not set up that recurring gift. Please try a single gift, ' +
        'or use the bank transfer details.'
      );
    }

    return payload.plan;
  }

  copied = signal('');

  async copy(value: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
      this.copied.set(value);
      setTimeout(() => this.copied.set(''), 2000);
    } catch {
      // Clipboard blocked — the number is on screen to copy manually.
    }
  }
}
