import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, Settings, X, ShieldCheck } from "lucide-react";
import CookieSettingsModal from "../modals/CookieSettingsModal";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [consent, setConsent] = useState<{ analytical: boolean; marketing: boolean } | null>(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem("octopus_cookie_consent");
    if (!savedConsent) {
      // Show banner after a short delay for premium feel
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setConsent(JSON.parse(savedConsent));
    }
  }, []);

  const saveConsent = (newConsent: { analytical: boolean; marketing: boolean }) => {
    localStorage.setItem("octopus_cookie_consent", JSON.stringify(newConsent));
    setConsent(newConsent);
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ analytical: true, marketing: true });
  };

  const handleDeclineOptional = () => {
    saveConsent({ analytical: false, marketing: false });
  };

  // Listen for custom event to open settings from footer
  useEffect(() => {
    const handleOpenSettings = () => {
      setIsSettingsOpen(true);
    };
    window.addEventListener("open-cookie-settings", handleOpenSettings);
    return () => window.removeEventListener("open-cookie-settings", handleOpenSettings);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-6 right-6 z-[90] flex justify-center pointer-events-none"
          >
            <div className="w-full max-w-5xl bg-white/80 backdrop-blur-2xl border border-octopus-navy/5 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.3)] rounded-[32px] p-8 md:p-10 pointer-events-auto relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-octopus-gold/5 blur-3xl -mr-16 -mt-16 rounded-full" />
              
              <div className="flex flex-col lg:flex-row items-center gap-10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-octopus-navy flex items-center justify-center text-octopus-gold shadow-lg shadow-octopus-navy/20 shrink-0">
                    <Cookie size={32} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-octopus-navy mb-2 tracking-tight">Soukromí a cookies</h4>
                    <p className="text-sm text-octopus-navy/60 leading-relaxed font-medium max-w-2xl">
                      Používáme cookies pro zajištění správné funkčnosti webu, analýzu návštěvnosti a marketing. 
                      Můžete si zvolit, které cookies povolíte. Podrobnosti naleznete v <span className="text-octopus-navy font-bold underline cursor-pointer hover:text-octopus-gold transition-colors" onClick={() => window.dispatchEvent(new CustomEvent('open-policy', { detail: 'privacy' }))}>Zásadách ochrany osobních údajů</span>.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 shrink-0 w-full lg:w-auto">
                  <button 
                    onClick={() => setIsSettingsOpen(true)}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-octopus-cream text-octopus-navy/50 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-octopus-gold hover:text-octopus-navy transition-all"
                  >
                    <Settings size={14} />
                    Nastavení
                  </button>
                  <button 
                    onClick={handleDeclineOptional}
                    className="flex-1 lg:flex-none px-6 py-4 rounded-2xl border border-octopus-navy/5 text-octopus-navy/40 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-octopus-navy hover:text-white transition-all"
                  >
                    Odmítnout nepovinné
                  </button>
                  <button 
                    onClick={handleAcceptAll}
                    className="flex-1 lg:flex-none px-8 py-4 rounded-2xl bg-octopus-navy text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-octopus-gold hover:text-octopus-navy transition-all shadow-xl shadow-octopus-navy/10"
                  >
                    Přijmout vše
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CookieSettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={saveConsent}
        initialSettings={consent || { analytical: false, marketing: false }}
      />
    </>
  );
}
