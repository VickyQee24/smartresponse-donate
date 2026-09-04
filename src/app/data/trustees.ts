export interface Trustee {
  name: string;
  role: string;
  initials: string;
  /** Path under public/images/team/. Empty renders an initials avatar. */
  photo: string;
  bio: string[];
}

export const TRUSTEES: Trustee[] = [

  {
    name: 'Victoria Chidinma Chukwu',
    role: 'Founder / Trustee Chairperson',
    initials: 'VC',
    photo: '/images/team/victoria.jpg',
    bio: [
      `Victoria hails from Imo State, Nigeria, and was born and raised in ` +
      `Maryland, Lagos. She is the founder of the non-governmental ` +
      `organization Smart Response Youth Foundation for Upholding the ` +
      `Dignity of Marginalized Youth and Girl Child, which advances the ` +
      `humanitarian mission of the Smart Response App through youth ` +
      `empowerment and anti-corruption initiatives.`,

      `As an entrepreneur and innovator, Victoria co-founded the 112 Smart ` +
      `Response App with Samuel Peter Ntekob and Isaac Yakubu, which is ` +
      `affiliated to Smart Response Youth Foundation (SRYF) with a slogan ` +
      `and a mission to help save the dignity of young girls, women and ` +
      `youth.`
    ]
  },

  {
    name: 'Joyce Ugochinyere Anyanwu',
    role: 'Trustee',
    initials: 'JA',
    photo: '/images/team/joyce.jpg',
    bio: [
      `A top notch business executive with a big heart, championing the ` +
      `Smart Response Youth Foundation Save the Dignity campaign. ` +
      `Resilient and a philanthropist.`,

      `Trustee, Smart Response Youth Foundation for Upholding the Dignity ` +
      `of Marginalized Youth and Girl Child.`
    ]
  },

  {
    name: 'Olagunju Damilare Elijah',
    role: 'Trustee',
    initials: 'OE',
    // TODO: add public/images/team/damilare.jpg
    photo: '',
    bio: [
      `Trustee of the Smart Response Youth Foundation and a contributor to ` +
      `the foundation's writing on dignity, youth innovation and justice.`
    ]
  }

  // TODO: Donald — photo and short bio still to come from Miss Vicky.
];
