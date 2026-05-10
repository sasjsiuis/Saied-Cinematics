/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ReactLenis } from 'lenis/react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import DesignShowcase from './components/DesignShowcase';
import Services from './components/Services';
import Packages from './components/Packages';
import About from './components/About';
import Contact from './components/Contact';
import Documentary from './components/Documentary';
import Testimonials from './components/Testimonials';
import Cursor from './components/Cursor';
import AdminPanel from './components/AdminPanel';
import StoryPage from './pages/StoryPage';
import ServiceDetailsPage from './pages/ServiceDetailsPage';

function PortfolioPage() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <main className="relative min-h-screen bg-dark text-white selection:bg-primary selection:text-dark">
        <Cursor />
        <Navbar />
        
        <div id="home">
          <Hero />
        </div>
        
        <div id="portfolio">
          <Portfolio />
        </div>

        <div id="designs">
          <DesignShowcase />
        </div>

        <div id="documentary">
          <Documentary />
        </div>

        <div id="services">
          <Services />
        </div>

        <div id="packages">
          <Packages />
        </div>

        <Testimonials />

        <div id="about">
          <About />
        </div>

        <div id="contact">
          <Contact />
        </div>

        <footer className="py-20 bg-black/80 backdrop-blur-xl border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="text-3xl font-display font-bold tracking-tighter">
                  SAIED <span className="text-primary">AL MAHDI</span>
                </div>
                <p className="text-white/40 text-sm max-w-xs text-center md:text-left">
                  Transforming vision into cinematic reality through expert video editing and storytelling.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest text-white/50">
                <a href="#portfolio" className="hover:text-primary transition-colors">Work</a>
                <a href="#services" className="hover:text-primary transition-colors">Services</a>
                <a href="#about" className="hover:text-primary transition-colors">About</a>
                <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-3 rounded-full orange-gradient text-dark font-bold shadow-glow-orange hover:translate-y-[-2px] transition-all"
                >
                  Hire Me
                </button>
              </div>
            </div>
            
            <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 relative">
              <div className="text-white/20 text-[10px] uppercase tracking-[0.2em]">
                &copy; 2024 Saied Al Mahdi. All rights reserved.
              </div>
              <div className="text-white/20 text-[10px] uppercase tracking-[0.2em] italic">
                Designed for cinematic excellence.
              </div>
              
              {/* Admin Trigger: Small White Dot */}
              <a 
                href="/control-room" 
                className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-1 h-1 bg-white opacity-40 rounded-full cursor-pointer hover:opacity-100 hover:scale-[4] transition-all z-50 animate-pulse" 
                title="Admin Control Room"
              />
            </div>
          </div>
        </footer>
      </main>
    </ReactLenis>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/control-room" element={<AdminPanel />} />
      <Route path="/story/:id" element={<StoryPage />} />
      <Route path="/service/:id" element={<ServiceDetailsPage />} />
    </Routes>
  );
}
