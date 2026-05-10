import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SiteData {
  hero: {
    title: string;
    subtitle: string;
    intro: string;
    primaryBtnText: string;
    secondaryBtnText: string;
    stats: { label: string; value: string }[];
    imageUrl: string;
    bengaliName: string;
  };
  navbar: {
    logoText: string;
    logoSpan: string;
    items: { name: string; href: string }[];
  };
  about: {
    bio: string;
    skills: string[];
    experience: { year: string; company: string; role: string }[];
    cvUrl: string;
  };
  portfolio: {
    id: string;
    title: string;
    category: string;
    youtubeUrl: string;
    thumbnail: string;
    description: string;
  }[];
  services: {
    id: string;
    title: string;
    description: string;
    icon: string;
    // New fields for details page
    details?: {
      heroImage: string;
      intro: string;
      workflow: { step: string; desc: string }[];
      tools: string[];
      videoPreview?: string;
      pricing: string;
      faq: { q: string; a: string }[];
    };
  }[];
  designs: {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    isTop?: boolean;
    isSelected?: boolean;
    isFeatured?: boolean;
    isLatest?: boolean;
    tags: string[];
    software?: string[];
    date?: string;
  }[];
  stories: {
    id: string;
    docId: string;
    title: string;
    subtitle: string;
    heroImage: string;
    sections: {
      type: 'text' | 'image' | 'video' | 'quote' | 'timeline' | 'bts';
      title?: string;
      content: any;
    }[];
    credits?: { role: string; name: string }[];
    links?: { label: string; url: string }[];
  }[];
  packages: {
    id: string;
    name: string;
    price: string;
    features: string[];
    featured: boolean;
  }[];
  documentary: {
    title: string;
    description: string;
    items: {
      id: string;
      title: string;
      thumbnail: string;
      description: string;
      topic: string;
      videoUrl: string;
    }[];
  };
  testimonials: {
    name: string;
    role: string;
    text: string;
    rating: number;
    avatar: string;
  }[];
  messages: {
    id: string;
    name: string;
    email: string;
    text: string;
    date: string;
    unread: boolean;
  }[];
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
    socials: { platform: string; url: string; icon: string }[];
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    glowIntensity: number;
    glassOpacity: number;
  };
}

interface SiteContextType {
  data: SiteData;
  updateData: (newData: Partial<SiteData>) => void;
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
  addMessage: (msg: { name: string; email: string; text: string }) => void;
}

