import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Film, Settings, LogOut, Plus, Trash2, Edit3, Save, 
  MessageSquare, Bell, Sparkles, Globe, Shield, Search, Eye, Download,
  Palette, MousePointer2, Type, Move, BarChart3, Cloud, Briefcase, Star, Check, X, Play
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSiteData } from '../context/SiteContext';
import Login from './Login';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const { data, updateData, isEditMode, setIsEditMode } = useSiteData();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'portfolio' | 'designs' | 'stories' | 'services' | 'packages' | 'messages' | 'testimonials' | 'settings'>('dashboard');
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = (password: string) => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('isAdmin', 'true');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAdmin');
    setIsEditMode(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 p-8 flex flex-col gap-10 sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-2xl orange-gradient flex items-center justify-center shadow-glow-orange">
             <Shield className="w-6 h-6 text-dark" />
           </div>
           <div className="text-xl font-display font-extrabold tracking-tighter">
            CONTROL <span className="text-primary italic animate-pulse">CENTER</span>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={Briefcase} label="Site Content" active={activeTab === 'content'} onClick={() => setActiveTab('content')} />
          <NavItem icon={Film} label="Portfolio" active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} />
          <NavItem icon={Palette} label="Design Showcase" active={activeTab === 'designs'} onClick={() => setActiveTab('designs')} />
          <NavItem icon={Type} label="Stories" active={activeTab === 'stories'} onClick={() => setActiveTab('stories')} />
          <NavItem icon={Sparkles} label="Services" active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
          <NavItem icon={TrendingUp} label="Packages" active={activeTab === 'packages'} onClick={() => setActiveTab('packages')} />
          <NavItem icon={Star} label="Reviews" active={activeTab === 'testimonials'} onClick={() => setActiveTab('testimonials')} />
          <NavItem icon={MessageSquare} label="Messages" active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} badge={notifications} />
          <NavItem icon={Settings} label="Global Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="mt-auto space-y-4">
           <div className="glass p-4 rounded-2xl border-white/5">
              <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-2 px-1">Global Mode</div>
              <button 
                onClick={() => setIsEditMode(!isEditMode)}
                className={cn(
                  "w-full py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest transition-all",
                  isEditMode ? "bg-primary text-dark shadow-glow-orange" : "bg-white/5 text-white/50 hover:bg-white/10"
                )}
              >
                {isEditMode ? <MousePointer2 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {isEditMode ? 'Live Edit ON' : 'Live Edit OFF'}
              </button>
           </div>
           <button 
             onClick={handleLogout}
             className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/5 w-full transition-all text-xs font-bold uppercase tracking-widest"
           >
             <LogOut className="w-4 h-4" /> Logout
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-12 overflow-y-auto max-w-[1400px] mx-auto w-full">
        <header className="flex justify-between items-start mb-16">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl font-display font-black capitalize tracking-tighter">{activeTab.replace('-', ' ')}</h1>
            <p className="text-white/40 mt-2 font-medium">Command your cinematic empire with professional tools.</p>
          </motion.div>

          <div className="flex gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-glow-orange transition-colors" />
              <input 
                type="text" 
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-primary/50 transition-all w-64"
              />
            </div>
            <button className="p-4 rounded-2xl glass border-white/5 relative">
               <Bell className="w-5 h-5 text-white/50" />
               {notifications > 0 && <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full animate-pulse shadow-glow-orange" />}
            </button>
            <a 
              href="/" 
              className="px-8 py-4 rounded-2xl orange-gradient text-dark font-bold flex items-center gap-2 shadow-glow-orange hover:translate-y-[-2px] transition-all uppercase text-xs tracking-widest"
            >
               View Site
            </a>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && <DashboardModule messages={data.messages || []} />}
            {activeTab === 'content' && <ContentModule data={data} updateData={updateData} />}
            {activeTab === 'portfolio' && <PortfolioModule portfolio={data.portfolio || []} updateData={updateData} />}
            {activeTab === 'designs' && <DesignsModule designs={data.designs || []} updateData={updateData} />}
            {activeTab === 'stories' && <StoriesModule documentals={data.documentary || { items: [] }} stories={data.stories || []} updateData={updateData} />}
            {activeTab === 'services' && <ServicesModule services={data.services || []} updateData={updateData} />}
            {activeTab === 'packages' && <PackagesManagementModule packages={data.packages || []} updateData={updateData} />}
            {activeTab === 'testimonials' && <TestimonialsModule testimonials={data.testimonials || []} updateData={updateData} />}
            {activeTab === 'messages' && <MessagesModule messages={data.messages || []} updateData={updateData} />}
            {activeTab === 'settings' && <GlobalSettingsModule data={data} updateData={updateData} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick, badge }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-between w-full px-5 py-4 rounded-2xl transition-all group",
        active ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_20px_rgba(255,122,26,0.1)]' : 'text-white/40 hover:text-white hover:bg-white/5'
      )}
    >
      <div className="flex items-center gap-4">
        <Icon className={cn("w-5 h-5 transition-transform", active ? "scale-110" : "group-hover:scale-110")} />
        <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
      </div>
      {badge > 0 && (
        <span className="bg-primary text-dark font-black text-[9px] px-2 py-0.5 rounded-full shadow-glow-orange">
          {badge}
        </span>
      )}
    </button>
  );
}

