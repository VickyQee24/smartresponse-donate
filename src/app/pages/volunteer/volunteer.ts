import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SITE } from '../../core/site-config';
import { FormDelivery } from '../../core/form-delivery';

const INTERESTS = [
  'Save Her Dignity outreach',
  'Community health awareness',
  'Emergency awareness training',
  'Digital education & tech',
  'Content, media & storytelling',
  'Fundraising & partnerships'
];

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  location: '',
  interest: '',
  availability: '',
  message: ''
};

@Component({
  selector: 'app-volunteer',
  imports: [FormsModule],
  templateUrl: './volunteer.html',
  styleUrl: './volunteer.css'
})
export class Volunteer {

  private delivery = inject(FormDelivery);

  readonly site = SITE;
  readonly interests = INTERESTS;

  submitted = signal(false);
  sending = signal(false);
  error = signal('');
  /** True when we fell back to the visitor's mail client. */
  viaMail = signal(false);

  form = { ...EMPTY };

  async submit(): Promise<void> {
    this.error.set('');
    this.sending.set(true);

    try {
      const result = await this.delivery.send(
        `Volunteer application: ${this.form.name}`,
        {
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          location: this.form.location,
          interest: this.form.interest,
          availability: this.form.availability,
          message: this.form.message
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
    this.form = { ...EMPTY };
    this.submitted.set(false);
    this.viaMail.set(false);
    this.error.set('');
  }
}
