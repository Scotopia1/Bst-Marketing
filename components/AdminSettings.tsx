import React, { useState, useEffect } from 'react';
import { Save, Zap, Rocket, Target, BarChart2, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/Button';
import { storage } from '../services/storage';
import { SiteSettings } from '../types';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    setSettings(storage.getSettings());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (settings) {
      storage.saveSettings(settings);
      alert('Settings saved! You may need to refresh the page to see changes in the header/footer.');
    }
  };

  const handleChange = (field: keyof SiteSettings, value: any) => {
    if (settings) {
      setSettings({ ...settings, [field]: value });
    }
  };

  const handleSocialChange = (field: keyof SiteSettings['social'], value: string) => {
    if (settings) {
      setSettings({ 
        ...settings, 
        social: { ...settings.social, [field]: value } 
      });
    }
  };

  const handleSeoChange = (field: keyof SiteSettings['seo'], value: string) => {
    if (settings) {
      setSettings({ 
        ...settings, 
        seo: { ...settings.seo, [field]: value } 
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to ~2MB to prevent localStorage quota issues)
      if (file.size > 2 * 1024 * 1024) {
        alert("File is too large. Please upload an image smaller than 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
           handleChange('customLogo', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveCustomLogo = () => {
    if (settings) {
      setSettings({ ...settings, customLogo: undefined });
    }
  };

  if (!settings) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-8">Website Settings</h2>
      
      <form onSubmit={handleSave} className="space-y-8 max-w-2xl">
        
        {/* Branding Section */}
        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-neutral-800 pb-2">Branding & Logo</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Company Name (White)</label>
              <input 
                value={settings.brandName}
                onChange={(e) => handleChange('brandName', e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-4 py-2 text-white focus:border-red-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Accent Text (Red)</label>
              <input 
                value={settings.brandAccent}
                onChange={(e) => handleChange('brandAccent', e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-4 py-2 text-white focus:border-red-500 outline-none"
              />
            </div>
          </div>
          
          <div className="mb-8">
            <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Current Logo Type</label>
            {settings.customLogo ? (
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-neutral-700 bg-neutral-950 relative group">
                  <img src={settings.customLogo} alt="Custom Logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-green-500 font-bold flex items-center"><ImageIcon className="w-4 h-4 mr-1"/> Custom Logo Active</span>
                  <Button type="button" variant="outline" size="sm" onClick={handleRemoveCustomLogo}>
                     <Trash2 className="w-3 h-3 mr-2" /> Remove Logo
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                {['zap', 'rocket', 'target', 'bar-chart'].map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => handleChange('logoIcon', icon)}
                    className={`p-3 rounded-lg border flex items-center justify-center transition-all ${
                      settings.logoIcon === icon 
                        ? 'bg-red-600 border-red-500 text-white' 
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-600'
                    }`}
                  >
                    {icon === 'zap' && <Zap className="w-6 h-6" />}
                    {icon === 'rocket' && <Rocket className="w-6 h-6" />}
                    {icon === 'target' && <Target className="w-6 h-6" />}
                    {icon === 'bar-chart' && <BarChart2 className="w-6 h-6" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Upload Section */}
          <div className="bg-neutral-950 rounded-lg p-6 border border-neutral-800">
             <h4 className="flex items-center text-sm font-bold text-white uppercase mb-4">
               <Upload className="w-4 h-4 text-red-500 mr-2" /> Upload Custom Logo
             </h4>
             <p className="text-sm text-neutral-400 mb-4">
               Upload a PNG, JPG, or SVG file to use as your logo. <br/>
               <span className="text-xs text-neutral-500">(Max size: 2MB. Square aspect ratio recommended.)</span>
             </p>
             
             <input
                type="file"
                accept="image/*,.svg"
                onChange={handleImageUpload}
                className="block w-full text-sm text-neutral-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-xs file:font-bold file:uppercase
                  file:bg-neutral-800 file:text-white
                  hover:file:bg-neutral-700
                  hover:file:cursor-pointer
                  cursor-pointer
                "
              />
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-neutral-800 pb-2">Social Media Links</h3>
          <p className="text-xs text-neutral-500 mb-4">Leave a field empty to hide the link from the footer.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Instagram URL</label>
              <input 
                value={settings.social.instagram}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-4 py-2 text-white focus:border-red-500 outline-none"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Facebook URL</label>
              <input 
                value={settings.social.facebook}
                onChange={(e) => handleSocialChange('facebook', e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-4 py-2 text-white focus:border-red-500 outline-none"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">LinkedIn URL</label>
              <input 
                value={settings.social.linkedin}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-4 py-2 text-white focus:border-red-500 outline-none"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Twitter / X URL</label>
              <input 
                value={settings.social.twitter}
                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-4 py-2 text-white focus:border-red-500 outline-none"
                placeholder="https://twitter.com/..."
              />
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-neutral-800 pb-2">SEO (Search Engine Optimization)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Home Page Title</label>
              <input 
                value={settings.seo.title}
                onChange={(e) => handleSeoChange('title', e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-4 py-2 text-white focus:border-red-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Meta Description</label>
              <textarea 
                value={settings.seo.description}
                onChange={(e) => handleSeoChange('description', e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-4 py-2 text-white focus:border-red-500 outline-none h-24"
              />
            </div>
          </div>
        </div>

        <Button type="submit" size="lg">
          <Save className="w-5 h-5 mr-2" /> Save Settings
        </Button>
      </form>
    </div>
  );
};