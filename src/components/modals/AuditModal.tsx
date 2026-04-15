import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Zap, 
  Target, 
  ArrowRight,
  Loader2,
  Calendar,
  MousePointer2
} from "lucide-react";
import { 
  AUDIT_QUESTIONS, 
  calculateMaturityScore, 
  getClassification, 
  calculateSavings, 
  getRadarIndices 
} from '../../data/auditData';
import RadarChart from '../charts/RadarChart';
import FunnelChart from '../charts/FunnelChart';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PUBLIC_DOMAINS = [
  'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com',
  'email.cz', 'seznam.cz', 'centrum.cz', 'atlas.cz', 'volny.cz', 'post.cz'
];

export default function AuditModal({ isOpen, onClose }: AuditModalProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [error, setError] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [resultStep, setResultStep] = useState(1);

  const currentQuestion = AUDIT_QUESTIONS[step];

  const validateEmail = (email: string) => {
    const domain = email.split('@')[1];
    if (!domain) return false;
    return !PUBLIC_DOMAINS.includes(domain.toLowerCase());
  };

  const handleNext = async () => {
    const currentAnswer = answers[currentQuestion.id];
    
    if (!currentAnswer && currentQuestion.type !== 'text') {
      setError("Prosím, vyberte možnost nebo vyplňte pole.");
      return;
    }

    if (currentQuestion.type === 'email' && !validateEmail(currentAnswer)) {
      setError("Prosím, použijte firemní email (např. @vasedomena.cz).");
      return;
    }

    if (step < AUDIT_QUESTIONS.length - 1) {
      setStep(step + 1);
      setError("");
    } else {
      // Final submit
      setIsEvaluating(true);
      
      const score = calculateMaturityScore(answers);
      const savings = calculateSavings(answers[1]);
      
      // Send to webhook
      try {
        await fetch('https://n8n.srv1474318.hstgr.cloud/webhook-test/audit-main-page', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: answers[101],
            lastName: answers[102],
            email: answers[103],
            phone: answers[104] || 'N/A',
            score: score,
            savings: savings,
            answers: answers,
            timestamp: new Date().toISOString()
          })
        });
      } catch (e) {
        console.error("Webhook failed", e);
      }

      setTimeout(() => {
        setIsEvaluating(false);
        setShowResults(true);
      }, 3000);
    }
  };

  const score = calculateMaturityScore(answers);
  const classification = getClassification(score);
  const savings = calculateSavings(answers[1]);
  const radarData = getRadarIndices(answers);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-octopus-navy/40 backdrop-blur-xl" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }} 
        className="bg-octopus-cream w-full max-w-5xl max-h-[90vh] rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col border border-white/20"
      >
        <button onClick={onClose} className="absolute top-8 right-8 text-octopus-navy/40 hover:text-octopus-navy transition-colors z-50">
          <X size={24} />
        </button>

        {!showResults ? (
          <div className="flex-1 flex flex-col p-12 sm:p-20 overflow-y-auto">
            {isEvaluating ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 rounded-full border-4 border-octopus-gold/20 border-t-octopus-gold mb-10"
                />
                <h2 className="text-4xl font-bold text-octopus-navy mb-4 tracking-tight">Vyhodnocujeme váš audit...</h2>
                <p className="text-octopus-navy/50 font-medium">Algoritmus MaxTeam HR analyzuje vaše odpovědi.</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
                <div className="mb-12 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-octopus-gold text-octopus-navy px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest animate-pulse">
                        Zdarma AI Diagnostika
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-octopus-navy/30">
                        Audit Krok {step + 1} / {AUDIT_QUESTIONS.length}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-octopus-navy/60 italic">
                    "Neztrácejte čas manuálním náborem. Zjistěte, jak ušetřit 70 % času dříve, než vás konkurence předežene."
                  </p>
                  <div className="h-1 bg-octopus-navy/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${((step + 1) / AUDIT_QUESTIONS.length) * 100}%` }} 
                      className="h-full bg-octopus-gold" 
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <h3 className="text-4xl sm:text-5xl font-bold text-octopus-navy leading-[1.1] tracking-tighter">
                      {currentQuestion.text}
                    </h3>

                    <div className="grid gap-4">
                      {currentQuestion.type === 'select' ? (
                        currentQuestion.options?.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setAnswers({ ...answers, [currentQuestion.id]: opt });
                              setError("");
                            }}
                            className={`p-6 rounded-2xl text-left font-bold transition-all border ${
                              answers[currentQuestion.id] === opt 
                                ? 'bg-octopus-navy text-white border-octopus-navy shadow-xl translate-x-2' 
                                : 'bg-white text-octopus-navy/60 border-octopus-navy/5 hover:border-octopus-gold/30 hover:bg-octopus-gold/5'
                            }`}
                          >
                            {opt}
                          </button>
                        ))
                      ) : (
                        <div className="relative">
                          <input 
                            type={currentQuestion.type}
                            value={answers[currentQuestion.id] || ""}
                            onChange={(e) => {
                              setAnswers({ ...answers, [currentQuestion.id]: e.target.value });
                              setError("");
                            }}
                            autoFocus
                            placeholder={currentQuestion.type === 'email' ? "email@firma.cz" : "Vaše odpověď..."}
                            className="w-full bg-white border border-octopus-navy/10 rounded-2xl p-6 text-xl font-medium focus:ring-2 focus:ring-octopus-gold/20 focus:border-octopus-gold outline-none transition-all"
                            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                          />
                          {currentQuestion.id === 104 && (
                             <p className="mt-4 text-xs text-octopus-navy/40 font-medium tracking-wide flex items-center gap-2">
                               <ShieldCheck size={14} className="text-octopus-gold" />
                               Vaše údaje jsou u nás v bezpečí a slouží pouze pro potřeby auditu.
                             </p>
                          )}
                        </div>
                      )}
                    </div>

                    {error && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 font-bold text-sm">
                        {error}
                      </motion.p>
                    )}

                    <div className="pt-12 flex items-center justify-between">
                      <button 
                        onClick={() => step > 0 && setStep(step - 1)}
                        className={`flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] transition-opacity ${step === 0 ? 'opacity-0' : 'opacity-100'}`}
                      >
                        <ChevronLeft size={16} /> Zpět
                      </button>
                      <button 
                        onClick={handleNext}
                        className="bg-octopus-navy text-white px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-octopus-gold hover:text-octopus-navy transition-all shadow-xl flex items-center gap-4 group"
                      >
                        {step === AUDIT_QUESTIONS.length - 1 ? "Dokončit audit" : "Pokračovat"}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        ) : (
          /* RESULT DASHBOARD */
          <div className="flex-1 flex flex-col min-h-0 bg-white">
            <div className="p-8 border-b border-octopus-navy/5 flex items-center justify-between bg-octopus-cream/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-octopus-navy flex items-center justify-center text-white">
                   <TrendingUp size={20} />
                </div>
                <div>
                   <h2 className="font-bold text-octopus-navy leading-none mb-1">Výsledek HR Auditu</h2>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-octopus-navy/30">MaxTeam HR AI Diagnostics</p>
                </div>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button 
                    key={s} 
                    onClick={() => setResultStep(s)}
                    className={`h-1.5 w-12 rounded-full transition-all ${resultStep === s ? 'bg-octopus-gold' : 'bg-octopus-navy/5 hover:bg-octopus-navy/10'}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-12 sm:p-20">
               <AnimatePresence mode="wait">
                 {resultStep === 1 && (
                   <motion.div key="r1" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} className="flex flex-col items-center text-center max-w-2xl mx-auto">
                      <div className="relative mb-16">
                        <svg className="w-64 h-64 transform -rotate-90">
                           <circle cx="128" cy="128" r="110" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-octopus-navy/5" />
                           <motion.circle 
                             cx="128" cy="128" r="110" fill="transparent" stroke="#D4AF37" strokeWidth="12" strokeDasharray="691"
                             initial={{ strokeDashoffset: 691 }}
                             animate={{ strokeDashoffset: 691 - (691 * score) / 100 }}
                             transition={{ duration: 2, ease: "easeOut" }}
                             strokeLinecap="round"
                           />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-7xl font-bold text-octopus-navy tracking-tighter">{score}%</motion.span>
                           <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-octopus-navy/30">Maturita</span>
                        </div>
                      </div>
                      <h3 className="text-5xl font-bold text-octopus-navy mb-6 tracking-tight italic font-serif">"{classification.label}"</h3>
                      <p className="text-xl text-octopus-navy/50 font-medium leading-relaxed mb-12">{classification.desc}</p>
                      <div className="p-8 rounded-[40px] bg-octopus-gold/10 border border-octopus-gold/20 flex items-center gap-6 text-left">
                        <Zap className="text-octopus-gold flex-shrink-0" size={32} />
                        <p className="text-octopus-navy/70 font-bold leading-tight">Váš proces je převážně manuální. Přechodem na AI orchestraci můžete okamžitě eliminovat rutinu.</p>
                      </div>
                   </motion.div>
                 )}

                 {resultStep === 2 && (
                   <motion.div key="r2" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                      <div>
                        <h2 className="text-octopus-gold font-bold text-[10px] uppercase tracking-[0.5em] mb-8">Business Case</h2>
                        <h3 className="text-6xl font-bold text-octopus-navy tracking-tighter mb-10 leading-[0.9]">Analýza <br/>potenciálu.</h3>
                        <div className="space-y-8">
                          <div className="p-10 rounded-[40px] bg-octopus-navy text-white shadow-2xl relative overflow-hidden group">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-octopus-gold/10 blur-[60px] rounded-full" />
                             <div className="text-octopus-gold text-5xl font-bold mb-2 tracking-tighter tabular-nums">
                               {savings.toLocaleString()} Kč
                             </div>
                             <p className="text-white/50 font-bold uppercase tracking-[0.2em] text-[10px]">Předpokládaná měsíční úspora</p>
                          </div>
                          <p className="text-octopus-navy/50 text-lg font-medium leading-relaxed"> Tato částka představuje finanční benefit přechodu na AI orchestraci v náboru, měřeno uvolněným časem managementu a snížením nákladů na proces.</p>
                        </div>
                      </div>
                      <div className="relative">
                         <div className="aspect-square bg-octopus-cream rounded-[60px] flex items-center justify-center border border-octopus-navy/5 shadow-inner">
                            <DollarSign size={120} className="text-octopus-navy/5 animate-pulse" />
                            <div className="absolute inset-0 p-12 flex flex-col justify-between">
                               <div className="flex justify-between items-start">
                                  <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-octopus-navy"><TrendingUp size={24}/></div>
                                  <div className="text-right">
                                     <div className="text-2xl font-bold text-octopus-navy">70%</div>
                                     <div className="text-[10px] font-bold text-octopus-navy/30 uppercase tracking-widest">Efektivita</div>
                                  </div>
                               </div>
                               <div className="space-y-4">
                                  <div className="h-2 w-full bg-octopus-navy/10 rounded-full" />
                                  <div className="h-2 w-2/3 bg-octopus-gold rounded-full" />
                                  <div className="h-2 w-1/2 bg-octopus-navy/5 rounded-full" />
                               </div>
                            </div>
                         </div>
                      </div>
                   </motion.div>
                 )}

                 {resultStep === 3 && (
                   <motion.div key="r3" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} className="max-w-4xl mx-auto flex flex-col items-center">
                      <div className="text-center mb-16">
                        <h2 className="text-octopus-gold font-bold text-[10px] uppercase tracking-[0.5em] mb-8">Radar Diagnostika</h2>
                        <h3 className="text-6xl font-bold text-octopus-navy tracking-tighter">Rizika & Příležitosti</h3>
                      </div>
                      <div className="p-12 rounded-[60px] bg-white border border-octopus-navy/5 shadow-2xl">
                         <RadarChart data={radarData} size={400} />
                      </div>
                   </motion.div>
                 )}

                 {resultStep === 4 && (
                   <motion.div key="r4" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                      <div className="order-2 lg:order-1 flex justify-center">
                        <div className="p-12 rounded-[60px] bg-white border border-octopus-navy/5 shadow-2xl w-full">
                          <FunnelChart steps={[
                            { name: "Oslovení", value: 100 },
                            { name: "Zájemci", value: 80 },
                            { name: "Pohovory", value: 40 },
                            { name: "Nabídky", value: 15 },
                            { name: "Nástupy", value: 95 },
                          ]} size={300} />
                        </div>
                      </div>
                      <div className="order-1 lg:order-2">
                        <h2 className="text-octopus-gold font-bold text-[10px] uppercase tracking-[0.5em] mb-8">Průchodnost Pipeline</h2>
                        <h3 className="text-6xl font-bold text-octopus-navy tracking-tighter mb-10 leading-[0.9]">Procesní <br/>trychtýř.</h3>
                        <p className="text-octopus-navy/50 text-lg font-medium mb-10 leading-relaxed">Vaše skóre indikuje, že ztrácíte až 40 % potenciálních kandidátů díky manuálním chybám a pomalé komunikaci ve fázi od Zájemců k Pohovorům.</p>
                        <div className="flex gap-4">
                           <div className="w-1.5 h-1.5 rounded-full bg-octopus-gold animate-bounce" />
                           <div className="w-1.5 h-1.5 rounded-full bg-octopus-gold animate-bounce delay-75" />
                           <div className="w-1.5 h-1.5 rounded-full bg-octopus-gold animate-bounce delay-150" />
                        </div>
                      </div>
                   </motion.div>
                 )}

                 {resultStep === 5 && (
                   <motion.div key="r5" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} className="max-w-4xl mx-auto">
                      <div className="text-center mb-20">
                        <h2 className="text-octopus-gold font-bold text-[10px] uppercase tracking-[0.5em] mb-8">Strategická Roadmapa</h2>
                        <h3 className="text-6xl font-bold text-octopus-navy tracking-tighter">Cesta k optimalizaci</h3>
                      </div>
                      <div className="space-y-6">
                        {[
                          { day: "Den 1–30", title: "Konsolidace dat a AI Scoring", desc: "Sjednocení všech náborových kanálů a nasazení prvního levelu AI screeningu." },
                          { day: "Den 31–60", title: "Prediktivní Matching", desc: "Aktivace vaší databáze talentů (Talent Pool) a automatické oživení zapomenutých kontaktů." },
                          { day: "Den 61–90", title: "Plná AI Orchestrace", desc: "Nasazení autonomních agentů pro screening, plánování pohovorů a onboarding." }
                        ].map((step, i) => (
                          <div key={i} className="group p-10 rounded-[40px] bg-white border border-octopus-navy/5 hover:border-octopus-gold transition-colors flex items-center gap-12">
                             <div className="w-32 text-[10px] font-bold uppercase tracking-[0.3em] text-octopus-gold flex-shrink-0">{step.day}</div>
                             <div className="flex-1">
                                <h4 className="text-2xl font-bold text-octopus-navy mb-2 tracking-tight group-hover:text-octopus-gold transition-colors">{step.title}</h4>
                                <p className="text-octopus-navy/40 font-medium">{step.desc}</p>
                             </div>
                             <div className="w-12 h-12 bg-octopus-cream rounded-2xl flex items-center justify-center text-octopus-navy group-hover:bg-octopus-gold group-hover:text-white transition-all transform group-hover:rotate-12">
                                <CheckCircle2 size={24} />
                             </div>
                          </div>
                        ))}
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            <div className="p-12 border-t border-octopus-navy/5 bg-octopus-cream/30 flex flex-col sm:flex-row items-center justify-between gap-10">
               <div className="flex items-center gap-6">
                 <div className="w-16 h-16 rounded-[24px] bg-octopus-gold flex items-center justify-center text-octopus-navy shadow-xl">
                    <Target size={32} />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold text-octopus-navy tracking-tight">Chcete probrat výsledky osobně?</h4>
                    <p className="text-octopus-navy/40 font-medium">Naši konzultanti jsou připraveni vám pomoci s implementací.</p>
                 </div>
               </div>
               <div className="flex gap-4">
                 {resultStep < 5 ? (
                   <button 
                     onClick={() => setResultStep(resultStep + 1)}
                     className="bg-octopus-navy text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-4 hover:bg-octopus-gold hover:text-octopus-navy transition-all"
                   >
                     Další analýza
                     <ChevronRight size={16} />
                   </button>
                 ) : (
                   <button 
                     onClick={onClose}
                     className="bg-octopus-gold text-octopus-navy px-12 py-6 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all"
                   >
                     Mám hotovo
                   </button>
                 )}
               </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
