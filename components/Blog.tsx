import React, { useEffect, useState } from 'react';
import { ArrowRight, Clock, ArrowLeft } from 'lucide-react';
import { Button } from './ui/Button';
import { Page, BlogPost } from '../types';
import { storage } from '../services/storage';

interface BlogProps {
  onNavigate: (page: Page) => void;
}

export const Blog: React.FC<BlogProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    // Fetch posts from our "Mock Database"
    setPosts(storage.getPosts());
  }, []);

  // SCROLL TO TOP when opening a post
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPost]);

  // SINGLE POST VIEW
  if (selectedPost) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <button 
            onClick={() => setSelectedPost(null)}
            className="flex items-center text-neutral-400 hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-wide"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </button>

          <span className="px-3 py-1 bg-red-600/10 text-red-500 text-xs font-bold uppercase tracking-wider rounded-full border border-red-600/20 mb-6 inline-block">
            {selectedPost.category}
          </span>

          <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            {selectedPost.title}
          </h1>

          <div className="flex items-center gap-4 text-neutral-500 text-sm font-medium mb-12 pb-12 border-b border-neutral-800">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {selectedPost.readTime}</span>
            <span>•</span>
            <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
          </div>

          <div className="prose prose-invert prose-lg max-w-none text-neutral-300">
            {selectedPost.content ? (
                selectedPost.content.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-6 leading-relaxed">{paragraph}</p>
                ))
            ) : (
                <p className="italic text-neutral-500">No content available for this post.</p>
            )}
          </div>

          <div className="mt-20 pt-10 border-t border-neutral-800 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Need help implementing this?</h3>
            <Button onClick={() => onNavigate('book')} size="lg" className="shadow-red-500/20">
                Book A Strategy Call
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h4 className="text-red-500 font-bold uppercase tracking-widest mb-2 text-sm">The Blog</h4>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            The No BS Blog That Will Help You Get More Customers
          </h1>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-red-500/30 transition-all duration-300 flex flex-col cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              {/* Image Placeholder */}
              <div className={`h-48 w-full ${post.image} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-neutral-950/80 backdrop-blur-md text-red-500 text-xs font-bold uppercase tracking-wider rounded-full border border-neutral-800">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-neutral-500 text-xs font-medium mb-4">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-neutral-400 text-sm mb-6 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>

                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedPost(post); }}
                  className="flex items-center text-sm font-bold text-white uppercase tracking-wide group/btn hover:text-red-500 transition-colors mt-auto"
                >
                  Read Article 
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {posts.length === 0 && (
            <div className="text-center py-20">
                <p className="text-neutral-500 text-lg">No blog posts found. Visit the admin panel to add some.</p>
            </div>
        )}

        {/* CTA */}
        <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Want these strategies implemented for you?</h3>
            <Button onClick={() => onNavigate('book')} size="lg" className="shadow-red-500/20">
                Book A Strategy Call
            </Button>
        </div>

      </div>
    </div>
  );
};