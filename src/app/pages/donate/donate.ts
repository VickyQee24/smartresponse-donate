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

  /**
   * Recurring giving runs on Paystack Plans, which carry a fixed amount, so
   * only the tiers that have a plan code configured can be offered.
   */
  readonly tiers = computed(() => {
    const freq = this.frequency();

    return freq === 'once'
      ? []
      : SITE.paystack.plans[freq].filter(tier => tier.code.length > 0);
  });

  /** Custom input wins for one-off gifts; recurring is tier-only. */
  readonly effectiveAmount = computed(() => {
    if (this.recurring()) {
      return this.amount();
    }

    const typed = Number(this.customAmount());

    return this.customAmount().trim() !== '' && typed > 0
      ? typed
      : this.amount();
  });

  readonly planCode = computed(() => {
    if (!this.recurring()) {
      return '';
    }

    const match = this.tiers().find(tier => tier.amount === this.amount());
    return match ? match.code : '';
  });

  /** True when a recurring frequency has no usable plans configured yet. */
  readonly planMissing = computed(() =>
    this.recurring() && this.tiers().length === 0
  );

  readonly canGive = computed(() =>
    this.effectiveAmount() >= 100 &&
    this.email().includes('@') &&
    !this.processing() &&
    (!this.recurring() || this.planCode() !== '')
  );

  format(value: number): string {
    return NGN.format(value);
  }

  selectPreset(value: number): void {
    this.amount.set(value);
    this.customAmount.set('');
  }

  /** Switching frequency snaps the amount onto a valid tier. */
  setFrequency(freq: Frequency): void {
    this.frequency.set(freq);
    this.customAmount.set('');

    const tiers = this.tiers();

    if (freq !== 'once' && tiers.length > 0) {
      const stillValid = tiers.some(tier => tier.amount === this.amount());

      if (!stillValid) {
        this.amount.set(tiers[0].amount);
      }
    }
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
      const result = await this.paystack.checkout({
        email: this.email(),
        amount: this.effectiveAmount(),
        plan: this.planCode() || undefined,
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
