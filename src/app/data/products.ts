export interface Product {
  id: string;
  name: string;
  tagline: string;
  /** Unit price in naira. */
  price: number;
  /** Discounted unit price once bulkFrom quantity is reached. */
  bulkPrice?: number;
  bulkFrom?: number;
  unit: string;
  /** Main product shot. Empty renders a branded placeholder. */
  image?: string;
  /** Extra shots shown as thumbnails under the main image. */
  gallery?: string[];
  features: string[];
  impact: string;
}

export const PRODUCTS: Product[] = [

  {
    id: 'smart-watch',
    name: 'Smart Response Safety Watch',
    tagline:
      'A wearable SOS and anti-kidnapping alarm that works with the ' +
      '112 Smart Response App.',
    price: 65000,
    bulkPrice: 55000,
    bulkFrom: 100,
    unit: 'watch',
    // Save the WhatsApp photo of the blue watch on the stand here.
    image: '/images/products/smart-watch.jpg',
    // Save the tray photo showing the pink and blue stock here.
    gallery: ['/images/products/smart-watch-colours.jpg'],
    features: [
      'One-touch SOS alert sent to your emergency contacts',
      'Anti-kidnapping alarm that can be triggered without using a phone',
      'GPS location tracking so responders know where you are',
      'Two-way voice call to saved guardian numbers',
      'Pairs with the 112 Smart Response App for emergency reporting',
      'Safe-zone alerts when the wearer leaves a set area',
      'Colour touchscreen display with time, date and battery',
      'Rechargeable battery with everyday wear comfort',
      'Available in pink and blue silicone straps'
    ],
    impact:
      'Every watch bought helps fund a watch for a vulnerable girl or ' +
      'young person in an underserved community.'
  },

  {
    id: 'sanitary-pack',
    name: 'Sanitary Ware Pack',
    tagline:
      'Menstrual health products distributed through the Save Her ' +
      'Dignity Campaign.',
    price: 1000,
    unit: 'pack',
    image: '',
    features: [
      'Sanitary pads and essential menstrual hygiene items',
      'Distributed directly to schools and communities we work in',
      'Supports adolescent girls facing menstrual poverty',
      'Buy one for yourself or sponsor packs for a school outreach'
    ],
    impact:
      'One pack keeps one girl in school through her period instead of ' +
      'staying home.'
  }
];

export const DONATION_PRESETS = [2000, 5000, 10000, 25000, 50000, 100000];

export type Frequency = 'once' | 'weekly' | 'monthly' | 'yearly';

export const FREQUENCIES: { id: Frequency; label: string; note: string }[] = [
  { id: 'once',    label: 'Give once',  note: 'A single gift' },
  { id: 'weekly',  label: 'Weekly',     note: 'Charged every week' },
  { id: 'monthly', label: 'Monthly',    note: 'Charged every month' },
  { id: 'yearly',  label: 'Yearly',     note: 'Charged every year' }
];
