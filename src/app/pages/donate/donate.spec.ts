import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Donate } from './donate';

describe('Donate', () => {
  let component: Donate;
  let fixture: ComponentFixture<Donate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Donate],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Donate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('uses the selected preset when no custom amount is typed', () => {
    component.selectPreset(25000);
    expect(component.effectiveAmount()).toBe(25000);
  });

  it('lets a custom amount override the preset', () => {
    component.selectPreset(25000);
    component.customAmount.set('7500');

    expect(component.effectiveAmount()).toBe(7500);
  });

  it('falls back to the preset when the custom amount is cleared', () => {
    component.selectPreset(5000);
    component.customAmount.set('7500');
    component.customAmount.set('');

    expect(component.effectiveAmount()).toBe(5000);
  });

  it('requires a valid email and a minimum amount', () => {
    component.selectPreset(10000);
    expect(component.canGive()).toBe(false);

    component.email.set('donor@example.com');
    expect(component.canGive()).toBe(true);

    component.customAmount.set('50');
    expect(component.canGive()).toBe(false);
  });

  it('flags recurring gifts when no plan code is configured', () => {
    component.setFrequency('once');
    expect(component.planMissing()).toBe(false);

    component.setFrequency('monthly');
    // No plan codes are set until they are created in the Paystack dashboard.
    expect(component.planMissing()).toBe(true);
    expect(component.tiers()).toEqual([]);
  });

  it('hides recurring tiers that have no plan code yet', () => {
    component.setFrequency('monthly');

    // Every configured tier must carry a PLN_ code to be offered.
    expect(component.tiers().every(t => t.code.length > 0)).toBe(true);
  });

  it('never sends a recurring gift without a matching plan code', () => {
    component.setFrequency('monthly');
    component.email.set('donor@example.com');

    expect(component.planCode()).toBe('');
    expect(component.canGive()).toBe(false);
  });

  it('ignores a custom amount once a recurring frequency is chosen', () => {
    component.customAmount.set('7777');
    expect(component.effectiveAmount()).toBe(7777);

    component.setFrequency('monthly');

    expect(component.customAmount()).toBe('');
    expect(component.effectiveAmount()).toBe(component.amount());
  });

  it('exposes all four bank accounts for transfer', () => {
    expect(component.site.bank.accounts.map(a => a.currency))
      .toEqual(['NGN', 'USD', 'EUR', 'GBP']);
  });
});
