import React from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, Video, Camera, Mic, Sparkles, UserPlus } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSiteData } from '../context/SiteContext';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const { data, isEditMode, updateData } = useSiteData();
  const { hero } = data;
  const navigate = useNavigate();

  const handleTextChange = (key: keyof typeof hero, value: string) => {
    updateData({
      hero: { ...hero, [key]: value }
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-24 overflow-hidden">
      {/* Background Orbs */}
      <div className="orb orb-orange top-[-100px] -right-[50px] shadow-glow-orange animate-pulse" />
      <div className="orb orb-blue bottom-[-50px] -left-[50px] shadow-glow-blue animate-pulse delay-1000" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center flex-1 z-10">
        {/* Text Content */}
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={cn(
              "text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4 outline-none transition-all",
              isEditMode && "bg-white/5 border border-dashed border-primary/50 p-1 rounded"
            )}
            contentEditable={isEditMode}
            onBlur={(e) => handleTextChange('subtitle', e.currentTarget.innerText)}
            suppressContentEditableWarning
          >
            {hero.subtitle}
          </motion.h2>
          
          <h1 className={cn(
            "text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tighter outline-none",
            isEditMode && "bg-white/5 border border-dashed border-primary/50 p-2 rounded"
          )}
            contentEditable={isEditMode}
            onBlur={(e) => handleTextChange('title', e.currentTarget.innerText)}
            suppressContentEditableWarning
          >
            {hero.title.split(' ').map((word, i) => (
              <span key={i} className={cn(word === 'Editing' ? "text-primary italic animate-pulse" : "")}>
                {word}{' '}
                {word === 'Stories' && <br />}
              </span>
            ))}
            <span className={cn(
              "block text-3xl mt-4 font-normal opacity-90 font-sans tracking-normal text-white/80",
              isEditMode && "bg-white/5 p-1 rounded mt-2"
            )}
              contentEditable={isEditMode}
              onBlur={(e) => handleTextChange('bengaliName', e.currentTarget.innerText)}
              suppressContentEditableWarning
            >
              {hero.bengaliName}
            </span>
          </h1>
          
          <p className={cn(
            "text-xl text-white/70 mb-8 max-w-lg leading-relaxed outline-none",
            isEditMode && "bg-white/5 border border-dashed border-primary/50 p-2 rounded"
          )}
            contentEditable={isEditMode}
            onBlur={(e) => handleTextChange('intro', e.currentTarget.innerText)}
            suppressContentEditableWarning
          >
            {hero.intro}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button 
              onClick={() => isEditMode ? null : navigate('/story/showreel-story')}
              className="px-8 py-4 rounded-lg orange-gradient text-white font-bold uppercase text-sm shadow-glow-orange hover:translate-y-[-2px] transition-all flex items-center gap-2 group"
            >
              <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
              {hero.primaryBtnText}
            </button>
            <button 
              onClick={() => isEditMode ? null : scrollToSection('portfolio')}
              className="px-8 py-4 rounded-lg bg-transparent border border-white/20 text-white font-bold uppercase text-sm hover:bg-white/5 transition-all"
            >
              {hero.secondaryBtnText}
            </button>
            <button 
              onClick={() => isEditMode ? null : scrollToSection('contact')}
              className="px-8 py-4 rounded-lg bg-white/5 border border-primary/20 text-primary font-bold uppercase text-sm hover:bg-primary/10 transition-all flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Hire Me
            </button>
          </div>
        </motion.div>

        {/* Hero Image / Portrait Container */}
        <div className="relative flex justify-center items-center h-full">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[410px] h-[510px] rounded-[32px] bg-gradient-to-br from-primary via-transparent to-secondary opacity-30 blur-[10px]" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className={cn(
              "relative w-[400px] h-[500px] rounded-3xl overflow-hidden glass border-glass-border shadow-2xl z-10 transition-all",
              isEditMode && "ring-2 ring-primary cursor-pointer hover:scale-[1.02]"
            )}
            onClick={() => {
              if (isEditMode) {
                const url = prompt("Enter new Image URL:", hero.imageUrl);
                if (url) handleTextChange('imageUrl', url);
              }
            }}
          >
             <img 
              src={hero.imageUrl} 
              alt="Saied Al Mahdi" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>

      {/* Stats Section Overlay */}
      <div className="border-t border-glass-border py-8 mt-12 bg-black/20 backdrop-blur-sm z-10">
        <div className="container mx-auto px-6">
          <div className={cn(
            "grid gap-8",
            hero.stats.length === 1 && "grid-cols-1",
            hero.stats.length === 2 && "grid-cols-2",
            hero.stats.length === 3 && "grid-cols-3",
            hero.stats.length >= 4 && "grid-cols-2 md:grid-cols-4"
          )}>
            {hero.stats.map((stat, i) => (
              <div
                key={i}
                className={cn(
                  "text-center px-4",
                  i !== hero.stats.length - 1 && "md:border-r border-glass-border"
                )}
              >
                <div className={cn(
                  "text-3xl font-display font-black text-primary mb-1",
                  isEditMode && "bg-white/5 rounded cursor-pointer"
                )}
                onClick={() => {
                  if(isEditMode) {
                    const val = prompt("New value for " + stat.label, stat.value);
                    if(val) {
                      const newStats = [...hero.stats];
                      newStats[i].value = val;
                      handleTextChange('stats', newStats as any);
                    }
                  }
                }}
                >
                  {stat.value}
                </div>
                <div className={cn(
                  "text-[10px] text-white/50 uppercase tracking-widest font-bold font-display",
                  isEditMode && "bg-white/5 rounded cursor-pointer mt-1"
                )}
                onClick={() => {
                  if(isEditMode) {
                    const lbl = prompt("New label for stat", stat.label);
                    if(lbl) {
                      const newStats = [...hero.stats];
                      newStats[i].label = lbl;
                      handleTextChange('stats', newStats as any);
                    }
                  }
                }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
