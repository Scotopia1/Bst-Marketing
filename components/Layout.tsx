import React, { useState } from 'react';
import { Icons } from './Icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isAdmin = location.pathname.startsWith('/admin');

  // Simple logout mock
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-100 selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-primary rounded flex items-center justify-center transform -skew-x-12">
                  <Icons.Zap className="w-5 h-5 text-white fill-current transform skew-x-12" />
               </div>
               <span className="font-bold text-xl italic tracking-tighter text-white">
                 <span className="text-white">BST</span>
                 <span className="text-primary">MARKETING</span>
               </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {!isAdmin ? (
                  <>
                    <Link to="/" className="text-gray-300 hover:text-white transition-colors text-xs font-medium tracking-widest uppercase">Home</Link>
                    <Link to="/blog" className="text-gray-300 hover:text-white transition-colors text-xs font-medium tracking-widest uppercase">Blog</Link>
                    <Link to="/newsletter" className="text-gray-300 hover:text-white transition-colors text-xs font-medium tracking-widest uppercase">Newsletter</Link>
                    <Link to="/contact" className="bg-primary hover:bg-orange-600 text-white transition-colors px-6 py-3 rounded text-xs font-bold uppercase tracking-wider">
                      Book a Call
                    </Link>
                  </>
                ) : (
                  <>
                     <span className="text-sm text-gray-400 mr-4">Admin Mode</span>
                     <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                        <Icons.LogOut className="w-4 h-4" /> Logout
                     </button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              >
                {isMobileMenuOpen ? <Icons.X className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-surface border-b border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {!isAdmin ? (
                <>
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">Home</Link>
                  <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">Blog</Link>
                  <Link to="/newsletter" onClick={() => setIsMobileMenuOpen(false)} className="block hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">Newsletter</Link>
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block bg-primary text-white px-3 py-2 rounded-md text-base font-medium mt-4 text-center">Book a Call</Link>
                </>
              ) : (
                <button onClick={handleLogout} className="w-full text-left block hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium text-red-400">Logout</button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      {!isAdmin && (
        <footer className="bg-surface border-t border-white/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-primary rounded flex items-center justify-center transform -skew-x-12">
                      <Icons.Zap className="w-3 h-3 text-white fill-current transform skew-x-12" />
                  </div>
                  <span className="font-bold text-lg italic tracking-tighter">BST MARKETING</span>
                </div>
                <p className="text-gray-400 text-sm max-w-xs">
                  Escalating brands through data-driven strategies and world-class creative execution.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Services</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>SEO Optimization</li>
                  <li>Content Marketing</li>
                  <li>Paid Media</li>
                  <li>Web Development</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Legal</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li><Link to="/admin/login" className="hover:text-white transition-colors">Admin Login</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} BST Marketing. All rights reserved.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};