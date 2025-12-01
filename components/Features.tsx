import React from 'react';
import { Search, Share2, MapPin } from 'lucide-react';
import { Feature } from '../types';

const services: Feature[] = [
  {
    title: 'Ads To Get To The Top Of Google',
    description: 'Show up immediately when locals search for exactly what you offer. We capture high-intent traffic ready to buy.',
    icon: <Search className="w-8 h-8 text-red-500" />,
  },
  {
    title: 'FB/IG Ads To Reach EVERY Local Client',
    description: 'Be everywhere. Google, Instagram, Facebook, YouTube. We follow your prospects until they convert.',
    icon: <Share2 className="w-8 h-8 text-orange-500" />,
  },
  {
    title: 'Reach Number 1 On Google For Free',
    description: 'Be the #1 on Google Maps organically. Dominate local SEO so you own the "Map Pack" in your city.',
    icon: <MapPin className="w-8 h-8 text-yellow-400" />,
  },
];

export const Features: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-surface relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h4 className="text-red-500 font-bold uppercase tracking-widest mb-2 text-sm">Services</h4>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
            How we can help you <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">grow</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group p-10 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-red-600/50 hover:bg-neutral-900 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-6 p-5 bg-neutral-950 rounded-full border border-neutral-800 group-hover:border-red-500/30 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                {service.icon}
              </div>
              <h3 className="text-xl font-black mb-4 text-white uppercase leading-tight">{service.title}</h3>
              <p className="text-neutral-400 leading-relaxed text-sm font-medium">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};