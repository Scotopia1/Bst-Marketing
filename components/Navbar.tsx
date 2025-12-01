import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, Rocket, Target, BarChart2 } from 'lucide-react';
import { Button } from './ui/Button';
import { NavItem, Page, SiteSettings } from '../types';
import { storage } from '../services/storage';

interface NavbarProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    setSettings(storage.getSettings());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

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

    // Fallback: Icons
    const iconName = settings?.logoIcon || 'zap';
    const props = { className: "w-5 h-5 text-white fill-current" };
    
    let icon;
    switch (iconName) {
      case 'rocket': icon = <Rocket {...props} />; break;
      case 'target': icon = <Target {...props} />; break;
      case 'bar-chart': icon = <BarChart2 {...props} />; break;
      default: icon = <Zap {...props} />;
    }

    return (
      <div className="w-8 h-8 rounded bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/20">
        {icon}
      </div>
    );
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-neutral-800 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavClick('home')}
        >
          {renderLogo()}
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">
            {settings?.brandName || 'BST'}
            <span className="text-red-500">{settings?.brandAccent || 'Marketing'}</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => handleNavClick('home')}
            className={`text-sm font-semibold uppercase tracking-wide transition-colors ${currentPage === 'home' ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('blog')}
            className={`text-sm font-semibold uppercase tracking-wide transition-colors ${currentPage === 'blog' ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            Blog
          </button>
          <button 
            onClick={() => handleNavClick('newsletter')}
            className={`text-sm font-semibold uppercase tracking-wide transition-colors ${currentPage === 'newsletter' ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            Newsletter
          </button>
          <Button variant="primary" size="sm" onClick={() => handleNavClick('book')}>Book A Call</Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-neutral-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-neutral-950 border-b border-neutral-800 p-6 flex flex-col gap-4 shadow-2xl">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-left text-base font-bold text-neutral-300 hover:text-white uppercase"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('blog')}
            className="text-left text-base font-bold text-neutral-300 hover:text-white uppercase"
          >
            Blog
          </button>
          <button 
            onClick={() => handleNavClick('newsletter')}
            className="text-left text-base font-bold text-neutral-300 hover:text-white uppercase"
          >
            Newsletter
          </button>
          <Button className="w-full" onClick={() => handleNavClick('book')}>Book A Call</Button>
        </div>
      )}
    </nav>
  );
};