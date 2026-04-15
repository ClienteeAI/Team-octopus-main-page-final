import React, { useState } from "react";
import { X, Loader2, CheckCircle2, User, Mail, Phone, Building2, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { isCorporateEmail, submitToWebhook } from "../../utils/api";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  context?: string; // e.g., "zefektivnit HR"
}

const GENERAL_LEAD_WEBHOOK = "https://n8n.srv1474318.hstgr.cloud/webhook-test/main-web-newsletter";

export default function ContactModal({ isOpen, onClose, context }: ContactModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    note: ""
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!isCorporateEmail(formData.email)) {
      setErrorMessage("Prosím použijte firemní e-mail. Soukromé domény nejsou povoleny.");
      return;
    }

    setStatus('loading');
    try {
      await submitToWebhook(GENERAL_LEAD_WEBHOOK, {
        ...formData,
        context: context || "general_inquiry"
      });
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setFormData({ firstName: "", lastName: "", email: "", phone: "", company: "", note: "" });
      }, 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage("Něco se nepovedlo. Zkuste to prosím později.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-octopus-navy/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden border border-octopus-navy/5"
          >
            {/* Header Overlay */}
            <div className="absolute top-0 left-0 w-full h-2 bg-octopus-gold" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-octopus-cream flex items-center justify-center text-octopus-navy/50 hover:text-octopus-navy hover:bg-octopus-gold transition-all z-10"
            >
              <X size={20} />
            </button>

            <div className="p-12 sm:p-16">
              {status === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-24 h-24 bg-octopus-green/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={48} className="text-octopus-green" />
                  </div>
                  <h3 className="text-4xl font-bold text-octopus-navy mb-4">Děkujeme!</h3>
                  <p className="text-octopus-navy/50 text-lg font-medium">Vaše poptávka byla úspěšně odeslána. <br/>Ozveme se vám co nejdříve.</p>
                </div>
              ) : (
                <>
                  <div className="mb-12">
                    <h2 className="text-4xl font-bold text-octopus-navy mb-4 tracking-tight">Mám zájem o MaxTeam HR</h2>
                    <p className="text-octopus-navy/50 font-medium">Vyplňte prosím krátký formulář a naši experti se s vámi spojí.</p>
                    {context && (
                      <div className="inline-block mt-4 px-4 py-1.5 rounded-full bg-octopus-gold/10 text-octopus-gold text-[10px] font-bold uppercase tracking-widest border border-octopus-gold/20">
                        Zájem o: {context}
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="relative">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-octopus-navy/20 w-5 h-5" />
                        <input 
                          name="firstName"
                          type="text" 
                          placeholder="Jméno" 
                          required
                          className="w-full bg-octopus-cream border border-transparent rounded-2xl pl-16 pr-6 py-5 text-octopus-navy placeholder-octopus-navy/30 font-medium focus:outline-none focus:border-octopus-gold/40 transition-all"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="relative">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-octopus-navy/20 w-5 h-5" />
                        <input 
                          name="lastName"
                          type="text" 
                          placeholder="Příjmení" 
                          required
                          className="w-full bg-octopus-cream border border-transparent rounded-2xl pl-16 pr-6 py-5 text-octopus-navy placeholder-octopus-navy/30 font-medium focus:outline-none focus:border-octopus-gold/40 transition-all"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-octopus-navy/20 w-5 h-5" />
                      <input 
                        name="email"
                        type="email" 
                        placeholder="Pracovní e-mail" 
                        required
                        className={`w-full bg-octopus-cream border ${errorMessage ? 'border-red-500/50' : 'border-transparent'} rounded-2xl pl-16 pr-6 py-5 text-octopus-navy placeholder-octopus-navy/30 font-medium focus:outline-none focus:border-octopus-gold/40 transition-all`}
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="relative">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-octopus-navy/20 w-5 h-5" />
                        <input 
                          name="phone"
                          type="tel" 
                          placeholder="Telefon" 
                          required
                          className="w-full bg-octopus-cream border border-transparent rounded-2xl pl-16 pr-6 py-5 text-octopus-navy placeholder-octopus-navy/30 font-medium focus:outline-none focus:border-octopus-gold/40 transition-all"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="relative">
                        <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 text-octopus-navy/20 w-5 h-5" />
                        <input 
                          name="company"
                          type="text" 
                          placeholder="Firma" 
                          required
                          className="w-full bg-octopus-cream border border-transparent rounded-2xl pl-16 pr-6 py-5 text-octopus-navy placeholder-octopus-navy/30 font-medium focus:outline-none focus:border-octopus-gold/40 transition-all"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <MessageSquare className="absolute left-6 top-6 text-octopus-navy/20 w-5 h-5" />
                      <textarea 
                        name="note"
                        placeholder="Vaše zpráva (volitelné)" 
                        rows={3}
                        className="w-full bg-octopus-cream border border-transparent rounded-2xl pl-16 pr-6 py-5 text-octopus-navy placeholder-octopus-navy/30 font-medium focus:outline-none focus:border-octopus-gold/40 transition-all resize-none"
                        value={formData.note}
                        onChange={handleChange}
                      />
                    </div>

                    {errorMessage && (
                      <p className="text-red-500 text-sm font-bold text-center mt-4">{errorMessage}</p>
                    )}

                    <button 
                      type="submit" 
                      disabled={status === 'loading'}
                      className="w-full bg-octopus-navy text-white rounded-2xl py-6 text-xs font-bold uppercase tracking-[0.3em] hover:bg-octopus-gold hover:text-octopus-navy transition-all shadow-xl flex items-center justify-center gap-4 disabled:opacity-50"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Odesílám...
                        </>
                      ) : (
                        "Odeslat poptávku"
                      )}
                    </button>

                    <p className="text-center text-octopus-navy/20 text-[10px] font-bold uppercase tracking-widest">
                      Odesláním souhlasíte se zpracováním osobních údajů.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
