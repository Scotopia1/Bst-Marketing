import { ReactNode } from 'react';

export type Page = 'home' | 'newsletter' | 'book' | 'blog' | 'admin';

export interface NavItem {
  label: string;
  id: Page | string;
  type: 'page' | 'link';
}

export interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content?: string; // Full content
  readTime: string;
  image: string; // CSS class for gradient
  date: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  date: string;
  type: 'call_request' | 'contact';
}

export interface Subscriber {
  id: string;
  email: string;
  date: string;
}

export interface SiteSettings {
  brandName: string;
  brandAccent: string;
  logoIcon: 'zap' | 'rocket' | 'target' | 'bar-chart';
  customLogo?: string; // Base64 string of the generated logo
  social: {
    instagram: string;
    linkedin: string;
    twitter: string;
    facebook: string;
  };
  seo: {
    title: string;
    description: string;
  };
}