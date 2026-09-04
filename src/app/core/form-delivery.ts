import { Injectable } from '@angular/core';
import { SITE } from './site-config';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export type DeliveryResult = 'sent' | 'mailto';

/**
 * Delivers form submissions without a backend.
 *
 * With a Web3Forms access key configured, submissions are POSTed straight to
 * the foundation's inbox. Without one, we fall back to opening the visitor's
 * mail client with the message pre-filled, so nothing is silently lost.
 */
@Injectable({ providedIn: 'root' })
export class FormDelivery {

  get configured(): boolean {
    return SITE.forms.web3formsKey.length > 0;
  }

  async send(
    subject: string,
    fields: Record<string, string | number>
  ): Promise<DeliveryResult> {

    if (!this.configured) {
      this.openMailClient(subject, fields);
      return 'mailto';
    }

    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        access_key: SITE.forms.web3formsKey,
        subject,
        from_name: SITE.organisation.name,
        ...fields
      })
    });

    if (!response.ok) {
      throw new Error(
        'We could not send your message. Please email us directly at ' +
        SITE.contact.email + '.'
      );
    }

    return 'sent';
  }

  /** Builds a mailto: link so the submission still reaches the inbox. */
  private openMailClient(
    subject: string,
    fields: Record<string, string | number>
  ): void {

    const body = Object.entries(fields)
      .map(([key, value]) => `${this.label(key)}: ${value}`)
      .join('\n');

    const href =
      `mailto:${SITE.contact.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    if (typeof window !== 'undefined') {
      window.location.href = href;
    }
  }

  private label(key: string): string {
    const spaced = key.replace(/_/g, ' ');
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
  }
}
