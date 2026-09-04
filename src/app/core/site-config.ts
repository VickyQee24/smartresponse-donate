/**
 * Single source of truth for organisation details, payment settings and
 * external links. Update values here rather than in individual templates.
 */

export interface BankAccount {
  currency: string;
  label: string;
  number: string;
}

/** One recurring giving tier, backed by a Paystack Plan. */
export interface PlanTier {
  /** Amount in naira. Must match the amount on the Paystack Plan. */
  amount: number;
  /** The plan's PLN_... code. Empty hides the tier. */
  code: string;
}

export const SITE = {

  organisation: {
    name: 'Smart Response Youth Foundation',
    longName:
      'Smart Response Youth Foundation for Upholding the Dignity of ' +
      'Marginalized Youth and Girl Child',
    slogan: 'Save the Dignity.',
    registration: 'CAC/IT/8435264',
    company: 'Smart Response App Technologies Ltd'
  },

  contact: {
    email: 'info@112smartresponseafrica.com.ng',
    // TODO: replace with the live phone number
    phone: '+234 XXX XXX XXXX',
    location: 'Lagos, Nigeria'
  },

  links: {
    whatsappChannel:
      'https://whatsapp.com/channel/0029VbCvcK084OmJn15K702e',
    podcast:
      'https://open.spotify.com/show/033HGtZsDcyVs5lPBQR9MQ',
    // TODO: replace with the live web app URL that the install QR points to
    appDownload: '',
    instagram: 'https://instagram.com/smartresponse_africa',
    facebook: 'https://facebook.com/smartresponse_africa',
    x: 'https://x.com/smartresponse_',
    linkedin:
      'https://www.linkedin.com/company/smart-response-app-technologies-ltd'
  },

  /**
   * Launch flyer assets. Drop the files into public/images/ and the QR codes
   * appear automatically on the blog and the home page.
   */
  launch: {
    dates: '23 – 24 September 2026',
    venue: 'Adeleke University Campus, Main Auditorium, Ede, Osun State',
    time: '10:00am prompt',
    flyer: '/images/launch-flyer.jpg',
    qrInstall: '/images/qr-install.png'     // extracted from the launch PDF
  },

  bank: {
    name: 'Guaranty Trust Bank',
    accountName:
      'Smart Response Youth Foundation for Upholding the Dignity of ' +
      'Marginalized Youth and Girl Child',
    accounts: <BankAccount[]>[
      { currency: 'NGN', label: 'Nigerian Naira', number: '3003066928' },
      { currency: 'USD', label: 'US Dollar', number: '3003066959' },
      { currency: 'EUR', label: 'Euro', number: '3003066973' },
      { currency: 'GBP', label: 'Pound Sterling', number: '3003066997' }
    ]
  },

  /**
   * Form delivery. There is no backend, so submissions are sent through
   * Web3Forms (free, no server). Get an access key at https://web3forms.com
   * using info@112smartresponseafrica.com.ng and paste it below.
   *
   * Until then, forms fall back to opening the visitor's mail client with
   * the message pre-filled, so nothing is lost.
   */
  forms: {
    web3formsKey: ''
  },

  paystack: {
    /**
     * Paystack PUBLIC key (pk_test_... or pk_live_...). Safe to ship in the
     * browser bundle. Nothing charges until this is filled in.
     */
    publicKey: '',

    /**
     * A Paystack Plan carries a FIXED amount, so recurring giving is offered
     * as tiers. For each amount below, create a Plan in the Paystack
     * dashboard (Recurring -> Plans) with the matching interval and amount,
     * then paste its PLN_... code here.
     *
     * Tiers with an empty code are hidden from the site, so you can launch
     * with only the ones you have created.
     */
    plans: <Record<'weekly' | 'monthly' | 'yearly', PlanTier[]>>{
      weekly: [
        { amount: 1000, code: '' },
        { amount: 2500, code: '' },
        { amount: 5000, code: '' }
      ],
      monthly: [
        { amount: 2000, code: '' },
        { amount: 5000, code: '' },
        { amount: 10000, code: '' },
        { amount: 25000, code: '' }
      ],
      yearly: [
        { amount: 25000, code: '' },
        { amount: 50000, code: '' },
        { amount: 100000, code: '' }
      ]
    }
  }
} as const;

export const NGN = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0
});
