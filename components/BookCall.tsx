import React, { useState } from 'react';
import { Calendar, Clock, Video, Send, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';
import { storage } from '../services/storage';

export const BookCall: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storage.addLead({
      ...formData,
      type: 'call_request'
    });
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Left Column: Context */}
          <div>
            <h4 className="text-red-500 font-bold uppercase tracking-widest mb-4 text-sm">Discovery Call</h4>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Let's Map Out Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Dominance Strategy</span>
            </h1>
            
            <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
              This isn't a sales pitch disguised as a call. We'll look at your current setup, identify the bottlenecks, and show you exactly how we can add 20-30 new customers next month.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-white font-bold">30 Minutes</h3>
                  <p className="text-sm text-neutral-400">Short, punchy, and valuable.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Zoom Meeting</h3>
                  <p className="text-sm text-neutral-400">Face to face strategy session.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Actionable Plan</h3>
                  <p className="text-sm text-neutral-400">Walk away with a roadmap, whether you hire us or not.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-[40px]"></div>
            
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-fade-in">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                <p className="text-neutral-400 max-w-xs">We'll be in touch shortly to schedule your time slot.</p>
                <Button className="mt-8" variant="outline" onClick={() => setIsSubmitted(false)}>Submit Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                 <h3 className="text-xl font-bold text-white">Enter Your Details</h3>
                 
                 <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Name</label>
                    <input 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-red-500 outline-none"
                    />
                 </div>
                 
                 <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Email</label>
                    <input 
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-red-500 outline-none"
                    />
                 </div>
                 
                 <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Phone Number</label>
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-red-500 outline-none"
                    />
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">What's your biggest challenge?</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-red-500 outline-none"
                    />
                 </div>

                 <Button type="submit" className="w-full">
                   <Send className="w-4 h-4 mr-2" /> Request Call
                 </Button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};