function DashboardModule({ messages }: any) {
  const unreadCount = (messages || []).filter((m: any) => m.unread).length;
  
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Edited Videos', value: '3,958+', icon: Film, trend: 'Total' },
          { label: 'Channel Views', value: '150M+', icon: Eye, trend: '+2.4M' },
          { label: 'Unread Messages', value: unreadCount.toString(), icon: MessageSquare, trend: 'Live' },
          { label: 'Exp Years', value: '3+', icon: BarChart3, trend: 'since 2021' },
        ].map((stat, i) => (
          <div key={i} className="glass p-8 rounded-[32px] border-white/5 hover:border-primary/20 transition-all hover:translate-y-[-4px] group">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-primary/10 transition-colors">
                  <stat.icon className="w-6 h-6 text-white/40 group-hover:text-primary transition-colors" />
               </div>
               <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">{stat.trend}</span>
            </div>
            <div className="text-sm font-bold text-white/30 uppercase tracking-widest mb-2">{stat.label}</div>
            <div className="text-4xl font-display font-black">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         <div className="glass p-10 rounded-[40px] border-white/5">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-xl font-bold flex items-center gap-3">
                 <Cloud className="w-6 h-6 text-secondary" /> Real-time Analytics
               </h3>
               <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs outline-none">
                 <option>Last 7 Days</option>
                 <option>Last 30 Days</option>
               </select>
            </div>
            <div className="h-64 border-b border-l border-white/5 flex items-end justify-between p-4 gap-2">
               {[40, 70, 45, 90, 65, 80, 100, 50, 60, 85, 75, 95].map((h, i) => (
                 <div key={i} className="flex-1 bg-gradient-to-t from-primary/20 via-primary/60 to-primary rounded-t-lg transition-all hover:scale-x-110" style={{ height: `${h}%` }} />
               ))}
            </div>
            <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
               <span>Mon</span>
               <span>Wed</span>
               <span>Fri</span>
               <span>Sun</span>
            </div>
         </div>

         <div className="glass p-10 rounded-[40px] border-white/5">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-8">
               <MessageSquare className="w-6 h-6 text-primary" /> Rapid Response
            </h3>
            <div className="space-y-4">
               {messages.slice(0, 3).map((msg: any) => (
                 <div key={msg.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all text-sm border border-transparent hover:border-white/5">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-primary">
                      {msg.name.charAt(0)}
                    </div>
                    <div className="flex-grow">
                       <div className={cn("font-bold", msg.unread && "text-primary")}>{msg.name} sent a message</div>
                       <div className="text-white/40 text-xs truncate max-w-[200px] italic">"{msg.text}"</div>
                    </div>
                    <div className="text-[10px] text-white/20 whitespace-nowrap">{msg.date}</div>
                 </div>
               ))}
               <button className="w-full py-4 text-xs font-bold uppercase tracking-widest text-primary/60 hover:text-primary transition-colors">
                  View All Messages
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}

function ServicesModule({ services, updateData }: any) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleUpdateDetail = (idx: number, field: string, value: any) => {
    const newServices = [...services];
    const details = newServices[idx].details || { heroImage: '', intro: '', workflow: [], tools: [], pricing: '', faq: [] };
    newServices[idx].details = { ...details, [field]: value };
    updateData({ services: newServices });
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center bg-white/5 p-8 rounded-[40px] border border-white/5">
        <h3 className="text-xl font-bold italic">Services Management</h3>
        <button 
          onClick={() => {
            const title = prompt("Service Title:");
            if (title) {
              const newServices = [...services, { id: Date.now().toString(), title, description: 'Description here...', icon: 'Video' }];
              updateData({ services: newServices });
            }
          }}
          className="px-10 py-5 rounded-[24px] orange-gradient text-dark font-black uppercase text-xs tracking-widest shadow-glow-orange flex items-center gap-3"
        >
          <Plus className="w-5 h-5" /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {services.map((service: any, i: number) => (
          <div key={service.id} className="glass p-8 rounded-[40px] border-white/5 flex flex-col gap-6">
             <div className="flex justify-between items-start">
                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Sparkles className="w-6 h-6" />
                 </div>
                 <div className="flex gap-2">
                    <button onClick={() => setEditingIndex(editingIndex === i ? null : i)} className={cn("p-2 rounded-lg bg-white/5", editingIndex === i && "bg-primary text-dark")}>
                       <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => updateData({ services: services.filter((s: any) => s.id !== service.id) })} className="p-2 rounded-lg bg-red-400/10 text-red-400">
                       <Trash2 className="w-4 h-4" />
                    </button>
                 </div>
             </div>

             <div className="space-y-4">
                <input 
                  value={service.title}
                  onChange={(e) => {
                    const newServices = [...services];
                    newServices[i].title = e.target.value;
                    updateData({ services: newServices });
                  }}
                  className="bg-transparent text-xl font-bold outline-none border-b border-white/5 focus:border-primary/50 w-full"
                />
                <textarea 
                  value={service.description}
                  onChange={(e) => {
                    const newServices = [...services];
                    newServices[i].description = e.target.value;
                    updateData({ services: newServices });
                  }}
                  className="bg-transparent text-white/40 text-sm leading-relaxed outline-none border-b border-white/5 focus:border-primary/50 w-full h-20 resize-none"
                />
             </div>

             {editingIndex === i && (
               <div className="pt-6 border-t border-white/5 space-y-6">
                   <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary">Service Page Details</h4>
                   <div className="grid gap-4">
                      <div className="space-y-1">
                         <label className="text-[8px] uppercase font-bold text-white/20 ml-2">Hero Image</label>
                         <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs" value={service.details?.heroImage || ''} onChange={(e) => handleUpdateDetail(i, 'heroImage', e.target.value)} placeholder="Hero URL" />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[8px] uppercase font-bold text-white/20 ml-2">Detail Intro</label>
                         <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs h-20" value={service.details?.intro || ''} onChange={(e) => handleUpdateDetail(i, 'intro', e.target.value)} placeholder="Long intro text..." />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-1">
                            <label className="text-[8px] uppercase font-bold text-white/20 ml-2">Pricing Display</label>
                            <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs" value={service.details?.pricing || ''} onChange={(e) => handleUpdateDetail(i, 'pricing', e.target.value)} placeholder="$200" />
                         </div>
                         <div className="space-y-1">
                            <label className="text-[8px] uppercase font-bold text-white/20 ml-2">Video Preview (ID)</label>
                            <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs" value={service.details?.videoPreview || ''} onChange={(e) => handleUpdateDetail(i, 'videoPreview', e.target.value)} placeholder="YouTube ID" />
                         </div>
                      </div>
                   </div>
               </div>
             )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PackagesManagementModule({ packages, updateData }: any) {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center bg-white/5 p-8 rounded-[40px] border border-white/5">
        <h3 className="text-xl font-bold italic">Packages Management</h3>
        <button 
          onClick={() => {
             const name = prompt("Package Name:");
             if (name) {
               const newPackages = [...packages, { id: Date.now().toString(), name, price: '0', features: ['Feature 1'], featured: false }];
               updateData({ packages: newPackages });
             }
          }}
          className="px-10 py-5 rounded-[24px] orange-gradient text-dark font-black uppercase text-xs tracking-widest shadow-glow-orange flex items-center gap-3"
        >
          <Plus className="w-5 h-5" /> Add Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg: any, i: number) => (
          <div key={pkg.id} className={cn(
            "glass p-8 rounded-[32px] border-white/5 relative group transition-all",
            pkg.featured && "border-primary/30"
          )}>
             <div className="flex justify-between items-start mb-6">
                <input 
                  value={pkg.price}
                  onChange={(e) => {
                    const newPkgs = [...packages];
                    newPkgs[i].price = e.target.value;
                    updateData({ packages: newPkgs });
                  }}
                  className="bg-white/5 px-3 py-1 rounded-lg text-primary font-bold outline-none border border-white/5 focus:border-primary/50 w-24"
                />
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      const newPkgs = [...packages];
                      newPkgs[i].featured = !newPkgs[i].featured;
                      updateData({ packages: newPkgs });
                    }}
                    className={cn("p-2 rounded-lg transition-all", pkg.featured ? "bg-primary text-dark" : "bg-white/5 text-white/30")}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      const newPkgs = packages.filter((_: any, idx: number) => idx !== i);
                      updateData({ packages: newPkgs });
                    }}
                    className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
             </div>
             
             <input 
               value={pkg.name}
               onChange={(e) => {
                 const newPkgs = [...packages];
                 newPkgs[i].name = e.target.value;
                 updateData({ packages: newPkgs });
               }}
               className="bg-transparent text-xl font-bold mb-4 outline-none border-b border-transparent focus:border-primary/50 w-full"
             />

             <div className="space-y-2">
                {pkg.features.map((f: string, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Check className="w-3 h-3 text-primary" />
                    <input 
                      value={f}
                      onChange={(e) => {
                        const newPkgs = [...packages];
                        newPkgs[i].features[idx] = e.target.value;
                        updateData({ packages: newPkgs });
                      }}
                      className="bg-transparent text-xs text-white/50 outline-none border-b border-transparent focus:border-white/20 flex-grow"
                    />
                    <button 
                      onClick={() => {
                        const newPkgs = [...packages];
                        newPkgs[i].features.splice(idx, 1);
                        updateData({ packages: newPkgs });
                      }}
                      className="text-red-500 opacity-0 group-hover:opacity-100 p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => {
                    const newPkgs = [...packages];
                    newPkgs[i].features.push("New Feature");
                    updateData({ packages: newPkgs });
                  }}
                  className="text-primary text-[10px] font-bold uppercase tracking-widest pt-2"
                >
                  + Add Feature
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesModule({ messages, updateData }: any) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-8 bg-white/5 p-6 rounded-3xl">
        <h3 className="text-lg font-bold">Unread Queue</h3>
        <button 
          onClick={() => {
            const newMessages = messages.map((m: any) => ({ ...m, unread: false }));
            updateData({ messages: newMessages });
          }} 
          className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {messages.map((msg: any, i: number) => (
        <div key={msg.id} className={cn(
          "glass p-8 rounded-[32px] border-white/5 flex items-center justify-between gap-8 transition-all hover:translate-x-1",
          msg.unread && "border-primary/20 bg-primary/5 shadow-glow-orange/10"
        )}>
          <div className="flex items-center gap-6 min-w-[200px]">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center font-bold text-primary text-xl border border-white/10 overflow-hidden">
                 {msg.name.charAt(0)}
              </div>
              {msg.unread && <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary border-4 border-[#0a0a0a] rounded-full shadow-glow-orange" />}
            </div>
            <div>
               <div className="font-bold text-lg">{msg.name}</div>
               <div className="text-xs text-white/30 font-medium">{msg.email}</div>
            </div>
          </div>
          
          <div className="flex-grow text-sm text-white/70 italic px-12 border-x border-white/5 leading-relaxed">
            "{msg.text}"
          </div>
          
          <div className="flex flex-col items-end gap-3 min-w-[150px]">
            <div className="text-[10px] uppercase font-bold text-white/20 tracking-widest">{msg.date}</div>
            <div className="flex gap-2">
               <button 
                onClick={() => {
                  const newMessages = [...messages];
                  newMessages[i].unread = !newMessages[i].unread;
                  updateData({ messages: newMessages });
                }}
                className={cn("p-2.5 rounded-xl transition-all", msg.unread ? "bg-primary text-dark" : "bg-white/5 text-white/40 hover:bg-white/10")}
               >
                 <MessageSquare className="w-4 h-4" />
               </button>
               <button 
                onClick={() => {
                  const newMessages = messages.filter((_: any, idx: number) => idx !== i);
                  updateData({ messages: newMessages });
                }}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-red-400 hover:text-white transition-all text-white/20"
               >
                 <Trash2 className="w-4 h-4" />
               </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ContentModule({ data, updateData }: any) {
  const [section, setSection] = useState<'hero' | 'navbar' | 'about'>('hero');

  return (
    <div className="space-y-12">
      <div className="flex gap-4">
        {['hero', 'navbar', 'about'].map((s: any) => (
          <button 
            key={s}
            onClick={() => setSection(s)}
            className={cn(
              "px-8 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest transition-all",
              section === s ? "bg-primary text-dark shadow-glow-orange" : "bg-white/5 text-white/40 hover:bg-white/10"
            )}
          >
            {s} Section
          </button>
        ))}
      </div>

      <div className="glass p-12 rounded-[40px] border-white/5">
         {section === 'hero' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Hero Title</label>
                   <textarea 
                    value={data.hero.title}
                    onChange={(e) => updateData({ hero: { ...data.hero, title: e.target.value } })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 transition-all h-32 resize-none"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Subtitle</label>
                   <input 
                    type="text"
                    value={data.hero.subtitle}
                    onChange={(e) => updateData({ hero: { ...data.hero, subtitle: e.target.value } })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 transition-all"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Bengali Name</label>
                   <input 
                    type="text"
                    value={data.hero.bengaliName}
                    onChange={(e) => updateData({ hero: { ...data.hero, bengaliName: e.target.value } })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 transition-all"
                   />
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Intro Text</label>
                   <textarea 
                    value={data.hero.intro}
                    onChange={(e) => updateData({ hero: { ...data.hero, intro: e.target.value } })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 transition-all h-48 resize-none"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Hero Image URL</label>
                   <div className="flex gap-4">
                     <input 
                      type="text"
                      value={data.hero.imageUrl}
                      onChange={(e) => updateData({ hero: { ...data.hero, imageUrl: e.target.value } })}
                      className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 transition-all"
                     />
                     <button className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all">
                        <Download className="w-5 h-5" />
                     </button>
                   </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                   <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1 block text-primary">Milestones & Stats</label>
                   <div className="grid grid-cols-2 gap-4">
                      {data.hero.stats.map((stat: any, i: number) => (
                        <div key={i} className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5 group relative">
                           <input 
                             className="w-full bg-transparent text-[10px] font-bold uppercase tracking-widest text-white/30 outline-none"
                             value={stat.label}
                             onChange={(e) => {
                               const newStats = [...data.hero.stats];
                               newStats[i].label = e.target.value;
                               updateData({ hero: { ...data.hero, stats: newStats } });
                             }}
                           />
                           <input 
                             className="w-full bg-transparent text-xl font-display font-black text-white outline-none"
                             value={stat.value}
                             onChange={(e) => {
                               const newStats = [...data.hero.stats];
                               newStats[i].value = e.target.value;
                               updateData({ hero: { ...data.hero, stats: newStats } });
                             }}
                           />
                           <button 
                             onClick={() => {
                               const newStats = data.hero.stats.filter((_: any, idx: number) => idx !== i);
                               updateData({ hero: { ...data.hero, stats: newStats } });
                             }}
                             className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500/50 hover:text-red-500"
                           >
                              <Trash2 className="w-3 h-3" />
                           </button>
                        </div>
                      ))}
                      <button 
                         onClick={() => {
                           const newStats = [...data.hero.stats, { label: 'New Stat', value: '0' }];
                           updateData({ hero: { ...data.hero, stats: newStats } });
                         }}
                         className="flex flex-col items-center justify-center p-4 rounded-2xl border border-dashed border-white/10 text-white/20 hover:bg-white/5 hover:text-primary transition-all"
                      >
                         <Plus className="w-4 h-4 mb-1" />
                         <span className="text-[8px] font-bold uppercase tracking-widest">Add Stat</span>
                      </button>
                   </div>
                </div>
              </div>
           </div>
         )}

         {section === 'navbar' && (
           <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Logo Text Primary</label>
                    <input 
                      type="text"
                      value={data.navbar.logoText}
                      onChange={(e) => updateData({ navbar: { ...data.navbar, logoText: e.target.value } })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 transition-all"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Logo Text Span</label>
                    <input 
                      type="text"
                      value={data.navbar.logoSpan}
                      onChange={(e) => updateData({ navbar: { ...data.navbar, logoSpan: e.target.value } })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 transition-all"
                    />
                 </div>
              </div>

              <div className="space-y-4">
                 <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1 block">Menu Items</label>
                 <div className="space-y-4">
                    {data.navbar.items.map((item: any, i: number) => (
                      <div key={i} className="flex gap-4 p-4 rounded-3xl bg-white/[0.02] border border-white/5">
                        <div className="flex-grow grid grid-cols-2 gap-4">
                          <input 
                            placeholder="Name" 
                            className="bg-transparent text-sm font-bold outline-none border-b border-transparent focus:border-primary/50" 
                            value={item.name}
                            onChange={(e) => {
                              const newItems = [...data.navbar.items];
                              newItems[i].name = e.target.value;
                              updateData({ navbar: { ...data.navbar, items: newItems } });
                            }}
                          />
                          <input 
                            placeholder="Link" 
                            className="bg-transparent text-sm font-mono text-white/40 outline-none border-b border-transparent focus:border-primary/50" 
                            value={item.href}
                            onChange={(e) => {
                              const newItems = [...data.navbar.items];
                              newItems[i].href = e.target.value;
                              updateData({ navbar: { ...data.navbar, items: newItems } });
                            }}
                          />
                        </div>
                        <button className="text-red-400/50 hover:text-red-400 p-2"><Trash2 className="w-4 h-4" /></button>
                        <button className="text-white/20 hover:text-white p-2"><Move className="w-4 h-4" /></button>
                      </div>
                    ))}
                    <button className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest p-4 rounded-3xl border border-dashed border-primary/20 w-full justify-center hover:bg-primary/5 transition-all">
                       <Plus className="w-4 h-4" /> Add Menu Item
                    </button>
                 </div>
              </div>
           </div>
         )}

         {section === 'about' && (
           <div className="space-y-10">
              <div className="space-y-2">
                 <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Biography</label>
                 <textarea 
                  value={data.about.bio}
                  onChange={(e) => updateData({ about: { ...data.about, bio: e.target.value } })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 outline-none focus:border-primary/50 transition-all h-48 resize-none"
                 />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-4">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1 block">Skills</label>
                    <div className="flex flex-wrap gap-2">
                       {data.about.skills.map((skill: string, i: number) => (
                         <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-bold">
                           {skill}
                           <button className="text-white/20 hover:text-red-400 transition-colors"><X className="w-3 h-3" /></button>
                         </div>
                       ))}
                       <button className="px-3 py-1.5 rounded-xl border border-dashed border-primary/20 text-primary hover:bg-primary/5 transition-all">
                          <Plus className="w-3 h-3" />
                       </button>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1 block">CV Attachment</label>
                     <div className="flex gap-4">
                       <input 
                        type="text"
                        value={data.about.cvUrl}
                        onChange={(e) => updateData({ about: { ...data.about, cvUrl: e.target.value } })}
                        className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 transition-all"
                       />
                       <button className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all">
                          <Save className="w-5 h-5" />
                       </button>
                     </div>
                 </div>
              </div>
           </div>
         )}
      </div>
    </div>
  );
}

function PortfolioModule({ portfolio, updateData }: any) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAdd = () => {
    const newProject = {
      id: Date.now().toString(),
      title: 'New Project',
      category: 'Documentary',
      thumbnail: 'https://images.unsplash.com/photo-1492691523567-61707d2e5ef4?auto=format&fit=crop&q=80',
      description: 'Project description here...',
      youtubeUrl: ''
    };
    updateData({ portfolio: [newProject, ...portfolio] });
    setEditingIndex(0);
  };

  const handleRemove = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      updateData({ portfolio: portfolio.filter((p: any) => p.id !== id) });
    }
  };

  const handleSave = (index: number, field: string, value: string) => {
    const newPortfolio = [...portfolio];
    newPortfolio[index] = { ...newPortfolio[index], [field]: value };
    updateData({ portfolio: newPortfolio });
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center bg-white/5 p-8 rounded-[40px] border border-white/5">
        <div className="flex items-center gap-8">
           <div className="flex flex-col">
              <span className="text-4xl font-display font-black text-primary">{portfolio.length}</span>
              <span className="text-[10px] subpixel-antialiased uppercase font-bold tracking-[0.2em] text-white/30">Total Documentaries</span>
           </div>
        </div>
        <button 
          onClick={handleAdd}
          className="px-10 py-5 rounded-[24px] orange-gradient text-dark font-black uppercase text-xs tracking-widest shadow-glow-orange flex items-center gap-3"
        >
          <Plus className="w-5 h-5" /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {portfolio.map((project: any, i: number) => (
          <div key={project.id} className="glass p-6 rounded-[32px] border-white/5 group hover:border-primary/20 transition-all flex flex-col h-full overflow-hidden relative">
            {editingIndex === i ? (
              <div className="space-y-4 pt-4">
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm"
                  value={project.title}
                  onChange={(e) => handleSave(i, 'title', e.target.value)}
                  placeholder="Title"
                />
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm"
                  value={project.category}
                  onChange={(e) => handleSave(i, 'category', e.target.value)}
                  placeholder="Category"
                />
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm"
                  value={project.thumbnail}
                  onChange={(e) => handleSave(i, 'thumbnail', e.target.value)}
                  placeholder="Thumbnail URL"
                />
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm h-32"
                  value={project.description}
                  onChange={(e) => handleSave(i, 'description', e.target.value)}
                  placeholder="Description"
                />
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm"
                  value={project.youtubeUrl}
                  onChange={(e) => handleSave(i, 'youtubeUrl', e.target.value)}
                  placeholder="YouTube URL"
                />
                <button 
                  onClick={() => setEditingIndex(null)}
                  className="w-full py-3 rounded-xl bg-primary text-dark font-bold text-xs uppercase tracking-widest"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                  <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                     <button 
                        onClick={() => setEditingIndex(i)}
                        className="p-3 rounded-xl bg-white/20 backdrop-blur-md hover:bg-primary transition-colors text-white group/btn"
                     >
                        <Edit3 className="w-5 h-5 group-hover/btn:text-dark" />
                     </button>
                     <button 
                        onClick={() => handleRemove(project.id)}
                        className="p-3 rounded-xl bg-white/20 backdrop-blur-md hover:bg-red-500 transition-colors text-white group/btn"
                     >
                        <Trash2 className="w-5 h-5" />
                     </button>
                  </div>
                </div>
                
                <div className="px-2 flex-grow flex flex-col">
                   <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">{project.category}</div>
                   <h3 className="text-xl font-bold mb-3 tracking-tight">{project.title}</h3>
                   <p className="text-white/40 text-xs leading-relaxed mb-6 flex-grow">{project.description}</p>
                   
                   <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                      <div className="flex -space-x-2">
                         <div className="w-8 h-8 rounded-full border-2 border-dark bg-primary/20 flex items-center justify-center">
                            <Play className="w-3 h-3 text-primary" />
                         </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 truncate max-w-[150px]">
                        {project.youtubeUrl || 'No Link'}
                      </span>
                   </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DesignsModule({ designs, updateData }: any) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAdd = () => {
    const newDesign = {
      id: Date.now().toString(),
      title: 'New Design',
      description: 'Design description...',
      category: 'Posters',
      imageUrl: 'https://images.unsplash.com/photo-1542204113-e93847e212ef?auto=format&fit=crop&q=80',
      tags: ['Creative'],
      isLatest: true
    };
    updateData({ designs: [newDesign, ...designs] });
    setEditingIndex(0);
  };

  const handleRemove = (id: string) => {
    if (confirm('Delete this design?')) {
      updateData({ designs: designs.filter((d: any) => d.id !== id) });
    }
  };

  const handleSave = (index: number, field: string, value: any) => {
    const newDesigns = [...designs];
    newDesigns[index] = { ...newDesigns[index], [field]: value };
    updateData({ designs: newDesigns });
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center bg-white/5 p-8 rounded-[40px] border border-white/5">
        <h3 className="text-xl font-bold italic">Design Showcase Management</h3>
        <button 
          onClick={handleAdd}
          className="px-10 py-5 rounded-[24px] orange-gradient text-dark font-black uppercase text-xs tracking-widest shadow-glow-orange flex items-center gap-3"
        >
          <Plus className="w-5 h-5" /> Add New Design
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((design: any, i: number) => (
          <div key={design.id} className="glass p-6 rounded-[32px] border-white/5 flex flex-col gap-4">
             {editingIndex === i ? (
               <div className="space-y-3">
                  <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs" value={design.title} onChange={(e) => handleSave(i, 'title', e.target.value)} placeholder="Title" />
                  <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs" value={design.category} onChange={(e) => handleSave(i, 'category', e.target.value)} placeholder="Category" />
                  <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs" value={design.imageUrl} onChange={(e) => handleSave(i, 'imageUrl', e.target.value)} placeholder="Image URL" />
                  <div className="flex flex-wrap gap-2 py-2">
                     {['isTop', 'isSelected', 'isFeatured', 'isLatest'].map((flag) => (
                       <button 
                        key={flag}
                        onClick={() => handleSave(i, flag, !design[flag])}
                        className={cn("px-2 py-1 rounded text-[8px] uppercase font-bold", design[flag] ? "bg-primary text-dark" : "bg-white/5 text-white/40")}
                       >
                         {flag.replace('is', '')}
                       </button>
                     ))}
                  </div>
                  <button onClick={() => setEditingIndex(null)} className="w-full py-2 bg-primary text-dark font-bold text-[10px] rounded-lg">SAVE</button>
               </div>
             ) : (
               <>
                 <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
                    <img src={design.imageUrl} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                       <button onClick={() => setEditingIndex(i)} className="p-2 rounded-lg bg-white/20"><Edit3 className="w-4 h-4" /></button>
                       <button onClick={() => handleRemove(design.id)} className="p-2 rounded-lg bg-red-400/20"><Trash2 className="w-4 h-4" /></button>
                    </div>
                 </div>
                 <div className="px-2">
                    <div className="text-[8px] font-bold text-primary uppercase mb-1">{design.category}</div>
                    <div className="font-bold text-sm">{design.title}</div>
                 </div>
               </>
             )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StoriesModule({ documentals, stories, updateData }: any) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAdd = () => {
    const newStory = {
      id: Date.now().toString(),
      docId: documentals.items[0]?.id || '1',
      title: 'New Story Journey',
      subtitle: 'The untold path behind the visuals',
      heroImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80',
      sections: [{ type: 'text', content: 'Begin your story here...' }],
      credits: [{ role: 'Director', name: 'Saied Al Mahdi' }]
    };
    updateData({ stories: [newStory, ...stories] });
    setEditingIndex(0);
  };

  const handleSave = (index: number, field: string, value: any) => {
    const newStories = [...stories];
    newStories[index] = { ...newStories[index], [field]: value };
    updateData({ stories: newStories });
  };

  return (
    <div className="space-y-12">
       <div className="flex justify-between items-center bg-white/5 p-8 rounded-[40px] border border-white/5">
        <h3 className="text-xl font-bold italic">Cinematic Stories Management</h3>
        <button 
          onClick={handleAdd}
          className="px-10 py-5 rounded-[24px] orange-gradient text-dark font-black uppercase text-xs tracking-widest shadow-glow-orange flex items-center gap-3"
        >
          <Plus className="w-5 h-5" /> Create New Story
        </button>
      </div>

      <div className="space-y-6">
        {stories.map((story: any, i: number) => (
          <div key={story.id} className="glass p-8 rounded-[40px] border-white/5">
             <div className="flex justify-between items-start mb-8">
                <div className="flex gap-6 items-center">
                   <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10">
                      <img src={story.heroImage} className="w-full h-full object-cover" />
                   </div>
                   <div>
                      <h4 className="text-xl font-bold">{story.title}</h4>
                      <p className="text-xs text-white/40">Linked to Project ID: {story.docId}</p>
                   </div>
                </div>
                <div className="flex gap-2">
                   <button onClick={() => setEditingIndex(editingIndex === i ? null : i)} className="p-3 rounded-xl bg-white/5">
                      {editingIndex === i ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                   </button>
                   <button onClick={() => updateData({ stories: stories.filter((s: any) => s.id !== story.id) })} className="p-3 rounded-xl bg-red-400/10 text-red-400">
                      <Trash2 className="w-5 h-5" />
                   </button>
                </div>
             </div>

             {editingIndex === i && (
               <div className="grid md:grid-cols-2 gap-8 border-t border-white/5 pt-8 mt-8 animate-in slide-in-from-top-4 duration-500">
                  <div className="space-y-4">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Basic Info</label>
                     <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" value={story.title} onChange={(e) => handleSave(i, 'title', e.target.value)} placeholder="Title" />
                     <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" value={story.subtitle} onChange={(e) => handleSave(i, 'subtitle', e.target.value)} placeholder="Subtitle" />
                     <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" value={story.heroImage} onChange={(e) => handleSave(i, 'heroImage', e.target.value)} placeholder="Hero Image URL" />
                     <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none" value={story.docId} onChange={(e) => handleSave(i, 'docId', e.target.value)}>
                        <option value="">Select Project</option>
                        {documentals.items.map((it: any) => <option key={it.id} value={it.id}>{it.title}</option>)}
                     </select>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Story Sections ({story.sections.length})</label>
                       <button onClick={() => {
                         const newSections = [...story.sections, { type: 'text', content: 'New paragraph...' }];
                         handleSave(i, 'sections', newSections);
                       }} className="text-[10px] text-primary font-bold">+ ADD SECTION</button>
                    </div>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                       {story.sections.map((sec: any, sIdx: number) => (
                         <div key={sIdx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 relative group">
                            <select className="text-[8px] bg-dark px-2 py-1 rounded mb-2 font-bold uppercase" value={sec.type} onChange={(e) => {
                               const newSecs = [...story.sections];
                               newSecs[sIdx].type = e.target.value;
                               handleSave(i, 'sections', newSecs);
                            }}>
                               <option value="text">Text</option>
                               <option value="image">Image</option>
                               <option value="video">Video</option>
                               <option value="quote">Quote</option>
                               <option value="bts">Behind Scenes</option>
                            </select>
                            <textarea className="w-full bg-transparent text-sm outline-none resize-none h-20" value={sec.content} onChange={(e) => {
                               const newSecs = [...story.sections];
                               newSecs[sIdx].content = e.target.value;
                               handleSave(i, 'sections', newSecs);
                            }} />
                            <button onClick={() => {
                              const newSecs = [...story.sections];
                              newSecs.splice(sIdx, 1);
                              handleSave(i, 'sections', newSecs);
                            }} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100"><X className="w-4 h-4" /></button>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>
             )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsModule({ testimonials, updateData }: any) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAdd = () => {
    const newTestimonial = {
      name: 'New Client',
      role: 'Role',
      text: 'Project feedback here...',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200'
    };
    updateData({ testimonials: [newTestimonial, ...testimonials] });
    setEditingIndex(0);
  };

  const handleSave = (index: number, field: string, value: any) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    updateData({ testimonials: newTestimonials });
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center bg-white/5 p-8 rounded-[40px] border border-white/5">
        <h3 className="text-xl font-bold italic">Client Reviews Management</h3>
        <button 
          onClick={handleAdd}
          className="px-10 py-5 rounded-[24px] orange-gradient text-dark font-black uppercase text-xs tracking-widest shadow-glow-orange flex items-center gap-3"
        >
          <Plus className="w-5 h-5" /> Add New Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {testimonials.map((test: any, i: number) => (
          <div key={i} className="glass p-6 rounded-[32px] border-white/5 flex flex-col gap-4">
             {editingIndex === i ? (
               <div className="space-y-3">
                  <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs" value={test.name} onChange={(e) => handleSave(i, 'name', e.target.value)} placeholder="Name" />
                  <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs" value={test.role} onChange={(e) => handleSave(i, 'role', e.target.value)} placeholder="Role" />
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs h-20" value={test.text} onChange={(e) => handleSave(i, 'text', e.target.value)} placeholder="Review Text" />
                  <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs" value={test.avatar} onChange={(e) => handleSave(i, 'avatar', e.target.value)} placeholder="Avatar URL" />
                  <button onClick={() => setEditingIndex(null)} className="w-full py-2 bg-primary text-dark font-bold text-[10px] rounded-lg">DONE</button>
               </div>
             ) : (
               <>
                 <div className="flex justify-between">
                    <div className="flex gap-4 items-center">
                       <img src={test.avatar} className="w-12 h-12 rounded-full border border-white/10" />
                       <div>
                          <div className="font-bold text-sm">{test.name}</div>
                          <div className="text-[10px] text-white/40">{test.role}</div>
                       </div>
                    </div>
                    <div className="flex gap-1">
                       <button onClick={() => setEditingIndex(i)} className="p-2 text-white/20 hover:text-primary"><Edit3 className="w-4 h-4" /></button>
                       <button onClick={() => updateData({ testimonials: testimonials.filter((_: any, idx: number) => idx !== i) })} className="p-2 text-white/20 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                 </div>
                 <p className="text-xs text-white/60 italic leading-relaxed">"{test.text}"</p>
                 <div className="flex gap-0.5">
                   {[...Array(5)].map((_, j) => (
                     <Star key={j} className={cn("w-3 h-3", j < test.rating ? "text-primary fill-primary" : "text-white/10")} />
                   ))}
                 </div>
               </>
             )}
          </div>
        ))}
      </div>
    </div>
  );
}

function GlobalSettingsModule({ data, updateData }: any) {
  const [section, setSection] = useState<'contact' | 'theme' | 'seo'>('contact');

  return (
    <div className="space-y-12">
      <div className="flex gap-4">
        {['contact', 'theme', 'seo'].map((s: any) => (
          <button 
            key={s}
            onClick={() => setSection(s)}
            className={cn(
              "px-8 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest transition-all",
              section === s ? "bg-primary text-dark shadow-glow-orange" : "bg-white/5 text-white/40 hover:bg-white/10"
            )}
          >
            {s === 'contact' ? 'Contact & Socials' : s.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="glass p-12 rounded-[40px] border-white/5">
         {section === 'contact' && (
           <div className="space-y-10 group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-4">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1 block">Primary Contact</label>
                    <div className="space-y-4">
                       <input value={data.contact.email} onChange={(e) => updateData({ contact: { ...data.contact, email: e.target.value } })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 text-sm" placeholder="Email Address" />
                       <input value={data.contact.phone} onChange={(e) => updateData({ contact: { ...data.contact, phone: e.target.value } })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 text-sm" placeholder="Phone Number" />
                       <input value={data.contact.whatsapp} onChange={(e) => updateData({ contact: { ...data.contact, whatsapp: e.target.value } })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 text-sm" placeholder="WhatsApp Number" />
                       <input value={data.contact.location} onChange={(e) => updateData({ contact: { ...data.contact, location: e.target.value } })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary/50 text-sm border-secondary/20" placeholder="Location (e.g. Dhaka, Bangladesh)" />
                    </div>
                 </div>
                 <div className="space-y-4">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1 block">Social Media Links</label>
                    <div className="space-y-3">
                       {data.contact.socials.map((social: any, i: number) => (
                         <div key={i} className="flex gap-4 items-center p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                            <input value={social.platform} onChange={(e) => {
                               const newSocials = [...data.contact.socials];
                               newSocials[i].platform = e.target.value;
                               updateData({ contact: { ...data.contact, socials: newSocials } });
                            }} className="w-24 bg-transparent text-xs font-bold text-primary outline-none" />
                            <input value={social.url} onChange={(e) => {
                               const newSocials = [...data.contact.socials];
                               newSocials[i].url = e.target.value;
                               updateData({ contact: { ...data.contact, socials: newSocials } });
                            }} className="flex-grow bg-transparent text-xs text-white/40 outline-none font-mono" />
                            <button onClick={() => {
                               const newSocials = data.contact.socials.filter((_: any, idx: number) => idx !== i);
                               updateData({ contact: { ...data.contact, socials: newSocials } });
                            }}><Trash2 className="w-4 h-4 text-red-500/30 hover:text-red-500" /></button>
                         </div>
                       ))}
                       <button onClick={() => {
                          const newSocials = [...data.contact.socials, { platform: 'New', url: 'https://', icon: 'Link' }];
                          updateData({ contact: { ...data.contact, socials: newSocials } });
                       }} className="w-full py-3 rounded-2xl border border-dashed border-white/10 text-white/20 text-[10px] font-bold uppercase hover:bg-white/5 transition-all">+ Add Network</button>
                    </div>
                 </div>
              </div>
           </div>
         )}

         {section === 'theme' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                 <div className="space-y-4">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1 block text-primary">Branding Colors</label>
                    <div className="flex gap-6">
                       <div className="space-y-2">
                          <div className="w-16 h-16 rounded-2xl cursor-pointer overflow-hidden border border-white/10" style={{ backgroundColor: data.theme.primaryColor }}>
                             <input type="color" value={data.theme.primaryColor} onChange={(e) => updateData({ theme: { ...data.theme, primaryColor: e.target.value } })} className="opacity-0 w-full h-full cursor-pointer" />
                          </div>
                          <div className="text-[10px] text-center font-bold text-white/30 uppercase">Primary</div>
                       </div>
                       <div className="space-y-2">
                          <div className="w-16 h-16 rounded-2xl cursor-pointer overflow-hidden border border-white/10" style={{ backgroundColor: data.theme.secondaryColor }}>
                             <input type="color" value={data.theme.secondaryColor} onChange={(e) => updateData({ theme: { ...data.theme, secondaryColor: e.target.value } })} className="opacity-0 w-full h-full cursor-pointer" />
                          </div>
                          <div className="text-[10px] text-center font-bold text-white/30 uppercase">Secondary</div>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between">
                          <label className="text-[10px] font-bold text-white/30 uppercase">Glow Intensity</label>
                          <span className="text-[10px] text-primary">{Math.round(data.theme.glowIntensity * 100)}%</span>
                       </div>
                       <input type="range" min="0" max="2" step="0.1" value={data.theme.glowIntensity} onChange={(e) => updateData({ theme: { ...data.theme, glowIntensity: parseFloat(e.target.value) } })} className="w-full h-1 bg-white/10 accent-primary appearance-none rounded-full" />
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between">
                          <label className="text-[10px] font-bold text-white/30 uppercase">Glass Transparency</label>
                          <span className="text-[10px] text-white/60">{Math.round(data.theme.glassOpacity * 100)}%</span>
                       </div>
                       <input type="range" min="0.01" max="0.3" step="0.01" value={data.theme.glassOpacity} onChange={(e) => updateData({ theme: { ...data.theme, glassOpacity: parseFloat(e.target.value) } })} className="w-full h-1 bg-white/10 accent-white appearance-none rounded-full" />
                    </div>
                 </div>
              </div>
              <div className="glass p-8 rounded-3xl border-white/5 flex flex-col justify-center gap-6">
                 <div className="text-sm italic text-white/40">"Visual consistency is the language of professional storytellers. Use these controls to redefine your brand's atmosphere."</div>
                 <button className="w-full py-4 rounded-2xl bg-white text-dark font-black uppercase text-xs tracking-widest shadow-2xl">Apply Theme Engine</button>
              </div>
           </div>
         )}

         {section === 'seo' && (
           <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Meta Title Format</label>
                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 text-sm" placeholder="Title | Domain" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Focus Keywords</label>
                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 text-sm" placeholder="video export, cinema, dhaka..." />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Global Site Meta Description</label>
                 <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 text-sm h-32 resize-none" placeholder="Masterfully edited stories..." />
              </div>
              <div className="flex gap-4 pt-6">
                 <button className="flex-1 py-4 glass border-white/5 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:border-primary/20 transition-all"><Globe className="w-4 h-4 text-primary" /> Health Check</button>
                 <button className="flex-1 py-4 glass border-white/5 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:border-primary/20 transition-all"><BarChart3 className="w-4 h-4 text-secondary" /> Search Console</button>
              </div>
           </div>
         )}
      </div>
    </div>
  );
}

function TrendingUp(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
