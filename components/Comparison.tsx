import React from 'react';
import { Check, X } from 'lucide-react';

export const Comparison: React.FC = () => {
  return (
    <section id="difference" className="py-24 bg-surface">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h4 className="text-red-500 font-bold uppercase tracking-widest mb-2 text-sm">The Difference</h4>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
            Why choose BST Marketing over everyone else?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Other Agencies */}
          <div className="bg-neutral-950/50 border border-neutral-800 rounded-2xl p-8 md:p-10 relative overflow-hidden opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
            <h3 className="text-2xl font-black text-neutral-500 uppercase mb-8 text-center border-b border-neutral-800 pb-4">Other Agencies</h3>
            <ul className="space-y-6">
                {[
                    "Generic content templates",
                    "Monthly reporting only",
                    "Separate teams for different platforms",
                    "Long-term contracts required",
                    "One-size-fits-all approach"
                ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center shrink-0 mt-0.5">
                            <X className="w-3 h-3 text-neutral-400" />
                        </div>
                        <span className="text-neutral-400 font-medium">{item}</span>
                    </li>
                ))}
            </ul>
          </div>

          {/* BST Marketing */}
          <div className="bg-neutral-900 border border-red-500/30 rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-2xl shadow-red-900/10 transform md:-translate-y-4">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-500"></div>
            <h3 className="text-2xl font-black text-white uppercase mb-8 text-center border-b border-neutral-800 pb-4">
                BST <span className="text-red-500">Marketing</span>
            </h3>
            <ul className="space-y-6">
                {[
                    "If it doesn't work, we refund you",
                    "Start small and see if we're a good fit",
                    "Facebook, Instagram, Google, we cover it all",
                    "Stay flexible - no long-term commitments",
                    "Regular calls to review what's working"
                ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-green-500" />
                        </div>
                        <span className="text-white font-bold">{item}</span>
                    </li>
                ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};