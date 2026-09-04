import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Smart Response Youth Foundation — Save the Dignity',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'about',
    title: 'About Us — Smart Response Youth Foundation',
    loadComponent: () =>
      import('./pages/about/about').then(m => m.About)
  },
  {
    path: 'services',
    title: 'Our Services — Smart Response Youth Foundation',
    loadComponent: () =>
      import('./pages/services/services').then(m => m.Services)
  },
  {
    path: 'blog',
    title: 'Blog — Smart Response Youth Foundation',
    loadComponent: () =>
      import('./pages/blog/blog').then(m => m.Blog)
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./pages/blog-post/blog-post').then(m => m.BlogPost)
  },
  {
    path: 'donate',
    title: 'Donate — Save Her Dignity Campaign',
    loadComponent: () =>
      import('./pages/donate/donate').then(m => m.Donate)
  },
  {
    path: 'shop',
    title: 'Shop to Support — Smart Response Youth Foundation',
    loadComponent: () =>
      import('./pages/shop/shop').then(m => m.Shop)
  },
  {
    path: 'volunteer',
    title: 'Volunteer — Smart Response Youth Foundation',
    loadComponent: () =>
      import('./pages/volunteer/volunteer').then(m => m.Volunteer)
  },
  {
    path: 'contact',
    title: 'Contact Us — Smart Response Youth Foundation',
    loadComponent: () =>
      import('./pages/contact/contact').then(m => m.Contact)
  },
  {
    path: 'thank-you',
    title: 'Thank You — Smart Response Youth Foundation',
    loadComponent: () =>
      import('./pages/thank-you/thank-you').then(m => m.ThankYou)
  },
  {
    path: 'terms',
    title: 'Terms and Conditions — Smart Response Youth Foundation',
    loadComponent: () =>
      import('./pages/legal/terms').then(m => m.Terms)
  },
  {
    path: 'privacy',
    title: 'Privacy Policy — Smart Response Youth Foundation',
    loadComponent: () =>
      import('./pages/legal/privacy').then(m => m.Privacy)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
