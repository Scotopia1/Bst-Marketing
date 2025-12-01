import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Page } from '../types';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      {/* Background Blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-600/10 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 text-white leading-none">
              We'll Fill Your Calendar with New Customers in 30 Days - <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Guaranteed</span>
            </h1>

            <p className="text-lg text-neutral-400 mb-8 leading-relaxed max-w-xl">
              Stop waiting for customers to find you. We put your business in front of locals actively searching for your services - starting this month.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button size="lg" className="w-full sm:w-auto shadow-red-500/25" onClick={() => onNavigate('book')}>
                Book A Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Right Column: Video */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative aspect-video bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Subtle overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 to-transparent"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};