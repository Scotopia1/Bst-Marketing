import React from 'react';
import { PhoneCall } from 'lucide-react';
import { Button } from './ui/Button';
import { Page } from '../types';

interface CTAProps {
  onNavigate: (page: Page) => void;
}

export const CTA: React.FC<CTAProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-12 md:p-20 shadow-2xl relative">
          
          {/* Glow effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[80px]"></div>

          <h4 className="text-red-500 font-bold uppercase tracking-widest mb-4 text-sm relative z-10">Get started</h4>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter relative z-10">
            Your Customer flood starts right here.
          </h2>
          <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto relative z-10">
            Book a free 30 min call and we'll show you exactly how we'll fill your calendar with new customers.
          </p>
          
          <div className="relative z-10">
            <Button size="lg" className="text-lg px-10 h-16 shadow-red-500/20 shadow-xl" onClick={() => onNavigate('book')}>
              <PhoneCall className="w-5 h-5 mr-2" />
              Book A Free Call
            </Button>
            <p className="mt-4 text-neutral-500 text-xs uppercase tracking-wider font-semibold">
              No Obligation. No Pressure. Just Strategy.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};