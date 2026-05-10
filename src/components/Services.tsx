import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Video, Youtube, Tv, Zap, MonitorPlay, Sparkles, Film, Palette, Instagram, Clapperboard, Plus, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSiteData } from '../context/SiteContext';

const iconMap: Record<string, any> = {
  Video, Youtube, Tv, Zap, MonitorPlay, Sparkles, Film, Palette, Instagram, Clapperboard
};

export default function Services() {
  const { data, isEditMode, updateData } = useSiteData();
  const { services = [] } = data;

  const handleUpdate = (updatedServices: any[]) => {
    updateData({ services: updatedServices });
  };

  return (
    <section id="services" className="py-24 bg-dark/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-display font-bold mb-6 tracking-tighter"
          >
            Creative <span className="text-primary italic animate-pulse">Services</span>
          </motion.h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            I provide a comprehensive suite of creative solutions tailored for brands, creators, and documentary filmmakers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const IconComponent = iconMap[service.icon] || Video;
            return (
              <motion.div
                key={service.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className={cn(
                  "glass p-8 rounded-[32px] group relative overflow-hidden transition-all duration-500 hover:border-primary/30",
                  isEditMode && "ring-1 ring-primary/20"
                )}
              >
                {/* Background Glow */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div className="p-4 rounded-2xl bg-white/5 w-fit mb-6 group-hover:blue-gradient group-hover:text-dark transition-all duration-500">
                  <IconComponent className="w-8 h-8" />
                </div>

                <h3 className={cn(
                  "text-xl font-display font-bold mb-4 group-hover:text-primary transition-colors outline-none",
                  isEditMode && "bg-white/5 p-1 rounded"
                )}
                contentEditable={isEditMode}
                onBlur={(e) => {
                  const newServices = [...services];
                  newServices[i].title = e.currentTarget.innerText;
                  handleUpdate(newServices);
                }}
                suppressContentEditableWarning
                >
                  {service.title}
                </h3>
                <p className={cn(
                  "text-sm text-white/40 leading-relaxed group-hover:text-white/70 transition-colors outline-none",
                  isEditMode && "bg-white/5 p-1 rounded mt-2"
                )}
                contentEditable={isEditMode}
                onBlur={(e) => {
                  const newServices = [...services];
                  newServices[i].description = e.currentTarget.innerText;
                  handleUpdate(newServices);
                }}
                suppressContentEditableWarning
                >
                  {service.description}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <Link 
                    to={`/service/${service.id}`}
                    className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2 hover:gap-4 transition-all"
                  >
                     Details <Zap className="w-3 h-3 text-glow-orange" />
                  </Link>
                  {isEditMode && (
                    <button 
                      onClick={() => {
                        const newServices = services.filter((_, idx) => idx !== i);
                        handleUpdate(newServices);
                      }}
                      className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}

          {isEditMode && (
            <button 
              className="glass p-8 rounded-[32px] border-dashed border-primary/20 flex flex-col items-center justify-center gap-4 hover:bg-primary/5 transition-all text-primary/50 hover:text-primary group"
              onClick={() => {
                const title = prompt("Service Title:");
                if (title) {
                  handleUpdate([...services, { id: Date.now().toString(), title, description: "Description here...", icon: 'Video' }]);
                }
              }}
            >
               <Plus className="w-10 h-10 transition-transform group-hover:scale-125" />
               <span className="text-[10px] font-bold uppercase tracking-widest">New Service</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
