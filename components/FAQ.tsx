import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How fast can I expect results?",
    answer: "Our direct response campaigns usually start generating clicks and leads within 48-72 hours of launch. Optimization takes a few weeks to reach peak efficiency."
  },
  {
    question: "Do I need a large budget to start?",
    answer: "No. We believe in testing small and scaling what works. We can start with a conservative budget to validate the offer before pouring gas on the fire."
  },
  {
    question: "What industries do you work with?",
    answer: "We specialize in local service businesses and high-ticket offers where ROI is clear. If you sell a solid product or service, we can sell it."
  },
  {
    question: "Is there a long-term contract?",
    answer: "No. We operate on performance and results. We earn your business every single month."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h4 className="text-red-500 font-bold uppercase tracking-widest mb-2 text-sm">Questions</h4>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`border rounded-lg transition-all duration-300 ${
                openIndex === index 
                  ? 'bg-neutral-900 border-red-500/50' 
                  : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-white' : 'text-neutral-400'}`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-red-500" />
                ) : (
                  <Plus className="w-5 h-5 text-neutral-500" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-neutral-400 leading-relaxed border-t border-neutral-800/50 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};