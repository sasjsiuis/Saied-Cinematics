import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, Zap, Sparkles, Clock, LayoutGrid, Play, Cpu, Quote, HelpCircle, ArrowRight, MessageSquare } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';
import { cn } from '@/src/lib/utils';
import { ReactLenis } from 'lenis/react';

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useSiteData();
  const { services } = data;
  
  const service = services.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-display font-bold mb-4">Service Not Found</h1>
        <button onClick={() => navigate('/')} className="px-8 py-3 rounded-full orange-gradient text-dark font-bold">Back to Home</button>
      </div>
    );
  }

  const details = service.details || {
    heroImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1600',
    intro: service.description,
    workflow: [
      { step: 'Discussion', desc: 'Detailed meeting to understand your vision.' },
      { step: 'Development', desc: 'Crafting the narrative and technical setup.' },
      { step: 'Delivery', desc: 'Final export and quality assurance.' }
    ],
    tools: ['Adobe Creative Suite', 'Cinema 4D'],
    pricing: 'Custom Quote Available',
    faq: [{ q: 'How long does it take?', a: 'Depending on the project scope, usually 3-7 business days.' }]
  };

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      <div className="min-h-screen bg-dark text-white selection:bg-primary selection:text-dark">
        {/* Navigation */}
        <nav className="fixed top-8 left-8 z-[90]">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            onClick={() => navigate('/')}
            className="group flex items-center gap-3 px-6 py-3 rounded-full glass border-white/5 hover:border-primary/50 text-white/50 hover:text-white transition-all shadow-2xl"
          >
            <ArrowLeft className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span className="text-xs font-bold uppercase tracking-widest text-[10px]">Back to Services</span>
          </motion.button>
        </nav>

        {/* Hero Section */}
        <header className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <motion.div 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 opacity-40"
          >
            <img src={details.heroImage} alt={service.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
          </motion.div>

          <div className="container mx-auto px-6 relative z-10">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="max-w-4xl"
             >
                <div className="flex items-center gap-4 text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-6">
                   <Sparkles className="w-4 h-4" /> Premium Service Details
                </div>
                <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-8">{service.title}</h1>
                <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-2xl">{details.intro}</p>
             </motion.div>
          </div>
        </header>

        {/* Breakdown Section */}
        <div className="container mx-auto px-6 -mt-20 relative z-20">
           <div className="grid lg:grid-cols-12 gap-8">
              {/* Left Column: Details */}
              <div className="lg:col-span-8 space-y-8">
                 {/* Workflow */}
                 <div className="glass p-12 rounded-[48px] border-white/5">
                    <h3 className="text-2xl font-display font-bold mb-12 flex items-center gap-3">
                      <Zap className="w-6 h-6 text-primary" /> The Creative Workflow
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                       {details.workflow.map((item, i) => (
                         <div key={i} className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl blue-gradient text-dark flex items-center justify-center font-black text-xl">
                               {i + 1}
                            </div>
                            <h4 className="text-lg font-bold">{item.step}</h4>
                            <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Video Preview / Showcase */}
                 {details.videoPreview && (
                   <div className="glass p-4 rounded-[48px] border-white/5 bg-white/[0.01]">
                      <div className="aspect-video rounded-[36px] overflow-hidden relative group">
                         <iframe
                            title={service.title}
                            src={`https://www.youtube.com/embed/${details.videoPreview}?autoplay=1&mute=1&controls=1&loop=1&playlist=${details.videoPreview}`}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                      </div>
                   </div>
                 )}

                 {/* FAQ */}
                 <div className="glass p-12 rounded-[48px] border-white/5">
                    <h3 className="text-2xl font-display font-bold mb-12 flex items-center gap-3">
                      <HelpCircle className="w-6 h-6 text-secondary" /> Common Questions
                    </h3>
                    <div className="space-y-6">
                       {details.faq.map((item, i) => (
                         <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                            <h4 className="text-lg font-bold mb-3">{item.q}</h4>
                            <p className="text-white/40 text-sm">{item.a}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Right Column: Sidebar Meta */}
              <div className="lg:col-span-4 space-y-8">
                 {/* Hire Card */}
                 <div className="glass p-10 rounded-[48px] border-primary/20 bg-primary/5 shadow-glow-orange sticky top-8">
                    <div className="mb-8">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-2">Package Investment</span>
                       <div className="text-4xl font-display font-black">{details.pricing}</div>
                    </div>
                    
                    <div className="space-y-6 mb-10">
                       <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg glass border-white/10 flex items-center justify-center text-primary">
                             <Clock className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-white/70">Fast Delivery</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg glass border-white/10 flex items-center justify-center text-primary">
                             <Cpu className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-white/70">AI-Powered Optimization</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg glass border-white/10 flex items-center justify-center text-primary">
                             <LayoutGrid className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-white/70">Multiple Formats Included</span>
                       </div>
                    </div>

                    <div className="space-y-4">
                      <button className="w-full py-5 rounded-2xl orange-gradient text-dark font-bold uppercase tracking-widest text-sm shadow-glow-orange hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2">
                        Get Started <ArrowRight className="w-4 h-4" />
                      </button>
                      <button className="w-full py-4 rounded-xl glass border-white/10 hover:border-white/20 transition-all font-bold text-xs uppercase tracking-widest text-white/40">
                        Chat on WhatsApp
                      </button>
                    </div>

                    <div className="mt-12">
                      <h5 className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-4">Software I Use</h5>
                      <div className="flex flex-wrap gap-2">
                         {details.tools.map(tool => (
                           <span key={tool} className="px-3 py-1 rounded-lg bg-dark/40 border border-white/5 text-[9px] font-bold text-white/40 uppercase tracking-tighter">
                             {tool}
                           </span>
                         ))}
                      </div>
                    </div>
                 </div>

                 {/* Minimal Testimonial */}
                 <div className="glass p-8 rounded-[40px] border-white/5 italic text-white/40 text-sm relative group overflow-hidden">
                    <Quote className="absolute -top-4 -left-4 w-16 h-16 text-white/5 -scale-x-100" />
                    "The way Saied handles transitions and color tells a story even without words. Highly recommended for premium visuals."
                    <div className="mt-4 flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full blue-gradient" />
                       <div className="not-italic font-bold text-white/60 text-xs">- Lead Creative, TechHub</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Bottom CTA */}
        <section className="py-32">
           <div className="container mx-auto px-6">
              <div className="glass p-16 rounded-[60px] border-white/5 text-center relative overflow-hidden bg-white/[0.01]">
                 <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
                 <div className="relative z-10 space-y-8">
                    <h2 className="text-5xl lg:text-7xl font-display font-bold tracking-tighter">Let's build your vision.</h2>
                    <p className="text-xl text-white/40 max-w-2xl mx-auto">Every project starts with a conversation. Let's discuss your requirements and create something legendary.</p>
                    <div className="flex flex-wrap justify-center gap-6">
                       <button className="px-12 py-5 rounded-full blue-gradient text-dark font-bold uppercase tracking-widest text-xs shadow-glow-blue flex items-center gap-3">
                          Book a Consultation <MessageSquare className="w-5 h-5" />
                       </button>
                       <button onClick={() => navigate('/#contact')} className="px-12 py-5 rounded-full glass border-white/10 font-bold uppercase tracking-widest text-xs">
                          Manual Inquiry
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </ReactLenis>
  );
}
