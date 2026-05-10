import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, Download, Tag, Palette, Share2, Eye, LayoutGrid } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSiteData } from '../context/SiteContext';

export default function DesignShowcase() {
  const { data, isEditMode, updateData } = useSiteData();
  const { designs = [] } = data;
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedDesign, setSelectedDesign] = useState<any | null>(null);

  const categories = ['All', 'Top', 'Selected', 'Featured', 'Latest', 'Posters', 'Thumbnails', 'Branding', 'Social Media', 'AI Art'];

  const filteredDesigns = (designs || []).filter(design => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Top') return design.isTop;
    if (activeFilter === 'Selected') return design.isSelected;
    if (activeFilter === 'Featured') return design.isFeatured;
    if (activeFilter === 'Latest') return design.isLatest;
    return design.category === activeFilter;
  });

  const handleUpdate = (updatedDesigns: any[]) => {
    updateData({ designs: updatedDesigns });
  };

  return (
    <section id="designs" className="py-24 bg-dark relative overflow-hidden">
      {/* Background Decorative Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 mb-6"
          >
            <Palette className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Creative Design Showcase</span>
          </motion.div>
          <h2 className="text-5xl lg:text-8xl font-display font-bold tracking-tighter mb-8">
            Visual <span className="text-glow-blue text-secondary italic">Excellence</span>
          </h2>
          
          {/* Filter System */}
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border",
                  activeFilter === cat
                    ? "orange-gradient text-dark border-transparent shadow-glow-orange"
                    : "glass border-white/5 text-white/40 hover:border-primary/30 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-style Grid */}
        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredDesigns.map((design, i) => (
              <motion.div
                layout
                key={design.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={cn(
                  "break-inside-avoid relative rounded-[32px] overflow-hidden group glass border-white/5 cursor-pointer",
                  isEditMode && "ring-2 ring-primary/20"
                )}
                onClick={() => setSelectedDesign(design)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={design.imageUrl}
                    alt={design.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute inset-0 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-500">
                      <div className="w-16 h-16 rounded-full glass border-primary/50 flex items-center justify-center text-primary group-hover:shadow-glow-orange">
                        <Maximize2 className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {design.isTop && <span className="px-3 py-1 bg-primary text-dark text-[8px] font-bold uppercase tracking-tighter rounded-full shadow-glow-orange">Top</span>}
                    {design.isFeatured && <span className="px-3 py-1 bg-secondary text-dark text-[8px] font-bold uppercase tracking-tighter rounded-full shadow-glow-blue">Featured</span>}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary italic">{design.category}</span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  <h3 className="text-xl font-display font-bold group-hover:text-primary transition-colors">{design.title}</h3>
                  
                  {isEditMode && (
                    <div className="mt-4 flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          const newD = designs.filter(d => d.id !== design.id);
                          handleUpdate(newD);
                        }}
                        className="px-4 py-2 rounded-lg bg-red-500/20 text-red-500 text-[10px] font-bold uppercase"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Preview */}
      <AnimatePresence>
        {selectedDesign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={() => setSelectedDesign(null)}
              className="absolute top-10 right-10 p-4 rounded-full glass border-white/10 text-white/40 hover:text-primary z-50"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <div className="container mx-auto grid lg:grid-cols-12 gap-12 items-center max-w-7xl">
              <motion.div 
                layoutId={selectedDesign.id}
                className="lg:col-span-8 rounded-[40px] overflow-hidden glass border-white/5 shadow-2xl relative"
              >
                <img
                  src={selectedDesign.imageUrl}
                  alt={selectedDesign.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-4 space-y-8"
              >
                <div>
                  <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
                    <LayoutGrid className="w-4 h-4" /> Design Details
                  </div>
                  <h3 className="text-4xl font-display font-bold mb-4">{selectedDesign.title}</h3>
                  <p className="text-lg text-white/50 leading-relaxed font-light">{selectedDesign.description}</p>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {selectedDesign.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 rounded-full glass border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/60">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="p-6 rounded-[32px] glass border-white/5 bg-white/[0.01] space-y-4">
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                      <span className="text-white/30 uppercase tracking-widest text-[10px] font-bold">Category</span>
                      <span className="text-primary font-bold">{selectedDesign.category}</span>
                    </div>
                    {selectedDesign.software && (
                      <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                        <span className="text-white/30 uppercase tracking-widest text-[10px] font-bold">Software</span>
                        <span className="text-white font-bold">{selectedDesign.software.join(', ')}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                      <span className="text-white/30 uppercase tracking-widest text-[10px] font-bold">Date</span>
                      <span className="text-white/60 font-bold">{selectedDesign.date || '2024'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 py-5 rounded-2xl orange-gradient text-dark font-bold uppercase tracking-[0.2em] shadow-glow-orange flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all">
                    <Download className="w-5 h-5" /> Download HD
                  </button>
                  <button className="p-5 rounded-2xl glass border-white/10 text-white/40 hover:text-primary transition-all">
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
