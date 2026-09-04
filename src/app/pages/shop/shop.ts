import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { NGN, SITE } from '../../core/site-config';
import { Paystack } from '../../core/paystack';
import { FormDelivery } from '../../core/form-delivery';
import { PRODUCTS, Product } from '../../data/products';

type Method = 'card' | 'transfer';

@Component({
  selector: 'app-shop',
  imports: [FormsModule],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop {

  private paystack = inject(Paystack);
  private delivery = inject(FormDelivery);
  private router = inject(Router);

  readonly site = SITE;
  readonly products = PRODUCTS;
  readonly paystackReady = this.paystack.configured;

  selected = signal<Product | null>(null);
  quantity = signal(1);

  /** Card is the first option; transfer is the fallback. */
  method = signal<Method>('card');

  name = signal('');
  email = signal('');
  phone = signal('');
  address = signal('');

  processing = signal(false);
  error = signal('');

  /** Image paths that failed to load, so we fall back to a placeholder. */
  private missing = signal<ReadonlySet<string>>(new Set());

  hasImage(path: string | undefined): boolean {
    return !!path && !this.missing().has(path);
  }

  onImageError(path: string): void {
    this.missing.update(set => new Set(set).add(path));
  }

  /** Bulk price applies automatically once the threshold is reached. */
  readonly unitPrice = computed(() => {
    const product = this.selected();

    if (!product) {
      return 0;
    }

    return product.bulkPrice && product.bulkFrom &&
           this.quantity() >= product.bulkFrom
      ? product.bulkPrice
      : product.price;
  });

  readonly total = computed(() => this.unitPrice() * this.quantity());

  readonly bulkApplied = computed(() => {
    const product = this.selected();
    return !!product?.bulkFrom && this.quantity() >= product.bulkFrom;
  });

  readonly detailsComplete = computed(() =>
    !!this.selected() &&
    this.quantity() > 0 &&
    this.email().includes('@') &&
    this.name().trim().length > 1 &&
    this.phone().trim().length > 5 &&
    this.address().trim().length > 5
  );

  readonly canOrder = computed(() =>
    this.detailsComplete() && !this.processing()
  );

  format(value: number): string {
    return NGN.format(value);
  }

  open(product: Product): void {
    this.selected.set(product);
    this.quantity.set(1);
    this.error.set('');
    this.method.set(this.paystackReady ? 'card' : 'transfer');
  }

  close(): void {
    this.selected.set(null);
  }

  setQuantity(value: number | string): void {
    const parsed = Math.floor(Number(value));
    this.quantity.set(parsed > 0 ? parsed : 1);
  }

  step(by: number): void {
    this.setQuantity(this.quantity() + by);
  }

  async pay(): Promise<void> {
    const product = this.selected();

    this.error.set('');

    if (!product || !this.canOrder()) {
      return;
    }

    this.processing.set(true);

    try {
      const result = await this.paystack.checkout({
        email: this.email(),
        amount: this.total(),
        metadata: {
          order_type: 'shop',
          product: product.name,
          quantity: this.quantity(),
          unit_price: this.unitPrice(),
          customer_name: this.name(),
          phone: this.phone(),
          delivery_address: this.address()
        }
      });

      if (result.status === 'success') {
        this.finish('card', result.reference ?? '');
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
   * Buyer says they have transferred. The order details have to reach us —
   * a transfer alone tells us nothing about what was ordered or where it
   * should go — so we send them before showing the thank-you page.
   */
  async confirmTransfer(): Promise<void> {
    const product = this.selected();

    this.error.set('');

    if (!product || !this.canOrder()) {
      return;
    }

    this.processing.set(true);

    try {
      await this.delivery.send(
        `Bank transfer order: ${this.quantity()} x ${product.name}`,
        {
          product: product.name,
          quantity: this.quantity(),
          unit_price: this.unitPrice(),
          total: this.total(),
          name: this.name(),
          email: this.email(),
          phone: this.phone(),
          delivery_address: this.address(),
          payment_method: 'Bank transfer'
        }
      );

      this.finish('transfer', '');
    } catch (err) {
      this.error.set(
        err instanceof Error ? err.message : 'Something went wrong.'
      );
    } finally {
      this.processing.set(false);
    }
  }

  private finish(method: Method, reference: string): void {
    // Read the summary before clearing: total() is derived from selected().
    const item = this.selected()?.name ?? '';
    const qty = this.quantity();
    const amount = this.total();

    this.selected.set(null);

    this.router.navigate(['/thank-you'], {
      queryParams: {
        type: 'order',
        method,
        item,
        qty,
        amount,
        ...(reference ? { ref: reference } : {})
      }
    });
  }
}
