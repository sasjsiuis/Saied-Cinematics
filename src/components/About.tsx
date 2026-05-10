import React from 'react';
import { motion } from 'motion/react';
import { Download, History, Award, Briefcase, Plus, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSiteData } from '../context/SiteContext';

export default function About() {
  const { data, isEditMode, updateData } = useSiteData();
  const { about } = data;

  const handleUpdate = (key: keyof typeof about, value: any) => {
    updateData({ about: { ...about, [key]: value } });
  };

  return (
    <section id="about" className="py-24 bg-dark relative overflow-hidden">
      <div className="absolute top-[30%] -right-[10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20">
        {/* Left Aspect - Experience Info */}
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           className="relative"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border-secondary/20">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">The Creator</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-display font-bold mb-8 tracking-tighter">
            Who Is <span className="text-glow-orange text-primary">Saied Al Mahdi?</span>
          </h2>
          <div 
            className={cn(
              "space-y-6 text-lg text-white/50 leading-relaxed max-w-xl outline-none transition-all",
              isEditMode && "bg-white/5 border border-dashed border-primary/50 p-4 rounded"
            )}
            contentEditable={isEditMode}
            onBlur={(e) => handleUpdate('bio', e.currentTarget.innerText)}
            suppressContentEditableWarning
          >
            {about.bio}
          </div>

          <div className="mt-12 flex flex-wrap gap-10">
             <div className="flex flex-col gap-2">
                <span className="text-5xl font-display font-bold text-white">05+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Years Experience</span>
             </div>
             <div className="flex flex-col gap-2">
                <span className="text-5xl font-display font-bold text-white">200+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-secondary">Projects Built</span>
             </div>
          </div>

          <a 
            href={about.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 px-10 py-5 rounded-full blue-gradient text-dark font-bold flex items-center gap-3 shadow-glow-blue hover:scale-105 active:scale-95 transition-all w-fit"
            onClick={(e) => {
              if (isEditMode) {
                e.preventDefault();
                const url = prompt("Enter CV Link:", about.cvUrl);
                if (url) handleUpdate('cvUrl', url);
              }
            }}
          >
             <Download className="w-5 h-5" /> {isEditMode ? "Edit CV Link" : "Download CV"}
          </a>
        </motion.div>

        {/* Right Aspect - Timeline */}
        <div className="relative">
          <div className="absolute left-0 top-0 w-1 h-full bg-white/5" />
          <div className="space-y-12 pl-10">
            {about.experience.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative group lg:w-4/5"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[45px] top-2 w-3 h-3 rounded-full bg-dark border-2 border-primary ring-4 ring-primary/20 group-hover:scale-150 transition-transform" />
                
                <span className="text-xs font-bold text-primary mb-2 block tracking-widest uppercase">{item.year}</span>
                <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">{item.role}</h3>
                <p className="text-white/40 leading-relaxed">{item.company}</p>
              </motion.div>
            ))}
            
            {isEditMode && (
              <button 
                className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest p-4 rounded-xl border border-dashed border-primary/20 w-4/5 justify-center mt-6 hover:bg-primary/5 transition-all"
                onClick={() => {
                  const year = prompt("Enter Year:");
                  const role = prompt("Enter Role:");
                  const company = prompt("Enter Company/Desc:");
                  if (year && role && company) {
                    handleUpdate('experience', [...about.experience, { year, role, company }]);
                  }
                }}
              >
                <Plus className="w-4 h-4" /> Add Timeline Event
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
