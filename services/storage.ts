import { BlogPost, Lead, Subscriber, SiteSettings } from '../types';

const KEYS = {
  POSTS: 'bst_posts',
  LEADS: 'bst_leads',
  SUBSCRIBERS: 'bst_subscribers',
  SETTINGS: 'bst_settings',
};

// Initial Seed Data (So the blog isn't empty on first load)
const INITIAL_POSTS: BlogPost[] = [
  {
    id: 1,
    category: 'Google Ads',
    title: 'Stop Lighting Money on Fire: The Negative Keyword Strategy',
    excerpt: 'Most agencies set broad match keywords and walk away. Here is why that is destroying your ROI.',
    readTime: '5 min read',
    image: 'bg-gradient-to-br from-red-900 to-red-950',
    date: new Date().toISOString(),
    content: "If you are running Google Ads without a negative keyword list, you are essentially throwing money into a bonfire.\n\nNegative keywords tell Google what you DO NOT want to show up for. For example, if you are a luxury lawyer, you do not want to show up for searches like 'free lawyer' or 'cheap legal advice'.\n\nMost agencies set up 'Broad Match' keywords because it gets them more clicks, which looks good on a monthly report. But those clicks are trash. They don't convert.\n\nWe audit accounts every day where 40% of the budget is wasted on irrelevant searches. Fixing this one thing can often double your ROI overnight."
  },
  {
    id: 2,
    category: 'Copywriting',
    title: 'The "Grandma Test" For High-Converting Headlines',
    excerpt: 'If your grandmother does not understand what you sell in 3 seconds, neither will your customers.',
    readTime: '4 min read',
    image: 'bg-gradient-to-br from-orange-900 to-orange-950',
    date: new Date().toISOString(),
    content: "Complexity is the enemy of conversion. \n\nWe see business owners trying to sound smart with words like 'synergy', 'paradigm shift', and 'holistic solutions'. \n\nYour customer is scrolling through Instagram on the toilet. They do not have the brainpower to decode your corporate jargon.\n\nThe Grandma Test is simple: If you showed your headline to your grandmother, would she immediately understand what you sell? \n\nIf the answer is no, rewrite it. Clear beats clever every single time. Tell them what you do, how it helps them, and what to do next."
  },
  {
    id: 3,
    category: 'Local SEO',
    title: 'Why "Near Me" Searches Are The Holy Grail',
    excerpt: 'Dominate the 5-mile radius around your shop and watch your phone ring off the hook.',
    readTime: '6 min read',
    image: 'bg-gradient-to-br from-neutral-800 to-neutral-900',
    date: new Date().toISOString(),
    content: "When someone searches for 'Plumber near me' or 'Italian restaurant near me', they have high intent. They are not browsing; they are looking to buy right now.\n\nRanking #1 for these searches is not about magic. It's about consistency.\n\n1. Claim your Google Business Profile.\n2. Get reviews (and reply to them).\n3. Post updates weekly.\n4. Ensure your Name, Address, and Phone Number (NAP) are consistent across the entire internet.\n\nDo these four things, and you will beat 90% of your competitors who are too lazy to do the work."
  },
];

const DEFAULT_SETTINGS: SiteSettings = {
  brandName: 'BST',
  brandAccent: 'Marketing',
  logoIcon: 'zap',
  social: {
    instagram: '',
    linkedin: '',
    twitter: '',
    facebook: '',
  },
  seo: {
    title: 'BST Marketing | Direct Response Experts',
    description: 'Boost and Best Marketing. We are a premier direct response marketing and copywriting agency focused on aggressive growth and ROI.'
  }
};

export const storage = {
  // --- BLOG POSTS ---
  getPosts: (): BlogPost[] => {
    const data = localStorage.getItem(KEYS.POSTS);
    if (!data) {
      localStorage.setItem(KEYS.POSTS, JSON.stringify(INITIAL_POSTS));
      return INITIAL_POSTS;
    }
    return JSON.parse(data);
  },

  addPost: (post: Omit<BlogPost, 'id' | 'date'>) => {
    const posts = storage.getPosts();
    const newPost: BlogPost = {
      ...post,
      id: Date.now(),
      date: new Date().toISOString(),
    };
    const updatedPosts = [newPost, ...posts];
    localStorage.setItem(KEYS.POSTS, JSON.stringify(updatedPosts));
    return newPost;
  },

  deletePost: (id: number) => {
    const posts = storage.getPosts();
    const updated = posts.filter(p => p.id !== id);
    localStorage.setItem(KEYS.POSTS, JSON.stringify(updated));
  },

  // --- LEADS (Book a Call) ---
  getLeads: (): Lead[] => {
    return JSON.parse(localStorage.getItem(KEYS.LEADS) || '[]');
  },

  addLead: (lead: Omit<Lead, 'id' | 'date'>) => {
    const leads = storage.getLeads();
    const newLead: Lead = {
      ...lead,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    localStorage.setItem(KEYS.LEADS, JSON.stringify([newLead, ...leads]));
  },

  // --- SUBSCRIBERS (Newsletter) ---
  getSubscribers: (): Subscriber[] => {
    return JSON.parse(localStorage.getItem(KEYS.SUBSCRIBERS) || '[]');
  },

  addSubscriber: (email: string) => {
    const subs = storage.getSubscribers();
    if (subs.find(s => s.email === email)) return;
    
    const newSub: Subscriber = {
      id: crypto.randomUUID(),
      email,
      date: new Date().toISOString(),
    };
    localStorage.setItem(KEYS.SUBSCRIBERS, JSON.stringify([newSub, ...subs]));
  },

  // --- SITE SETTINGS ---
  getSettings: (): SiteSettings => {
    const data = localStorage.getItem(KEYS.SETTINGS);
    if (!data) {
      return DEFAULT_SETTINGS;
    }
    return JSON.parse(data);
  },

  saveSettings: (settings: SiteSettings) => {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  }
};