import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';
import { storage } from '../services/storage';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      storage.addSubscriber(email);
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Mail className="w-8 h-8 text-red-500" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            The <span className="text-red-500">Unfair Advantage</span> Newsletter
          </h1>
          
          <p className="text-xl text-neutral-400 mb-12 leading-relaxed">
            Join local business owners receiving weekly direct response strategies that are working 
            <span className="italic text-white"> right now</span>. No BS, just things that will get results straight away.
          </p>

          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden group hover:border-red-500/30 transition-all duration-500">
             <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-[80px]"></div>
             
             {isSubmitted ? (
               <div className="text-center py-6 animate-fade-in relative z-10">
                 <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                 <h3 className="text-2xl font-bold text-white mb-2">You're In!</h3>
                 <p className="text-neutral-400">Keep an eye on your inbox for the next drop.</p>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="relative z-10 flex flex-col md:flex-row gap-4">
                 <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address" 
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-6 py-4 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                 />
                 <Button type="submit" className="md:w-auto w-full shadow-red-500/20">
                   Subscribe Free <ArrowRight className="w-4 h-4 ml-2" />
                 </Button>
               </form>
             )}
             {!isSubmitted && <p className="mt-4 text-xs text-neutral-500 relative z-10">Unsubscribe at any time. We hate spam as much as you do.</p>}
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-8 text-left">
            {[
              { title: "Case Studies", desc: "Real breakdowns of campaigns that generated 10x ROI." },
              { title: "Swipe Files", desc: "Copy-paste headlines and ad scripts you can use today." },
              { title: "Market Trends", desc: "What's changing in the algo and how to profit from it." }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/50">
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};