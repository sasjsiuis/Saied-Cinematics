import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star, Plus, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSiteData } from '../context/SiteContext';

export default function Testimonials() {
  const { data, isEditMode, updateData } = useSiteData();
  const { testimonials = [] } = data;

  const handleUpdate = (updatedTestimonials: any[]) => {
    updateData({ testimonials: updatedTestimonials });
  };

  return (
    <section className="py-24 bg-dark overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
           <h2 className="text-5xl lg:text-7xl font-display font-bold tracking-tighter">
             Client <span className="text-primary italic">Reviews</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {testimonials.map((test, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               className={cn(
                 "glass p-10 rounded-[40px] relative group border-white/5 bg-white/[0.01]",
                 isEditMode && "ring-1 ring-primary/20"
               )}
             >
                <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Quote className="w-16 h-16 text-primary" />
                </div>
                
                <div className="flex gap-1 mb-8">
                   {[...Array(test.rating)].map((_, idx) => (
                     <Star key={idx} className="w-4 h-4 fill-primary text-primary" />
                   ))}
                </div>

                <p className={cn(
                  "text-xl text-white/70 italic leading-relaxed mb-10 outline-none",
                  isEditMode && "bg-white/5 p-2 rounded"
                )}
                contentEditable={isEditMode}
                onBlur={(e) => {
                  const newTests = [...testimonials];
                  newTests[i].text = e.currentTarget.innerText;
                  handleUpdate(newTests);
                }}
                suppressContentEditableWarning
                >
                   "{test.text}"
                </p>

                <div className="flex items-center gap-4">
                   <img 
                    src={test.avatar} 
                    alt={test.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 cursor-pointer" 
                    onClick={() => {
                      if (isEditMode) {
                        const url = prompt("New Avatar URL:", test.avatar);
                        if (url) {
                          const newTests = [...testimonials];
                          newTests[i].avatar = url;
                          handleUpdate(newTests);
                        }
                      }
                    }}
                    referrerPolicy="no-referrer"
                   />
                   <div>
                      <div className={cn(
                        "text-lg font-bold outline-none",
                        isEditMode && "bg-white/5 p-1 rounded mb-1"
                      )}
                      contentEditable={isEditMode}
                      onBlur={(e) => {
                        const newTests = [...testimonials];
                        newTests[i].name = e.currentTarget.innerText;
                        handleUpdate(newTests);
                      }}
                      suppressContentEditableWarning
                      >{test.name}</div>
                      <div className={cn(
                        "text-xs text-white/40 uppercase tracking-widest outline-none",
                        isEditMode && "bg-white/5 p-0.5 rounded"
                      )}
                      contentEditable={isEditMode}
                      onBlur={(e) => {
                        const newTests = [...testimonials];
                        newTests[i].role = e.currentTarget.innerText;
                        handleUpdate(newTests);
                      }}
                      suppressContentEditableWarning
                      >{test.role}</div>
                   </div>
                </div>

                {isEditMode && (
                  <button 
                    onClick={() => {
                      const newTests = testimonials.filter((_, idx) => idx !== i);
                      handleUpdate(newTests);
                    }}
                    className="absolute top-4 left-4 p-2 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
             </motion.div>
           ))}

           {isEditMode && (
             <button 
               className="glass p-10 rounded-[40px] border-dashed border-primary/20 flex flex-col items-center justify-center gap-4 hover:bg-primary/5 transition-all text-primary/50 hover:text-primary group min-h-[300px]"
               onClick={() => {
                 const name = prompt("Client Name:");
                 if (name) {
                   handleUpdate([...testimonials, {
                     name,
                     role: 'Client',
                     text: 'Review text...',
                     rating: 5,
                     avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200'
                   }]);
                 }
               }}
             >
                <Plus className="w-12 h-12 transition-transform group-hover:scale-125" />
                <span className="text-sm font-bold uppercase tracking-widest">Add Review</span>
             </button>
           )}
        </div>
      </div>
    </section>
  );
}
