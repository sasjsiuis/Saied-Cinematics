import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Play, Calendar, Tag, Plus, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSiteData } from '../context/SiteContext';

export default function Documentary() {
  const { data, isEditMode, updateData } = useSiteData();
  const { documentary = { title: '', description: '', items: [] } } = data;

  const handleUpdate = (updatedDoc: any) => {
    updateData({ documentary: updatedDoc });
  };

  return (
    <section id="documentary" className="py-24 bg-dark relative overflow-hidden">
      {/* Decorative vertical line */}
      <div className="absolute left-[5%] top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="mb-20 pl-12 lg:pl-0 lg:text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-6xl lg:text-8xl font-display font-bold mb-6 tracking-tighter outline-none"
            contentEditable={isEditMode}
            onBlur={(e) => handleUpdate({ ...documentary, title: e.currentTarget.innerText })}
            suppressContentEditableWarning
          >
            {documentary.title}
          </motion.h2>
          <p className={cn(
             "text-white/40 max-w-2xl lg:mx-auto outline-none transition-all",
             isEditMode && "bg-white/5 p-4 rounded mt-4"
          )}
          contentEditable={isEditMode}
          onBlur={(e) => handleUpdate({ ...documentary, description: e.currentTarget.innerText })}
          suppressContentEditableWarning
          >
             {documentary.description}
          </p>
        </div>

        <div className="space-y-32">
          {documentary.items.map((doc, i) => (
            <motion.div
              key={doc.id || i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="group grid lg:grid-cols-2 gap-16 items-center"
            >
              <div className={cn(i % 2 === 0 ? "order-1" : "order-1 lg:order-2", "relative")}>
                  <div className={cn(
                    "relative aspect-video rounded-[40px] overflow-hidden glass p-3",
                    isEditMode && "ring-1 ring-primary/20"
                  )}>
                     <div className="relative w-full h-full rounded-[30px] overflow-hidden">
                        <img 
                          src={doc.thumbnail} 
                          alt={doc.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/10 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <motion.button
                             whileHover={{ scale: 1.1 }}
                             className="w-20 h-20 rounded-full blue-gradient flex items-center justify-center shadow-glow-blue"
                             onClick={() => {
                               if (isEditMode) {
                                 const thumb = prompt("New Thumbnail URL:", doc.thumbnail);
                                 if (thumb) {
                                   const newItems = [...documentary.items];
                                   newItems[i].thumbnail = thumb;
                                   handleUpdate({ ...documentary, items: newItems });
                                 }
                               }
                             }}
                           >
                             <Play className="w-8 h-8 text-dark fill-dark translate-x-1" />
                           </motion.button>
                        </div>
                     </div>
                  </div>
                  {isEditMode && (
                    <button 
                      onClick={() => {
                         const newItems = documentary.items.filter((_, idx) => idx !== i);
                         handleUpdate({ ...documentary, items: newItems });
                      }}
                      className="absolute -top-4 -right-4 p-3 rounded-full bg-red-500 text-white shadow-lg z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
              </div>

              <div className={i % 2 === 0 ? "order-2" : "order-2 lg:order-1"}>
                 <div className="space-y-6">
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                       <Tag className="w-4 h-4" /> 
                       <span
                         contentEditable={isEditMode}
                         onBlur={(e) => {
                           const newItems = [...documentary.items];
                           newItems[i].topic = e.currentTarget.innerText;
                           handleUpdate({ ...documentary, items: newItems });
                         }}
                         suppressContentEditableWarning
                       >{doc.topic}</span>
                    </div>
                    <h3 className={cn(
                      "text-4xl lg:text-5xl font-display font-bold leading-tight group-hover:text-glow-orange group-hover:text-primary transition-all outline-none",
                      isEditMode && "bg-white/5 p-1 rounded"
                    )}
                    contentEditable={isEditMode}
                    onBlur={(e) => {
                      const newItems = [...documentary.items];
                      newItems[i].title = e.currentTarget.innerText;
                      handleUpdate({ ...documentary, items: newItems });
                    }}
                    suppressContentEditableWarning
                    >
                       {doc.title}
                    </h3>
                    <p className={cn(
                      "text-xl text-white/50 leading-relaxed max-w-xl outline-none",
                      isEditMode && "bg-white/5 p-2 rounded"
                    )}
                    contentEditable={isEditMode}
                    onBlur={(e) => {
                      const newItems = [...documentary.items];
                      newItems[i].description = e.currentTarget.innerText;
                      handleUpdate({ ...documentary, items: newItems });
                    }}
                    suppressContentEditableWarning
                    >
                       {doc.description}
                    </p>
                    <div className="pt-6">
                       {!isEditMode ? (
                         <Link 
                           to={`/story/${doc.id}`}
                           className="px-8 py-4 rounded-full border border-white/10 hover:border-primary/50 text-white font-bold transition-all flex items-center gap-2 group/btn w-fit"
                         >
                           Read The Story <div className="w-8 h-[1px] bg-white group-hover:w-12 group-hover:bg-primary transition-all" />
                         </Link>
                       ) : (
                         <button 
                          className="px-8 py-4 rounded-full border border-white/10 hover:border-primary/50 text-white font-bold transition-all flex items-center gap-2 group/btn"
                          onClick={() => {
                            const url = prompt("Enter Video URL:", doc.videoUrl);
                            if (url) {
                              const newItems = [...documentary.items];
                              newItems[i].videoUrl = url;
                              handleUpdate({ ...documentary, items: newItems });
                            }
                          }}
                         >
                           Edit Video URL <div className="w-8 h-[1px] bg-white group-hover:w-12 group-hover:bg-primary transition-all" />
                         </button>
                       )}
                    </div>
                 </div>
              </div>
            </motion.div>
          ))}

          {isEditMode && (
            <button 
              className="w-full py-12 rounded-[40px] border-dashed border-primary/20 border-2 flex flex-col items-center justify-center gap-4 hover:bg-primary/5 transition-all text-primary/50 hover:text-primary group glass"
              onClick={() => {
                const title = prompt("Doc Title:");
                if (title) {
                  const newItem = {
                    id: Date.now().toString(),
                    title,
                    description: "Description here...",
                    topic: "Category",
                    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
                    videoUrl: ''
                  };
                  handleUpdate({ ...documentary, items: [...documentary.items, newItem] });
                }
              }}
            >
               <Plus className="w-12 h-12 transition-transform group-hover:scale-125 shadow-glow-orange" />
               <span className="text-sm font-bold uppercase tracking-widest">Add Documentary Story</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
