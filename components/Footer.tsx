import React, { useState, useEffect } from 'react';
import { Zap, Rocket, Target, BarChart2 } from 'lucide-react';
import { Page, SiteSettings } from '../types';
import { storage } from '../services/storage';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    setSettings(storage.getSettings());
  }, []);

  const renderLogo = () => {
    // Priority: Custom Image Logo
    if (settings?.customLogo) {
      return (
        <img 
          src={settings.customLogo} 
          alt="Brand Logo" 
          className="w-8 h-8 rounded object-cover border border-white/10"
        />
      );
    }

    const iconName = settings?.logoIcon || 'zap';
    const props = { className: "w-5 h-5 text-white fill-white" };
    
    let icon;
    switch (iconName) {
      case 'rocket': icon = <Rocket {...props} />; break;
      case 'target': icon = <Target {...props} />; break;
      case 'bar-chart': icon = <BarChart2 {...props} />; break;
      default: icon = <Zap {...props} />;
    }

    return (
      <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center">
        {icon}
      </div>
    );
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => onNavigate('home')}>
               {renderLogo()}
              <span className="text-xl font-black uppercase italic tracking-tighter">
                {settings?.brandName || 'BST'}
                <span className="text-red-600">{settings?.brandAccent || 'Marketing'}</span>
              </span>
            </div>
            <p className="text-neutral-400 text-sm max-w-sm mb-4 leading-relaxed font-medium">
              Paid Ads that drive real results.
            </p>
            <p className="text-neutral-500 text-sm max-w-sm leading-relaxed">
              Built for local brick and mortar businesses.
            </p>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Connect</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li>
                <button onClick={() => onNavigate('book')} className="hover:text-red-500 transition-colors">Book a call</button>
              </li>
              
              {settings?.social.instagram && (
                <li>
                  <a 
                    href={settings.social.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-red-500 transition-colors flex items-center gap-2"
                  >
                    Instagram
                  </a>
                </li>
              )}
              
              {settings?.social.facebook && (
                <li>
                  <a 
                    href={settings.social.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-red-500 transition-colors flex items-center gap-2"
                  >
                    Facebook
                  </a>
                </li>
              )}

              {settings?.social.linkedin && (
                <li>
                  <a 
                    href={settings.social.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-red-500 transition-colors flex items-center gap-2"
                  >
                    LinkedIn
                  </a>
                </li>
              )}

              {settings?.social.twitter && (
                <li>
                  <a 
                    href={settings.social.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-red-500 transition-colors flex items-center gap-2"
                  >
                    Twitter / X
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Navigate Column */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Navigate</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li><button onClick={() => onNavigate('home')} className="hover:text-red-500 transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate('newsletter')} className="hover:text-red-500 transition-colors">Newsletter</button></li>
              <li><button onClick={() => onNavigate('blog')} className="hover:text-red-500 transition-colors">Blog</button></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600 font-medium">
          <p>© {new Date().getFullYear()} {settings?.brandName || 'BST'} {settings?.brandAccent || 'Marketing'}. All rights reserved.</p>
          <div className="flex gap-4 items-center">
             <a href="#" className="hover:text-neutral-400">Privacy</a>
             <a href="#" className="hover:text-neutral-400">Terms</a>
             <button onClick={() => onNavigate('admin')} className="hover:text-red-500 ml-4 opacity-50 hover:opacity-100">Admin</button>
          </div>
        </div>
      </div>
    </footer>
  );
};