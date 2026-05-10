import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Check, Zap, Sparkles, TrendingUp, X, Send, Plus } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSiteData } from '../context/SiteContext';

const iconMap: Record<string, any> = {
  Package, TrendingUp, Sparkles, Zap
};

export default function Packages() {
  const { data, isEditMode, updateData, addMessage } = useSiteData();
  const { packages = [] } = data;
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [orderStep, setOrderStep] = useState<'details' | 'success'>('details');
  const [orderDetails, setOrderDetails] = useState({ length: 'Under 5 mins', deadline: 'Standard (3-5 days)', requirements: '' });

  const handleUpdate = (updatedPackages: any[]) => {
    updateData({ packages: updatedPackages });
  };

  const handleOrder = (plan: typeof packages[0]) => {
    if (isEditMode) return;
    setSelectedPlan(plan);
    setOrderStep('details');
  };

  const confirmOrder = () => {
    if (!selectedPlan) return;
    
    // Add message to context for admin notification
    addMessage({
      name: `Automatic Order: ${selectedPlan.name}`,
      email: 'customer@example.com', // In a real app, this would be from the form
      text: `New order for ${selectedPlan.name} package. Price: $${selectedPlan.price}. 
             Details: Length: ${orderDetails.length}, Deadline: ${orderDetails.deadline}. 
             Requirements: ${orderDetails.requirements}`
    });

    setOrderStep('success');
  };

  return (
    <section id="packages" className="py-24 bg-dark relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-7xl font-display font-bold mb-6 tracking-tighter">
            Choose Your <span className="text-glow-orange text-primary">Package</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Flexible pricing options tailored for different creative needs—from simple social edits to high-end documentary production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, i) => {
            const IconComponent = iconMap[pkg.icon] || Package;
            return (
              <motion.div
                key={pkg.id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  'glass rounded-[40px] p-10 relative overflow-hidden flex flex-col group transition-all duration-500',
                  pkg.featured ? 'border-primary/50 ring-1 ring-primary/20 scale-105 z-10 bg-primary/5 shadow-glow-orange' : 'border-white/5',
                  isEditMode && "ring-1 ring-primary/20"
                )}
              >
                {pkg.featured && (
                  <div className="absolute top-0 right-0 px-6 py-2 orange-gradient text-dark font-bold text-[10px] uppercase tracking-widest rounded-bl-3xl">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                   <div className={cn(
                     "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
                     pkg.featured ? 'orange-gradient' : 'bg-white/10'
                   )}>
                     <IconComponent className={cn("w-6 h-6", pkg.featured ? "text-dark" : "text-primary")} />
                   </div>
                   <h3 className={cn(
                     "text-2xl font-display font-bold mb-2 outline-none",
                     isEditMode && "bg-white/5 p-1 rounded"
                   )}
                   contentEditable={isEditMode}
                   onBlur={(e) => {
                     const newPkgs = [...packages];
                     newPkgs[i].name = e.currentTarget.innerText;
                     handleUpdate(newPkgs);
                   }}
                   suppressContentEditableWarning
                   >{pkg.name}</h3>
                   <div className="flex items-baseline gap-1">
                     <span className="text-[10px] font-bold text-white/40">$</span>
                     <span className={cn(
                       "text-4xl font-display font-bold leading-none outline-none",
                       isEditMode && "bg-white/5 p-1 rounded"
                     )}
                     contentEditable={isEditMode}
                     onBlur={(e) => {
                       const newPkgs = [...packages];
                       newPkgs[i].price = e.currentTarget.innerText;
                       handleUpdate(newPkgs);
                     }}
                     suppressContentEditableWarning
                     >{pkg.price}</span>
                     <span className="text-white/40 text-sm italic">/ project</span>
                   </div>
                </div>

                <div className="flex-grow flex flex-col gap-4 mb-10">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-white/70">
                      <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className={cn(
                        "outline-none",
                        isEditMode && "bg-white/5 px-1 rounded"
                      )}
                      contentEditable={isEditMode}
                      onBlur={(e) => {
                        const newPkgs = [...packages];
                        newPkgs[i].features[idx] = e.currentTarget.innerText;
                        handleUpdate(newPkgs);
                      }}
                      suppressContentEditableWarning
                      >{feature}</span>
                    </div>
                  ))}
                  {isEditMode && (
                    <button 
                      onClick={() => {
                        const newPkgs = [...packages];
                        newPkgs[i].features.push("New Feature");
                        handleUpdate(newPkgs);
                      }}
                      className="text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mt-2"
                    >
                      <Plus className="w-3 h-3" /> Add Feature
                    </button>
                  )}
                </div>

                <div className="mt-auto space-y-4">
                  <button 
                    onClick={() => handleOrder(pkg)}
                    className={cn(
                      "w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all",
                      pkg.featured ? 'orange-gradient text-dark' : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    )}
                  >
                    {isEditMode ? (pkg.featured ? "Unmark Popular" : "Mark Popular") : "Order Now"}
                  </button>
                  
                  {isEditMode && (
                    <button 
                      onClick={() => {
                        const newPkgs = [...packages];
                        newPkgs[i].featured = !newPkgs[i].featured;
                        handleUpdate(newPkgs);
                      }}
                      className={cn(
                        "w-full py-3 rounded-xl border font-bold uppercase tracking-widest text-[10px] transition-all",
                        pkg.featured ? "border-red-500/20 text-red-500" : "border-primary/20 text-primary"
                      )}
                    >
                      {pkg.featured ? "Unmark Popular" : "Mark Popular"}
                    </button>
                  )}
                  
                  {isEditMode && (
                    <button 
                      onClick={() => {
                        const newPkgs = packages.filter((_, idx) => idx !== i);
                        handleUpdate(newPkgs);
                      }}
                      className="w-full py-3 rounded-xl border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                    >
                      Delete Package
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}

          {isEditMode && (
             <button 
               className="glass rounded-[40px] p-10 border-dashed border-primary/20 flex flex-col items-center justify-center gap-4 hover:bg-primary/5 transition-all text-primary/50 hover:text-primary group min-h-[400px]"
               onClick={() => {
                 const name = prompt("Package Name:");
                 const price = prompt("Price:");
                 if (name && price) {
                   handleUpdate([...packages, { 
                     id: Date.now().toString(), 
                     name, 
                     price, 
                     features: ['Feature 1', 'Feature 2'], 
                     icon: 'Package', 
                     isPopular: false 
                   }]);
                 }
               }}
             >
                <Plus className="w-12 h-12 transition-transform group-hover:scale-125" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Add Package</span>
             </button>
          )}
        </div>
      </div>

      {/* Order Confirmation Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlan(null)}
              className="absolute inset-0 bg-dark/90 backdrop-blur-md" 
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass p-8 rounded-[40px] border-white/10"
            >
              <button 
                onClick={() => setSelectedPlan(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <X className="w-6 h-6 text-white/40" />
              </button>

              {orderStep === 'details' ? (
                <>
                  <div className="mb-8">
                    <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Confirming Order</div>
                    <h3 className="text-3xl font-display font-bold">{selectedPlan.name} Package</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">Project Length</label>
                        <select 
                          value={orderDetails.length}
                          onChange={(e) => setOrderDetails(prev => ({ ...prev, length: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors"
                        >
                          <option>Under 5 mins</option>
                          <option>5-15 mins</option>
                          <option>15-30 mins</option>
                          <option>Feature Length</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">Deadline</label>
                        <select 
                          value={orderDetails.deadline}
                          onChange={(e) => setOrderDetails(prev => ({ ...prev, deadline: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors"
                        >
                          <option>Standard (3-5 days)</option>
                          <option>Express (24 hours)</option>
                          <option>Flexible</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Resolution Requirements</label>
                      <div className="flex gap-4">
                        {['1080p', '4K', 'Vertical/Social'].map(res => (
                          <button key={res} className="flex-1 py-3 px-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-tighter hover:border-primary transition-colors">
                            {res}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Special Requirements</label>
                      <textarea 
                        value={orderDetails.requirements}
                        onChange={(e) => setOrderDetails(prev => ({ ...prev, requirements: e.target.value }))}
                        placeholder="Describe your vision..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 h-24 outline-none focus:border-primary/50 transition-colors resize-none text-sm"
                      />
                    </div>

                    <button 
                      onClick={confirmOrder}
                      className="w-full py-5 rounded-2xl orange-gradient text-dark font-bold uppercase tracking-[0.2em] shadow-glow-orange flex items-center justify-center gap-3"
                    >
                      Confirm Order <Send className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4">Request Sent!</h3>
                  <p className="text-white/50 mb-8 max-w-sm mx-auto">
                    I've received your {selectedPlan.name} order request. I'll review the details and get back to you via email/WhatsApp shortly.
                  </p>
                  <button 
                    onClick={() => setSelectedPlan(null)}
                    className="px-10 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-all font-bold uppercase tracking-widest text-xs"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
