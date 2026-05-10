import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Maximize2, ExternalLink, X, Edit3, Trash2, Plus } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSiteData } from '../context/SiteContext';

export default function Portfolio() {
  const { data, isEditMode, updateData } = useSiteData();
  const { portfolio = [] } = data;
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const categories = ['All', ...new Set((portfolio || []).map(p => p.category))];
  const filteredProjects = (portfolio || []).filter(p => activeCategory === 'All' || p.category === activeCategory);

  const handleUpdate = (updatedPortfolio: any[]) => {
    updateData({ portfolio: updatedPortfolio });
  };

  const handleEdit = (e: React.MouseEvent, i: number) => {
    e.stopPropagation();
    const project = portfolio[i];
    const title = prompt("New Title:", project.title);
    const category = prompt("New Category:", project.category);
    const youtubeUrl = prompt("New YouTube URL:", project.youtubeUrl);
    const thumbnail = prompt("New Thumbnail URL:", project.thumbnail);
    const description = prompt("New Description:", project.description);
    
    if (title || category || youtubeUrl || thumbnail || description) {
      const newP = [...portfolio];
      newP[i] = {
        ...project,
        title: title || project.title,
        category: category || project.category,
        youtubeUrl: youtubeUrl || project.youtubeUrl,
        thumbnail: thumbnail || project.thumbnail,
        description: description || project.description,
      };
      handleUpdate(newP);
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-dark relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-5xl font-display font-bold mb-4 tracking-tighter">
              Featured <span className="text-secondary italic">Portfolio</span>
            </h2>
            <p className="text-white/50 max-w-md">
              A selection of my best work in filmmaking, editing, and creative storytelling.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-6 py-2 rounded-full text-sm font-bold transition-all border',
                  activeCategory === cat 
                    ? 'orange-gradient text-dark border-transparent shadow-glow-orange' 
                    : 'bg-white/5 text-white/50 border-white/10 hover:border-primary/50'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                layout
                key={project.id || i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "group relative rounded-3xl overflow-hidden glass p-4 aspect-[4/5] cursor-pointer",
                  isEditMode && "ring-1 ring-primary/20"
                )}
                onClick={() => !isEditMode && setSelectedProject(project)}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-dark text-[10px] font-bold uppercase tracking-widest rounded-full shadow-glow-orange">
                    {project.category}
                  </div>

                  {/* Edit Controls Overlay */}
                  {isEditMode && (
                    <div className="absolute top-4 right-4 flex gap-2 z-20">
                      <button 
                        onClick={(e) => handleEdit(e, i)}
                        className="p-2 rounded-xl bg-primary/20 backdrop-blur-md text-primary hover:bg-primary hover:text-dark transition-all"
                      >
                         <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          const newP = portfolio.filter((_, idx) => idx !== i);
                          handleUpdate(newP);
                        }}
                        className="p-2 rounded-xl bg-red-500/20 backdrop-blur-md text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {!isEditMode && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                      <div className="w-16 h-16 rounded-full glass flex items-center justify-center border-primary/50 text-primary">
                        <Play className="w-8 h-8 fill-primary translate-x-1" />
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-xs text-secondary font-bold uppercase tracking-widest mb-1 text-glow-blue">
                      Project Showcase
                    </div>
                    <h3 className="text-2xl font-display font-bold leading-tight group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isEditMode && (
              <button 
                className="rounded-3xl border-dashed border-primary/20 border-2 flex flex-col items-center justify-center gap-4 hover:bg-primary/5 transition-all text-primary/50 hover:text-primary group aspect-[4/5] glass"
                onClick={() => {
                  const title = prompt("Project Title:");
                  if (title) {
                    handleUpdate([...portfolio, { 
                      id: Date.now().toString(), 
                      title, 
                      category: 'Cinematic', 
                      thumbnail: 'https://images.unsplash.com/photo-1492691523567-61707d2e5ef4?auto=format&fit=crop&q=80', 
                      youtubeUrl: '',
                      description: 'New Project Description'
                    }]);
                  }
                }}
              >
                <Plus className="w-12 h-12 transition-transform group-hover:scale-125" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Add Project</span>
              </button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-dark/95 backdrop-blur-2xl"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={() => setSelectedProject(null)}
              className="absolute top-10 right-10 p-4 rounded-full glass border-primary/20 text-primary z-50"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              layoutId={selectedProject.id}
              className="w-full max-w-6xl aspect-video rounded-[32px] overflow-hidden glass border-primary/10 relative"
            >
               <iframe
                title={selectedProject.title}
                src={`https://www.youtube.com/embed/${selectedProject.youtubeUrl.split('v=')[1] || selectedProject.youtubeUrl.split('/').pop()}?autoplay=1`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>

            <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between pointer-events-none">
              <div className="max-w-2xl pointer-events-auto">
                <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Play className="w-4 h-4 fill-primary" /> Project Showcase
                </h4>
                <h3 className="text-4xl font-display font-bold mb-4">{selectedProject.title}</h3>
                <p className="text-lg text-white/50 leading-relaxed">{selectedProject.description}</p>
              </div>
              <div className="flex gap-4 pointer-events-auto">
                <button className="px-8 py-4 rounded-full blue-gradient text-dark font-bold flex items-center gap-3">
                   View Details <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
