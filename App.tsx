import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Process } from './components/Process';
import { Comparison } from './components/Comparison';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { Newsletter } from './components/Newsletter';
import { BookCall } from './components/BookCall';
import { Blog } from './components/Blog';
import { Admin } from './components/Admin';
import { Page } from './types';
import { storage } from './services/storage';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Handle SEO Title & Metadata
  useEffect(() => {
    const settings = storage.getSettings();
    let title = settings.seo.title;
    let desc = settings.seo.description;

    // Override for subpages
    if (currentPage === 'blog') {
        title = `Blog | ${settings.brandName}`;
        desc = 'No BS marketing strategies to grow your business.';
    } else if (currentPage === 'book') {
        title = `Book A Call | ${settings.brandName}`;
        desc = 'Schedule your free strategy session today.';
    } else if (currentPage === 'newsletter') {
        title = `Newsletter | ${settings.brandName}`;
        desc = 'Join our weekly newsletter for direct response insights.';
    } else if (currentPage === 'admin') {
        title = `Admin | ${settings.brandName}`;
    }

    document.title = title;
    
    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = desc;
      document.head.appendChild(meta);
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <Features />
            <Process />
            <Comparison />
            <FAQ />
            <CTA onNavigate={setCurrentPage} />
          </>
        );
      case 'newsletter':
        return <Newsletter />;
      case 'book':
        return <BookCall />;
      case 'blog':
        return <Blog onNavigate={setCurrentPage} />;
      case 'admin':
        return <Admin onNavigate={setCurrentPage} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-zinc-50 font-sans selection:bg-red-500/30 flex flex-col">
      {currentPage !== 'admin' && <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />}
      <main className="flex-grow">
        {renderPage()}
      </main>
      {currentPage !== 'admin' && <Footer onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;