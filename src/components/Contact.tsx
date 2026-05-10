import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Phone, Mail, Instagram, Youtube, Facebook, Linkedin, Edit3 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSiteData } from '../context/SiteContext';

export default function Contact() {
  const { data, isEditMode, updateData, addMessage } = useSiteData();
  const { contact } = data;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditMode) return;
    
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // Simulate sending
    setTimeout(() => {
      addMessage({ name, email, text: message });
      setIsSubmitting(false);
      setIsSent(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  const handleUpdate = (key: keyof typeof contact, value: any) => {
    updateData({ contact: { ...contact, [key]: value } });
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return Facebook;
      case 'instagram': return Instagram;
      case 'youtube': return Youtube;
      case 'linkedin': return Linkedin;
      default: return Edit3;
    }
  };

  const getSocialColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return 'text-[#1877F2]';
      case 'instagram': return 'text-[#E4405F]';
      case 'youtube': return 'text-[#FF0000]';
      case 'linkedin': return 'text-[#0A66C2]';
      default: return 'text-primary';
    }
  };

  return (
    <section id="contact" className="py-24 bg-dark relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-6xl font-display font-bold leading-none mb-8 tracking-tighter italic">
              Let’s Create <br />
              Something <span className="text-secondary italic">Cinematic</span> <br />
              <span className="text-primary italic">Together</span>
            </h2>
            <p className="text-lg text-white/50 mb-12 max-w-md">
              Whether you have a documentary idea, a YouTube channel to grow, or a corporate story to tell—I’m here to help.
            </p>

            <div className="space-y-8 mb-16">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center border-white/5 transition-colors group-hover:border-primary/50 shadow-glow-orange">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Email Me</div>
                  <div className={cn(
                    "text-xl font-bold outline-none",
                    isEditMode && "bg-white/5 px-2 rounded border border-dashed border-primary/20"
                  )}
                  contentEditable={isEditMode}
                  onBlur={(e) => handleUpdate('email', e.currentTarget.innerText)}
                  suppressContentEditableWarning
                  >
                    {contact.email}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center border-white/5 transition-colors group-hover:border-secondary/50 shadow-glow-blue">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                   <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">WhatsApp / Call</div>
                   <div className={cn(
                     "text-xl font-bold outline-none",
                     isEditMode && "bg-white/5 px-2 rounded border border-dashed border-primary/20"
                   )}
                   contentEditable={isEditMode}
                   onBlur={(e) => handleUpdate('phone', e.currentTarget.innerText)}
                   suppressContentEditableWarning
                   >
                     {contact.phone}
                    </div>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center border-white/5 transition-colors group-hover:border-white/20">
                  <MapPin className="w-6 h-6 text-white/60" />
                </div>
                <div>
                   <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Location</div>
                   <div className={cn(
                     "text-xl font-bold outline-none",
                     isEditMode && "bg-white/5 px-2 rounded border border-dashed border-primary/20"
                   )}
                   contentEditable={isEditMode}
                   onBlur={(e) => handleUpdate('location', e.currentTarget.innerText)}
                   suppressContentEditableWarning
                   >
                     {contact.location}
                    </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
               {contact.socials.map((social: any, i: number) => {
                 const Icon = getSocialIcon(social.platform);
                 return (
                   <a 
                     key={i} 
                     href={social.url} 
                     target="_blank"
                     rel="noreferrer"
                     className="w-12 h-12 rounded-xl glass flex items-center justify-center border-white/5 hover:border-primary/50 text-white/50 hover:text-primary transition-all hover:translate-y-[-5px]"
                   >
                     <Icon className={cn("w-5 h-5", getSocialColor(social.platform))} />
                   </a>
                 );
               })}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass p-10 rounded-[48px] border-white/5 relative bg-white/[0.02]"
          >
            <div className="absolute top-0 right-0 p-8">
               <Send className="w-10 h-10 text-primary opacity-20" />
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
               <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4 subpixel-antialiased">Full Name</label>
                    <input name="name" required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4 subpixel-antialiased">Email Address</label>
                    <input name="email" required type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-secondary/50 transition-colors" placeholder="john@example.com" />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Project Type</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 appearance-none bg-dark text-white/50">
                     <option>Documentary Editing</option>
                     <option>YouTube Optimization</option>
                     <option>Corporate Video</option>
                     <option>AI Generation</option>
                  </select>
               </div>

               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Message</label>
                  <textarea name="message" required rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-secondary/50 transition-colors resize-none" placeholder="Tell me about your vision..." />
               </div>

               <button 
                 disabled={isSubmitting || isSent}
                 className={cn(
                   "w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all",
                   isSent ? "bg-green-500 text-white" : "orange-gradient text-dark shadow-glow-orange hover:shadow-primary/50 active:scale-95"
                 )}
               >
                  {isSubmitting ? "Sending..." : isSent ? "Message Sent!" : "Send Message"}
               </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
