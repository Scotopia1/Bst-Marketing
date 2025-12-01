import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Save } from 'lucide-react';
import { Button } from './ui/Button';
import { storage } from '../services/storage';
import { BlogPost } from '../types';

export const AdminBlog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState(''); // New Content State
  const [readTime, setReadTime] = useState('');
  const [gradient, setGradient] = useState('bg-gradient-to-br from-red-900 to-red-950');

  useEffect(() => {
    setPosts(storage.getPosts());
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      storage.deletePost(id);
      setPosts(storage.getPosts());
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    storage.addPost({
      title,
      category,
      excerpt,
      content, // Save actual content
      readTime,
      image: gradient,
    });
    setPosts(storage.getPosts());
    setIsEditing(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setCategory('');
    setExcerpt('');
    setContent('');
    setReadTime('');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Manage Blog Posts</h2>
        <Button onClick={() => setIsEditing(!isEditing)} size="sm">
          {isEditing ? 'Cancel' : 'New Post'} <Plus className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {isEditing && (
        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 mb-8 animate-fade-in">
          <h3 className="text-lg font-bold text-white mb-4">Create New Post</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input 
                required
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-4 py-2 text-white focus:border-red-500 outline-none"
              />
              <input 
                required
                placeholder="Category (e.g., Google Ads)"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-4 py-2 text-white focus:border-red-500 outline-none"
              />
            </div>
            
            <textarea 
              required
              placeholder="Short Excerpt (appears on the card)"
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded px-4 py-2 text-white focus:border-red-500 outline-none h-20"
            />

            <textarea 
              required
              placeholder="Full Article Content (You can use simple paragraphs)"
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded px-4 py-2 text-white focus:border-red-500 outline-none h-64 font-mono text-sm leading-relaxed"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <input 
                required
                placeholder="Read Time (e.g., 5 min read)"
                value={readTime}
                onChange={e => setReadTime(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-4 py-2 text-white focus:border-red-500 outline-none"
              />
              <select 
                value={gradient}
                onChange={e => setGradient(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-4 py-2 text-white focus:border-red-500 outline-none"
              >
                <option value="bg-gradient-to-br from-red-900 to-red-950">Red Theme</option>
                <option value="bg-gradient-to-br from-orange-900 to-orange-950">Orange Theme</option>
                <option value="bg-gradient-to-br from-neutral-800 to-neutral-900">Dark Theme</option>
              </select>
            </div>

            <Button type="submit" className="w-full">
              <Save className="w-4 h-4 mr-2" /> Publish Post
            </Button>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post.id} className="flex items-center justify-between p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
            <div>
              <h4 className="text-white font-bold">{post.title}</h4>
              <p className="text-sm text-neutral-500">{post.category} • {post.date.split('T')[0]}</p>
            </div>
            <button 
              onClick={() => handleDelete(post.id)}
              className="p-2 hover:bg-red-500/20 text-neutral-400 hover:text-red-500 rounded transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        {posts.length === 0 && <p className="text-neutral-500">No posts yet.</p>}
      </div>
    </div>
  );
};