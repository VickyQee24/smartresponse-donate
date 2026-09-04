import { Injectable } from '@angular/core';
import { SITE } from './site-config';

const INLINE_SCRIPT = 'https://js.paystack.co/v1/inline.js';

export interface CheckoutRequest {
  email: string;
  /** Amount in major units (naira), converted to kobo internally. */
  amount: number;
  currency?: string;
  /** Paystack plan code. When present the charge becomes a subscription. */
  plan?: string;
  metadata?: Record<string, unknown>;
}

export interface CheckoutResult {
  status: 'success' | 'cancelled';
  reference?: string;
}

declare const PaystackPop: any;

@Injectable({ providedIn: 'root' })
export class Paystack {

  private loader?: Promise<void>;

  /** False until a public key is configured, so the UI can explain why. */
  get configured(): boolean {
    return SITE.paystack.publicKey.length > 0;
  }

  private load(): Promise<void> {
    if (this.loader) {
      return this.loader;
    }

    this.loader = new Promise<void>((resolve, reject) => {
      if (typeof document === 'undefined') {
        reject(new Error('Paystack requires a browser environment.'));
        return;
      }

      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${INLINE_SCRIPT}"]`
      );

      if (existing) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = INLINE_SCRIPT;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error('Could not reach Paystack. Check your connection.'));

      document.head.appendChild(script);
    });

    return this.loader;
  }

  /**
   * Opens the Paystack checkout overlay and resolves once the customer either
   * completes payment or closes the modal.
   */
  async checkout(request: CheckoutRequest): Promise<CheckoutResult> {

    if (!this.configured) {
      throw new Error(
        'Online payment is not enabled yet. Please use bank transfer below.'
      );
    }

    await this.load();

    return new Promise<CheckoutResult>(resolve => {

      const handler = PaystackPop.setup({
        key: SITE.paystack.publicKey,
        email: request.email,
        amount: Math.round(request.amount * 100),
        currency: request.currency ?? 'NGN',
        ...(request.plan ? { plan: request.plan } : {}),
        metadata: request.metadata ?? {},
        callback: (response: { reference: string }) =>
          resolve({ status: 'success', reference: response.reference }),
        onClose: () => resolve({ status: 'cancelled' })
      });

      handler.openIframe();
    });
  }
}
