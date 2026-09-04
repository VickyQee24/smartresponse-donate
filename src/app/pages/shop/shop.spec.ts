import { vi, expect } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { Shop } from './shop';
import { FormDelivery } from '../../core/form-delivery';
import { PRODUCTS } from '../../data/products';

class FakeDelivery {
  sent: { subject: string; fields: Record<string, unknown> }[] = [];

  async send(subject: string, fields: Record<string, unknown>) {
    this.sent.push({ subject, fields });
    return 'sent' as const;
  }
}

describe('Shop', () => {
  let component: Shop;
  let fixture: ComponentFixture<Shop>;
  let delivery: FakeDelivery;

  const watch = PRODUCTS.find(p => p.id === 'smart-watch')!;

  const fillDetails = () => {
    component.name.set('Ada Obi');
    component.email.set('ada@example.com');
    component.phone.set('08012345678');
    component.address.set('12 Lateef Jakande Road, Ikeja');
  };

  beforeEach(async () => {
    delivery = new FakeDelivery();

    await TestBed.configureTestingModule({
      imports: [Shop],
      providers: [
        // Stub the destination so confirmTransfer's navigation resolves.
        provideRouter([{ path: 'thank-you', children: [] }]),
        { provide: FormDelivery, useValue: delivery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Shop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('charges the standard unit price below the bulk threshold', () => {
    component.open(watch);
    component.setQuantity(99);

    expect(component.bulkApplied()).toBe(false);
    expect(component.unitPrice()).toBe(65000);
    expect(component.total()).toBe(99 * 65000);
  });

  it('applies the bulk price at and above the threshold', () => {
    component.open(watch);
    component.setQuantity(100);

    expect(component.bulkApplied()).toBe(true);
    expect(component.unitPrice()).toBe(55000);
    expect(component.total()).toBe(100 * 55000);
  });

  it('never allows a quantity below one', () => {
    component.open(watch);

    component.setQuantity(0);
    expect(component.quantity()).toBe(1);

    component.step(-5);
    expect(component.quantity()).toBe(1);
  });

  it('blocks ordering until delivery details are complete', () => {
    component.open(watch);
    expect(component.canOrder()).toBe(false);

    fillDetails();

    expect(component.canOrder()).toBe(true);
  });

  it('sends the order details when a transfer is confirmed', async () => {
    component.open(watch);
    component.setQuantity(2);
    fillDetails();

    await component.confirmTransfer();

    expect(delivery.sent.length).toBe(1);
    expect(delivery.sent[0].fields['total']).toBe(130000);
    expect(delivery.sent[0].fields['delivery_address'])
      .toBe('12 Lateef Jakande Road, Ikeja');
  });

  it('carries the real total to the thank-you page', async () => {
    const router = TestBed.inject(Router);
    const navigate = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component.open(watch);
    component.setQuantity(100);
    fillDetails();

    await component.confirmTransfer();

    // Regression: the summary is read before selected() is cleared, so the
    // amount must be the bulk total rather than zero.
    expect(navigate).toHaveBeenCalledWith(['/thank-you'], {
      queryParams: expect.objectContaining({
        amount: 5500000,
        qty: 100,
        method: 'transfer'
      })
    });
  });

  it('does not send anything when details are incomplete', async () => {
    component.open(watch);

    await component.confirmTransfer();

    expect(delivery.sent.length).toBe(0);
  });
});
