import React from 'react';
import { FileText, Settings, TrendingUp } from 'lucide-react';

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h4 className="text-red-500 font-bold uppercase tracking-widest mb-2 text-sm">How we work</h4>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
            It's Straightforward
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-neutral-800 via-red-900/50 to-neutral-800 -z-10"></div>

            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-8 shadow-2xl relative z-10">
                    <FileText className="w-10 h-10 text-red-500" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold text-white">1</div>
                </div>
                <h3 className="text-xl font-black text-white uppercase mb-3">Plan Your Success</h3>
                <p className="text-neutral-400 text-sm leading-relaxed px-4">
                    We figure out who your customers are and what they want to hear before we start.
                </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-8 shadow-2xl relative z-10">
                    <Settings className="w-10 h-10 text-orange-500" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center font-bold text-white">2</div>
                </div>
                <h3 className="text-xl font-black text-white uppercase mb-3">Handle Everything Daily</h3>
                <p className="text-neutral-400 text-sm leading-relaxed px-4">
                    We create ads, schedule them, and manage all your campaigns so you don't have to.
                </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-8 shadow-2xl relative z-10">
                    <TrendingUp className="w-10 h-10 text-yellow-400" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black">3</div>
                </div>
                <h3 className="text-xl font-black text-white uppercase mb-3">Track What Works</h3>
                <p className="text-neutral-400 text-sm leading-relaxed px-4">
                    We see which posts bring in customers and do more of what's working.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};