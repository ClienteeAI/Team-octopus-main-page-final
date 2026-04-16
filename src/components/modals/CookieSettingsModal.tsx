import React, { useState, useEffect } from "react";
import { X, ShieldCheck, BarChart3, Target, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: { analytical: boolean; marketing: boolean }) => void;
  initialSettings?: { analytical: boolean; marketing: boolean };
}

export default function CookieSettingsModal({ isOpen, onClose, onSave, initialSettings }: CookieSettingsModalProps) {
  const [analytical, setAnalytical] = useState(initialSettings?.analytical || false);
  const [marketing, setMarketing] = useState(initialSettings?.marketing || false);

  useEffect(() => {
    if (isOpen && initialSettings) {
      setAnalytical(initialSettings.analytical);
      setMarketing(initialSettings.marketing);
    }
  }, [isOpen, initialSettings]);

  const handleSave = () => {
    onSave({ analytical, marketing });
    onClose();
  };

  const handleAcceptAll = () => {
    onSave({ analytical: true, marketing: true });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-octopus-navy/40 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl overflow-hidden border border-octopus-navy/5"
          >
            {/* Header */}
            <div className="p-10 border-b border-octopus-navy/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-octopus-gold/10 flex items-center justify-center text-octopus-gold">
                  <ShieldCheck size={24} />
                </div>
                <h2 className="text-2xl font-bold text-octopus-navy tracking-tight">Nastavení cookies</h2>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-octopus-cream flex items-center justify-center text-octopus-navy/50 hover:text-octopus-navy hover:bg-octopus-gold transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-10 space-y-8">
              {/* Necessary */}
              <div className="flex items-start gap-6 p-6 rounded-3xl bg-octopus-cream">
                <div className="w-10 h-10 shrink-0 bg-white rounded-xl flex items-center justify-center text-octopus-navy/40 border border-octopus-navy/5">
                  <Lock size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-octopus-navy">Nezbytné cookies</h4>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-octopus-navy/30 bg-octopus-navy/5 px-2 py-1 rounded">Vždy aktivní</span>
                  </div>
                  <p className="text-sm text-octopus-navy/50 leading-relaxed font-medium">Zajišťují základní funkčnost webu. Bez nich by stránka nemusela fungovat správně.</p>
                </div>
              </div>

              {/* Analytical */}
              <div className="flex items-start gap-6 p-6 rounded-3xl border border-octopus-navy/5 hover:bg-octopus-cream/50 transition-colors cursor-pointer group" onClick={() => setAnalytical(!analytical)}>
                <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-all ${analytical ? 'bg-octopus-gold text-white shadow-lg shadow-octopus-gold/20' : 'bg-octopus-cream text-octopus-navy/20'}`}>
                  <BarChart3 size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-octopus-navy">Analytické cookies</h4>
                    <div className={`w-12 h-6 rounded-full transition-all relative ${analytical ? 'bg-octopus-gold' : 'bg-octopus-navy/10'}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${analytical ? 'left-7 shadow-sm' : 'left-1'}`} />
                    </div>
                  </div>
                  <p className="text-sm text-octopus-navy/50 leading-relaxed font-medium">Pomáhají nám pochopit, jak návštěvníci používají web (např. Google Analytics), abychom ho mohli vylepšovat.</p>
                </div>
              </div>

              {/* Marketing */}
              <div className="flex items-start gap-6 p-6 rounded-3xl border border-octopus-navy/5 hover:bg-octopus-cream/50 transition-colors cursor-pointer group" onClick={() => setMarketing(!marketing)}>
                <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-all ${marketing ? 'bg-octopus-gold text-white shadow-lg shadow-octopus-gold/20' : 'bg-octopus-cream text-octopus-navy/20'}`}>
                  <Target size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-octopus-navy">Marketingové cookies</h4>
                    <div className={`w-12 h-6 rounded-full transition-all relative ${marketing ? 'bg-octopus-gold' : 'bg-octopus-navy/10'}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${marketing ? 'left-7 shadow-sm' : 'left-1'}`} />
                    </div>
                  </div>
                  <p className="text-sm text-octopus-navy/50 leading-relaxed font-medium">Slouží k personalizaci reklam a sledování efektivity marketingových kampaní.</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-octopus-navy/5 bg-octopus-cream/30 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleSave}
                className="flex-1 bg-white border border-octopus-navy/10 text-octopus-navy/60 px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-octopus-navy hover:text-white hover:border-octopus-navy transition-all"
              >
                Uložit nastavení
              </button>
              <button 
                onClick={handleAcceptAll}
                className="flex-1 bg-octopus-navy text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-octopus-gold hover:text-octopus-navy transition-all shadow-xl shadow-octopus-navy/10"
              >
                Přijmout vše
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
