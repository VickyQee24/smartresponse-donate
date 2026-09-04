import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SITE } from '../../core/site-config';
import { FormDelivery } from '../../core/form-delivery';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  private delivery = inject(FormDelivery);

  readonly site = SITE;

  submitted = signal(false);
  sending = signal(false);
  error = signal('');
  /** True when we fell back to the visitor's mail client. */
  viaMail = signal(false);

  contact = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  async submitForm(): Promise<void> {
    this.error.set('');
    this.sending.set(true);

    try {
      const result = await this.delivery.send(
        `Website enquiry: ${this.contact.subject}`,
        {
          name: this.contact.name,
          email: this.contact.email,
          subject: this.contact.subject,
          message: this.contact.message
        }
      );

      this.viaMail.set(result === 'mailto');
      this.submitted.set(true);
    } catch (err) {
      this.error.set(
        err instanceof Error ? err.message : 'Something went wrong.'
      );
    } finally {
      this.sending.set(false);
    }
  }

  reset(): void {
    this.contact = { name: '', email: '', subject: '', message: '' };
    this.submitted.set(false);
    this.viaMail.set(false);
    this.error.set('');
  }
}
