/**
 * Single source of truth for organisation details, payment settings and
 * external links. Update values here rather than in individual templates.
 */

export interface BankAccount {
  currency: string;
  label: string;
  number: string;
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
    phone: '+234 708 962 7576',
    /** Same number, digits only, for tel: links. */
    phoneLink: '+2347089627576',
    location: 'Lagos, Nigeria'
  },

  links: {
    whatsappChannel:
      'https://whatsapp.com/channel/0029VbCvcK084OmJn15K702e',
    podcast:
      'https://open.spotify.com/show/033HGtZsDcyVs5lPBQR9MQ',
    /** The web app the install QR code points to. */
    appDownload: 'https://112smartresponseafrica.com.ng',
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
    web3formsKey: '7a5dc359-a89b-4874-84f9-574c5b76c40a'
  },

  paystack: {
    /**
     * Paystack PUBLIC key (pk_test_... or pk_live_...). Safe to ship in the
     * browser bundle. Nothing charges until this is filled in.
     */
    // LIVE key — real money. The matching sk_live_... secret must be set as
    // PAYSTACK_SECRET_KEY in Vercel, or recurring giving will fail.
    publicKey: 'pk_live_7234f0e1dfb6f0fe0706fd19d432f63a6db17172'

    /**
     * Recurring giving needs a Paystack Plan for the chosen amount, which is
     * minted on demand by api/paystack-plan.js. That function reads the
     * SECRET key from the PAYSTACK_SECRET_KEY environment variable in Vercel
     * — never put the secret key in this file, it ships to the browser.
     */
  }
} as const;

export const NGN = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0
});
