import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Play } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSiteData } from '../context/SiteContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data, isEditMode, updateData } = useSiteData();
  const { navbar = { logoText: '', logoSpan: '', items: [] } } = data;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogoChange = (key: 'logoText' | 'logoSpan', value: string) => {
    updateData({
      navbar: { ...navbar, [key]: value }
    });
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500',
        isScrolled ? 'glass-nav py-4 shadow-2xl' : 'py-8'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, '#home')}
          className="flex items-center gap-2 group outline-none"
        >
          <div className={cn(
            "text-xl font-display font-extrabold tracking-tighter transition-all",
            isEditMode && "bg-white/5 border border-dashed border-primary/50 px-2 rounded"
          )}>
            <span 
              contentEditable={isEditMode}
              onBlur={(e) => handleLogoChange('logoText', e.currentTarget.innerText)}
              suppressContentEditableWarning
            >
              {navbar.logoText}
            </span>
            {' '}
            <span 
              className="text-primary"
              contentEditable={isEditMode}
              onBlur={(e) => handleLogoChange('logoSpan', e.currentTarget.innerText)}
              suppressContentEditableWarning
            >
              {navbar.logoSpan}
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex gap-8">
            {navbar.items.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-xs uppercase tracking-widest font-bold text-white/60 hover:text-primary transition-colors outline-none"
                contentEditable={isEditMode}
                suppressContentEditableWarning
              >
                {item.name}
              </a>
            ))}
          </div>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2.5 rounded-full border border-primary text-primary font-bold text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(255,122,26,0.2)] hover:bg-primary/5 transition-all outline-none"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-white hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-dark/95 backdrop-blur-2xl border-b border-glass-border p-6 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-6">
              {navbar.items.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-primary transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-4 rounded-xl orange-gradient text-white font-bold uppercase text-xs tracking-widest shadow-glow-orange outline-none"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