const defaultData: SiteData = {
  hero: {
    title: "Crafting StoriesThrough Editing",
    subtitle: "Cinematic Storytelling",
    intro: "Award-winning Video Editor & Documentary Filmmaker transforming raw footage into emotionally powerful visual experiences for global brands and news media.",
    primaryBtnText: "Watch Showreel",
    secondaryBtnText: "View Portfolio",
    bengaliName: "সাঈদ আল মাহদী",
    stats: [
      { label: 'Edited Videos', value: '3958+' },
      { label: 'Exp Years', value: '3+' },
      { label: 'Millions Views', value: '150M+' },
      { label: 'Documentaries', value: '12+' },
    ],
    imageUrl: "https://scontent.fdac136-1.fna.fbcdn.net/v/t39.30808-6/678630988_122109484575122278_4518957466877379032_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=flfyNZuPdu8Q7kNvwFLcHsS&_nc_oc=Adp7O5mtXBvxlZNzLSfjDza7jqHkGIzPZGtOp07au46zJ07rM6F-rngi_ztYkZYQcwI&_nc_zt=23&_nc_ht=scontent.fdac136-1.fna&_nc_gid=qzfcJnNi6CwY6CPAFLCtCA&_nc_ss=7b2a8&oh=00_Af78hA149TEyF1euvnyo0NN4cQ3McQQL0waZcj724ZqhHw&oe=6A06BA9B"
  },
  navbar: {
    logoText: "SAIED",
    logoSpan: "AL MAHDI",
    items: [
      { name: 'Home', href: '#home' },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Designs', href: '#designs' },
      { name: 'Services', href: '#services' },
      { name: 'About', href: '#about' },
      { name: 'Contact', href: '#contact' },
    ]
  },
  about: {
    bio: "I am Saied Al Mahdi, a cinematic storyteller with over 8 years of experience in the film industry. My passion lies in breathing life into raw footage, crafting narratives that resonate deeply with audiences across the globe.",
    skills: ["Video Editing", "Color Grading", "Sound Design", "Motion Graphics", "AI Integration", "Documentary Filmmaking"],
    experience: [
      { year: "2020 - Present", company: "Al Mahdi Films", role: "Lead Editor" },
      { year: "2018 - 2020", company: "Global Media Group", role: "Senior Video Editor" },
      { year: "2016 - 2018", company: "Creative Vision", role: "Junior Editor" },
    ],
    cvUrl: "https://scontent.fdac136-1.fna.fbcdn.net/v/t39.30808-6/696323168_122180107004801410_5458213209122438354_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeEQSNfT4lIenva5v6JzZwLI-q-4eKy8cBb6r7h4rLxwFgbcNSTexpgf3HhJaPTxAhKNjuov8M05iGY5jwUZ7wqt&_nc_ohc=mziCAi7C24EQ7kNvwFD1ErW&_nc_oc=AdqqnQ7bBp0SPeqdbDSBaIruFVfb--GMKYciioWryNqoVEMpC2pnBgbbEMFdsvcKmf8&_nc_zt=23&_nc_ht=scontent.fdac136-1.fna&_nc_gid=QCJbh6ArMTtgvHsLsXPMzw&_nc_ss=7b2a8&oh=00_Af6dk_NCCfqFfASOjRZJyQVWi9kg-hpnsqcxvAa1cmGKOQ&oe=6A069BD2"
  },
  portfolio: [
    { id: '1', title: 'The Echoes of Silence', category: 'Documentary', youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1492691523567-61707d2e5ef4?auto=format&fit=crop&q=80', description: 'A deep dive into the lives of forgotten communities.' },
    { id: '2', title: 'Neon Pulse', category: 'Music Video', youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80', description: 'A high-energy visual feast for a global artist.' },
    { id: '3', title: 'Urban Shadows', category: 'Cinematic', youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&q=80', description: 'Exploring the dark corners of modern metropolises.' },
  ],
  services: [
    { 
      id: '1', 
      title: 'Cinematic Editing', 
      description: 'Transforming raw footage into a cohesive, atmospheric masterpiece.', 
      icon: 'Video',
      details: {
        heroImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1600',
        intro: 'Professional cinematic editing that brings out the emotional depth of your footage. I focus on pacing, color, and storytelling to create a truly immersive experience.',
        workflow: [
          { step: 'Review', desc: 'Analyzing all raw footage and identifying the best takes.' },
          { step: 'Assembly', desc: 'Creating the initial story structure and pacing.' },
          { step: 'Polish', desc: 'Adding sound design, color grading, and visual effects.' }
        ],
        tools: ['Adobe Premiere Pro', 'DaVinci Resolve', 'After Effects'],
        videoPreview: 'dQw4w9WgXcQ',
        pricing: 'Starting at $200 per project',
        faq: [
          { q: 'What is the turnaround time?', a: 'Usually 3-5 days depending on the project complexity.' },
          { q: 'Do you provide revisions?', a: 'Yes, I offer unlimited minor revisions until you are satisfied.' }
        ]
      }
    },
    { id: '2', title: 'Color Grading', description: 'Applying professional color profiles to set the mood and tone.', icon: 'Sparkles' },
    { id: '3', title: 'Sound Design', description: 'Creating immersive auditory landscapes that complement the visuals.', icon: 'Mic' },
  ],
  designs: [
    { 
      id: '1', 
      title: 'Cinematic Movie Poster', 
      description: 'A dark, atmospheric poster for an upcoming documentary.', 
      category: 'Posters', 
      imageUrl: 'https://images.unsplash.com/photo-1542204113-e93847e212ef?auto=format&fit=crop&q=80&w=800',
      isTop: true,
      tags: ['Creative', 'Dark', 'Cinematic'],
      software: ['Photoshop', 'Midjourney']
    },
    { 
      id: '2', 
      title: 'YouTube Viral Thumbnail', 
      description: 'High-CTR thumbnail design for a tech channel.', 
      category: 'Thumbnails', 
      imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
      isFeatured: true,
      tags: ['Vibrant', 'Tech', 'High CTR']
    },
    { 
      id: '3', 
      title: 'AI Concept Art', 
      description: 'Exploration of future cityscapes using AI tools.', 
      category: 'AI Art', 
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
      isLatest: true,
      tags: ['Futuristic', 'AI', 'Concept']
    },
  ],
  stories: [
    {
      id: 'showreel-story',
      docId: 'showreel',
      title: 'My Cinematic Vision',
      subtitle: 'The Story Behind the Masterpieces',
      heroImage: 'https://images.unsplash.com/photo-1492691523567-61707d2e5ef4?auto=format&fit=crop&q=80&w=1600',
      sections: [
        { type: 'text', content: 'Every frame I edit is a heartbeat in a larger narrative. My journey in cinematic editing began with a obsession for light and movement.' },
        { type: 'image', content: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=1200' },
        { type: 'bts', title: 'The Editing Room', content: 'Most of my magic happens at 3 AM, when the world is quiet and the colors speak for themselves.' },
        { type: 'quote', content: 'Storytelling is not about what you see, but what you feel.' }
      ],
      credits: [
        { role: 'Editor', name: 'Saied Al Mahdi' },
        { role: 'Studio', name: 'Al Mahdi Films' }
      ]
    },
    {
      id: 'story-1',
      docId: '1',
      title: 'The Making of AI and Humanity',
      subtitle: 'A journey into the heart of the machine',
      heroImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1600',
      sections: [
        { type: 'text', content: 'This documentary was born from a simple question: can a machine truly create? Over the course of six months, we interviewed dozens of AI researchers and artists.' },
        { type: 'quote', content: 'The line between human and machine is blurring faster than we ever imagined.' },
        { type: 'image', content: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200' },
        { type: 'bts', title: 'Behind the Scenes', content: 'Filming in the lab was a challenge due to the high-frequency interference from the server cooling systems.' }
      ],
      credits: [
        { role: 'Director', name: 'Saied Al Mahdi' },
        { role: 'Editor', name: 'Al Mahdi Films' }
      ]
    }
  ],
  packages: [
    { id: '1', name: 'Starter', price: '20', features: ['Basic Editing', '1 Video', 'Simple Transitions', 'HD Export', '2 Iterations'], featured: false },
    { id: '2', name: 'Professional', price: '80', features: ['Cinematic Editing', 'Motion Graphics', 'Sound Design', 'Color Grading', 'Full HD/4K', 'Unlimited Stock Footages'], featured: true },
    { id: '3', name: 'Documentary Premium', price: '200', features: ['Storytelling Edit', 'Advanced Color Grading', 'Sound Mixing', 'AI Visual Enhancement', 'Full Cinematic Experience', 'Social Media Shorts Kit'], featured: false },
  ],
  documentary: {
    title: "Cinematic Documentaries",
    description: "Stories that matter. Crafting visual essays and in-depth investigations into the modern world.",
    items: [
      {
        id: '1',
        title: 'AI and Humanity',
        thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
        description: 'An exploration of the deep connection and impending conflict between human creativity and machine intelligence.',
        topic: 'Technology',
        videoUrl: ''
      },
      {
        id: '2',
        title: 'The Dark Side of Social Media',
        thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1200',
        description: 'How digital algorithms are reshaping our dopamine loops and social structures.',
        topic: 'Society',
        videoUrl: ''
      },
    ]
  },
  testimonials: [
    {
      name: 'Sajal Ahmed',
      role: 'YouTuber',
      text: 'Saied is not just an editor; he is a storyteller. My channel growth doubled after he took over the editing and pacing.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Maria Khan',
      role: 'Documentary Director',
      text: 'Exceptional attention to detail and sound design. The visual tone he created for our project was beyond my expectations.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'David Miller',
      role: 'Content Creator',
      text: 'The cinematic quality Saied brings to every project is unmatched. He transformed my travel vlog into a movie-like experience.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Anika Rahman',
      role: 'Entrepreneur',
      text: 'His ability to understand the brand message and translate it into a visual narrative is brilliant. Highly recommended for commercial projects.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Jason Chen',
      role: 'Tech Reviewer',
      text: 'I worked with many editors, but Saieds workflow and creative input made the difference. 150M+ views on our joint projects says it all!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    }
  ],
  messages: [
    { id: '1', name: 'John Doe', email: 'john@example.com', text: 'Love your documentary on AI! Let\'s collaborate.', date: '2h ago', unread: true },
    { id: '2', name: 'Sarah Smith', email: 'sarah@media.com', text: 'Available for a new project next month?', date: '1d ago', unread: false },
  ],
  contact: {
    email: "contact@almahdi.com",
    phone: "+880 1775-390365",
    whatsapp: "+880 1775-390365",
    location: "Dhaka, Bangladesh",
    socials: [
      { platform: 'YouTube', url: 'https://youtube.com', icon: 'Youtube' },
      { platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
      { platform: 'Facebook', url: 'https://facebook.com', icon: 'Facebook' },
      { platform: 'Twitter', url: 'https://twitter.com', icon: 'Twitter' },
      { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
    ]
  },
  theme: {
    primaryColor: "#ff7a1a",
    secondaryColor: "#7db8ff",
    glowIntensity: 1,
    glassOpacity: 0.03,
  }
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(() => {
    const saved = localStorage.getItem('siteData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with defaultData to ensure new fields are present if user has old version in localStorage
        return { 
          ...defaultData, 
          ...parsed,
          // Specifically ensure root level arrays exist
          portfolio: parsed.portfolio || defaultData.portfolio,
          services: parsed.services || defaultData.services,
          designs: parsed.designs || defaultData.designs,
          stories: parsed.stories || defaultData.stories,
          packages: parsed.packages || defaultData.packages,
          testimonials: parsed.testimonials || defaultData.testimonials,
          messages: parsed.messages || defaultData.messages,
        };
      } catch (e) {
        return defaultData;
      }
    }
    return defaultData;
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('siteData', JSON.stringify(data));
    
    // Apply theme globally
    const root = document.documentElement;
    root.style.setProperty('--primary', data.theme.primaryColor);
    root.style.setProperty('--secondary', data.theme.secondaryColor);
    root.style.setProperty('--glow-multiplier', data.theme.glowIntensity.toString());
    root.style.setProperty('--glass-opacity', data.theme.glassOpacity.toString());
  }, [data]);

  const updateData = (newData: Partial<SiteData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const addMessage = (msg: { name: string; email: string; text: string }) => {
    const newMessage = {
      ...msg,
      id: Date.now().toString(),
      date: 'Just now',
      unread: true
    };
    setData(prev => ({
      ...prev,
      messages: [newMessage, ...prev.messages]
    }));
  };

  return (
    <SiteContext.Provider value={{ data, updateData, isEditMode, setIsEditMode, addMessage }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSiteData must be used within SiteProvider');
  return context;
};
