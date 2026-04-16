import React, { useState } from "react";
import { SendIcon, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { isCorporateEmail, submitToWebhook } from "../../utils/api";

const WEBHOOK_URL = "https://n8n.srv1474318.hstgr.cloud/webhook-test/main-web-newsletter";

export default function Newsletter() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!isCorporateEmail(formData.email)) {
      setErrorMessage("Prosím použijte firemní e-mail. Soukromé domény jako gmail.com nebo seznam.cz nejsou povoleny.");
      return;
    }

    setStatus('loading');
    try {
      await submitToWebhook(WEBHOOK_URL, formData);
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage("Něco se nepovedlo. Zkuste to prosím později.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-40 bg-octopus-navy relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <h2 className="text-octopus-gold font-bold text-xs uppercase tracking-[0.5em] mb-10">Získejte náskok</h2>
          <h3 className="text-6xl sm:text-7xl font-bold tracking-tighter text-white mb-10 leading-[0.9]">Neztraťte <br/>další talent.</h3>
          <p className="text-white/50 text-xl font-medium max-w-2xl mx-auto mb-20 leading-relaxed">
            Trh se hýbe rychle. Každý týden vám pošleme jeden tip, jak poznat špičkového kandidáta dříve než konkurence. Buďte o krok napřed.
          </p>
          
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 border border-octopus-gold/20 rounded-[40px] p-12 max-w-md mx-auto backdrop-blur-3xl"
              >
                <div className="w-20 h-20 bg-octopus-gold rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-octopus-gold/20">
                  <CheckCircle2 size={40} className="text-octopus-navy" />
                </div>
                <h4 className="text-3xl font-bold text-white mb-4">Děkujeme za odběr!</h4>
                <p className="text-white/40 font-medium leading-relaxed uppercase text-[10px] tracking-[0.3em]">Brzy se ozveme s prvními tipy.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input 
                    name="firstName"
                    type="text" 
                    placeholder="Jméno" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-white placeholder-white/30 text-lg font-medium focus:outline-none focus:border-octopus-gold/40 focus:bg-white/10 transition-all backdrop-blur-2xl"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                  />
                  <input 
                    name="lastName"
                    type="text" 
                    placeholder="Příjmení" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-white placeholder-white/30 text-lg font-medium focus:outline-none focus:border-octopus-gold/40 focus:bg-white/10 transition-all backdrop-blur-2xl"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                  />
                </div>
                <div className="relative group">
                  <input 
                    name="email"
                    type="email" 
                    placeholder="Váš pracovní e-mail" 
                    required
                    className={`w-full bg-white/5 border ${errorMessage ? 'border-red-500/50' : 'border-white/10'} rounded-full px-10 py-6 text-white placeholder-white/30 text-lg font-medium focus:outline-none focus:border-octopus-gold/40 focus:bg-white/10 transition-all backdrop-blur-2xl`}
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                  />
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="absolute right-3 top-3 bg-octopus-gold text-octopus-navy w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {status === 'loading' ? (
                      <Loader2 size={24} className="animate-spin" />
                    ) : (
                      <SendIcon size={24} />
                    )}
                  </button>
                </div>
                {errorMessage && (
                  <p className="text-red-400 text-sm font-medium mt-4">{errorMessage}</p>
                )}
              </form>
            )}
          </AnimatePresence>
          
          <p className="mt-10 text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
            Stvrtzením odběru si zajistíte tajnou zbraň pro svůj nábor.
          </p>

          {/* Company contact details */}
          <div className="mt-24 pt-16 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-white/30 text-xs font-bold uppercase tracking-[0.2em]">
            <span className="text-white/50 font-bold">TEAM OCTOPUS s.r.o.</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
            <span>Příčná 1892/4, Nové Město, 110 00 Praha 1</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
            <span>IČO: 237 99 838</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
            <a href="mailto:obchod@teamoctopus.cz" className="text-octopus-gold/70 hover:text-octopus-gold transition-colors">
              obchod@teamoctopus.cz
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
