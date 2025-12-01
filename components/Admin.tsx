import React, { useState } from 'react';
import { Lock, FileText, Users, LogOut, Settings, User } from 'lucide-react';
import { Button } from './ui/Button';
import { Page } from '../types';
import { AdminBlog } from './AdminBlog';
import { AdminLeads } from './AdminLeads';
import { AdminSettings } from './AdminSettings';

interface AdminProps {
  onNavigate: (page: Page) => void;
}

export const Admin: React.FC<AdminProps> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'blog' | 'leads' | 'settings'>('blog');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Anthony-G' && password === 'BSTMarketing@123@A') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect username or password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-background px-6">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white text-center mb-2">Admin Access</h1>
          <p className="text-neutral-400 text-center mb-8">Enter your credentials to continue.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-neutral-500" />
                <input 
                  type="text" 
                  placeholder="Username" 
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-10 pr-4 py-3 text-white focus:border-red-500 outline-none transition-colors"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-neutral-500" />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-10 pr-4 py-3 text-white focus:border-red-500 outline-none transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-2">Login to Dashboard</Button>
          </form>
          <button 
            onClick={() => onNavigate('home')} 
            className="w-full mt-4 text-sm text-neutral-500 hover:text-white transition-colors"
          >
            &larr; Back to Website
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-background">
      <div className="container mx-auto px-6">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-neutral-800 pb-8">
          <div>
            <h1 className="text-3xl font-black text-white mb-2">BST Dashboard</h1>
            <p className="text-neutral-400">Welcome back, Anthony.</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={() => onNavigate('home')}
              className="border-neutral-700"
            >
              View Site
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setIsAuthenticated(false)}
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <button 
              onClick={() => setActiveTab('blog')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'blog' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'}`}
            >
              <FileText className="w-5 h-5" /> Blog Posts
            </button>
            <button 
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'leads' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'}`}
            >
              <Users className="w-5 h-5" /> Leads & Subs
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'settings' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'}`}
            >
              <Settings className="w-5 h-5" /> Site Settings
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 bg-neutral-950 rounded-2xl border border-neutral-800 p-8 min-h-[600px]">
            {activeTab === 'blog' && <AdminBlog />}
            {activeTab === 'leads' && <AdminLeads />}
            {activeTab === 'settings' && <AdminSettings />}
          </div>
        </div>

      </div>
    </div>
  );
};