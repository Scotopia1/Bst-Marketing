import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from './ui/Button';
import { PricingTier } from '../types';

const tiers: PricingTier[] = [
  {
    name: 'Audit & Strategy',
    price: '$2,500',
    features: ['Deep-Dive Funnel Audit', 'Competitor Spy Report', 'Copywriting Critique', '30-Day Execution Roadmap', '1 Strategy Call'],
  },
  {
    name: 'Growth Partner',
    price: '$5,000',
    features: ['Paid Media Management (2 Channels)', '4x Monthly Ad Creatives', 'Landing Page Split Testing', 'Weekly Optimization', 'Slack Channel Access'],
    recommended: true,
  },
  {
    name: 'CMO For Hire',
    price: '$10k+',
    features: ['Everything in Growth', 'Full Email Marketing Management', 'Offer Creation Workshop', 'Funnel Building Implementation', 'Daily Reporting'],
  },
];

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">Simple, No-BS Pricing</h2>
          <p className="text-neutral-400">We usually work on a Retainer + Performance Fee basis. <br/>These are our base retainers.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative p-8 rounded-2xl border flex flex-col ${
                tier.recommended 
                  ? 'bg-neutral-900 border-red-500 shadow-2xl shadow-red-900/20 transform md:-translate-y-4' 
                  : 'bg-neutral-950 border-neutral-800'
              }`}
            >
              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-600 rounded-full text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-bold text-neutral-300 mb-2 uppercase tracking-wide">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white tracking-tight">{tier.price}</span>
                  {tier.price.includes('$') && <span className="text-neutral-500 font-medium">/mo</span>}
                </div>
              </div>

              <ul className="flex-1 space-y-5 mb-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm font-medium text-neutral-300">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={tier.recommended ? 'primary' : 'outline'}
                className="w-full"
              >
                {tier.name === 'CMO For Hire' ? 'Apply Now' : 'Get Started'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};