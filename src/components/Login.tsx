import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface LoginProps {
  onLogin: (password: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple check for now
      onLogin(password);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="orb orb-orange top-[-100px] -right-[100px] opacity-20" />
      <div className="orb orb-blue bottom-[-100px] -left-[100px] opacity-20" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 border border-primary/20 mb-4 shadow-glow-orange">
             <Lock className="w-8 h-8 text-primary" />
           </div>
           <h1 className="text-4xl font-display font-bold tracking-tight">CONTROL <span className="text-primary italic">CENTER</span></h1>
           <p className="text-white/40 mt-2">Authorized entry only. Cinematic access required.</p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className={cn(
            "glass p-8 rounded-[40px] border-white/10 space-y-6 transition-all",
            error && "translate-x-2 border-red-500/50"
          )}
        >
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Access Cipher</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error && <p className="text-red-400 text-[10px] uppercase font-bold tracking-widest text-center mt-2">Access Denied: Invalid Cipher</p>}
          </div>

          <button
            type="submit"
            className="w-full py-5 rounded-2xl orange-gradient text-dark font-bold uppercase tracking-[0.2em] shadow-glow-orange flex items-center justify-center gap-3 hover:translate-y-[-2px] active:translate-y-[1px] transition-all"
          >
            Enter Control Room <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 flex justify-center gap-4 text-[10px] uppercase font-bold tracking-widest text-white/20">
          <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Secure JWT</span>
          <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Encrypted</span>
          <span className="flex items-center gap-1">v1.0.4 Premium</span>
        </div>
      </motion.div>
    </div>
  );
}
