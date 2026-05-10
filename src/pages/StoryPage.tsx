import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowLeft, Calendar, User, Tag, Share2, MessageSquare, Play, Quote, ChevronDown, Clock } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';
import { cn } from '@/src/lib/utils';
import { ReactLenis } from 'lenis/react';

export default function StoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useSiteData();
  const { stories, documentary } = data;
  
  const story = stories.find(s => s.id === id || s.docId === id);
  const docItem = documentary.items.find(d => d.id === (story?.docId || id));

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!story && !docItem) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-display font-bold mb-4">Story Not Found</h1>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-3 rounded-full orange-gradient text-dark font-bold"
        >
          Back to Portfolio
        </button>
      </div>
    );
  }

  // Fallback if story content isn't fully defined yet
  const displayTitle = story?.title || docItem?.title;
  const displaySubtitle = story?.subtitle || "A cinematic journey by Saied Al Mahdi";
  const displayHero = story?.heroImage || docItem?.thumbnail;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-dark">
        {/* Progress Bar */}
        <motion.div
           className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
           style={{ scaleX }}
        />

        {/* Floating Back Navigation */}
        <nav className="fixed top-8 left-8 z-[90]">
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            onClick={() => navigate('/')}
            className="group flex items-center gap-3 px-6 py-3 rounded-full glass border-white/5 hover:border-primary/50 text-white/50 hover:text-white transition-all shadow-2xl"
          >
            <ArrowLeft className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Portfolio</span>
          </motion.button>
        </nav>

        {/* Hero Section */}
        <header className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <img 
              src={displayHero} 
              alt={displayTitle} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          </motion.div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border-primary/20 mb-8 blur-in">
                <Tag className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Cinematic Storytelling</span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter mb-8 leading-[0.9]">
                {displayTitle}
              </h1>
              <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto italic">
                "{displaySubtitle}"
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Scroll to Read</span>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ChevronDown className="w-6 h-6 text-primary" />
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* Content Section */}
        <article className="py-32 relative">
          {/* Subtle background ambient motion */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
          
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-24">
              {/* Meta Info */}
              <div className="flex flex-wrap gap-8 py-8 border-y border-white/5 items-center justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full glass border-white/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-[8px] font-bold uppercase tracking-widest text-white/40">Directed By</div>
                    <div className="text-xs font-bold font-display">Saied Al Mahdi</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full glass border-white/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <div className="text-[8px] font-bold uppercase tracking-widest text-white/40">Release Date</div>
                    <div className="text-xs font-bold font-display">May 2024</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full glass border-white/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-[8px] font-bold uppercase tracking-widest text-white/40">Read Time</div>
                    <div className="text-xs font-bold font-display">8 mins</div>
                  </div>
                </div>
              </div>

              {/* Dynamic Content Sections */}
              {story ? (
                story.sections.map((section, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="relative"
                  >
                    {section.type === 'text' && (
                      <div className="prose prose-invert max-w-none">
                        <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/80">
                          {section.content}
                        </p>
                      </div>
                    )}

                    {section.type === 'quote' && (
                      <div className="relative py-12">
                        <Quote className="absolute -top-6 -left-12 w-24 h-24 text-primary/10 -scale-x-100" />
                        <blockquote className="text-4xl md:text-5xl font-display font-bold italic text-primary leading-tight">
                          "{section.content}"
                        </blockquote>
                        <div className="mt-8 flex items-center gap-4">
                          <div className="h-px w-12 bg-primary" />
                          <span className="text-xs uppercase tracking-widest font-bold">Project Vision</span>
                        </div>
                      </div>
                    )}

                    {section.type === 'image' && (
                      <div className="relative group rounded-[40px] overflow-hidden glass p-3 transform transition-transform duration-700 hover:scale-[1.01]">
                        <img 
                          src={section.content} 
                          className="w-full h-auto rounded-[30px]" 
                          alt="Story Visual" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-10 left-10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="px-5 py-2 glass rounded-full text-[10px] uppercase font-bold tracking-widest">Atmospheric Visual</span>
                        </div>
                      </div>
                    )}

                    {section.type === 'bts' && (
                      <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                          <h4 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] flex items-center gap-3">
                             <div className="w-8 h-px bg-secondary" /> {section.title || "Behind The Scenes"}
                          </h4>
                          <p className="text-lg text-white/50 leading-relaxed">
                            {section.content}
                          </p>
                        </div>
                        <div className="aspect-square glass rounded-[40px] flex items-center justify-center bg-white/[0.01]">
                          <MessageSquare className="w-12 h-12 text-primary opacity-20" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="space-y-12">
                  <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/80">
                    {docItem?.description}
                  </p>
                  <div className="aspect-video glass rounded-[40px] flex items-center justify-center overflow-hidden relative group">
                    <img src={docItem?.thumbnail} className="w-full h-full object-cover opacity-40 blur-sm" alt="Thumbnail" />
                    <button className="absolute w-20 h-20 rounded-full orange-gradient flex items-center justify-center text-dark shadow-glow-orange group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 fill-dark translate-x-1" />
                    </button>
                  </div>
                </div>
              )}

              {/* Credits & Footer Meta */}
              <div className="pt-32 border-t border-white/5">
                <div className="grid md:grid-cols-2 gap-20">
                  <div className="space-y-8">
                    <h5 className="text-xs font-bold uppercase tracking-[0.4em] text-white/20">Production Credits</h5>
                    <div className="space-y-4">
                      {(story?.credits || [{role: 'Director', name: 'Saied Al Mahdi'}, {role: 'Lead Editor', name: 'Al Mahdi Films'}]).map((credit, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-xs font-light text-white/40">{credit.role}</span>
                          <span className="text-xs font-bold uppercase tracking-widest">{credit.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between">
                    <div className="space-y-6">
                       <h5 className="text-xs font-bold uppercase tracking-[0.4em] text-white/20">Discussion</h5>
                       <p className="text-white/40 text-sm italic">"A visual narrative that explores the boundaries of cinema and technology."</p>
                    </div>
                    <div className="flex gap-4 mt-12">
                      <button className="px-8 py-4 rounded-full blue-gradient text-dark font-bold uppercase text-[10px] tracking-[0.2em] shadow-glow-blue flex-1">
                        Share This Story
                      </button>
                      <button className="p-4 rounded-full glass border-white/10 text-white/40 hover:text-primary transition-all">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Footer */}
        <footer className="py-32 bg-black border-t border-white/5 flex flex-col items-center gap-12">
           <div className="text-center space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary mb-4">Journey Continues</div>
              <h4 className="text-4xl md:text-6xl font-display font-bold">Ready to tell your story?</h4>
           </div>
           <button 
             onClick={() => navigate('/')}
             className="group flex items-center gap-4 px-12 py-5 rounded-full glass border-primary/20 hover:border-primary transition-all shadow-glow-orange"
           >
              <span className="text-xs font-bold uppercase tracking-widest">Connect with Saied</span>
              <ArrowLeft className="w-5 h-5 rotate-180 text-primary" />
           </button>
        </footer>
      </div>
    </ReactLenis>
  );
}
