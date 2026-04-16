import React from "react";
import { X, Shield, FileText, Handshake } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "privacy" | "terms" | "dpa";
}

export default function PolicyModal({ isOpen, onClose, type }: PolicyModalProps) {
  const content = {
    privacy: {
      title: "Zásady ochrany osobních údajů",
      subtitle: "TEAM OCTOPUS",
      icon: Shield,
      body: (
        <div className="space-y-8 text-octopus-navy/70 leading-relaxed font-medium">
          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">1. Správce osobních údajů</h3>
            <p>Správcem osobních údajů je:</p>
            <div className="mt-4 p-6 bg-octopus-cream rounded-2xl border border-octopus-navy/5">
              <p className="font-bold text-octopus-navy">TEAM OCTOPUS s.r.o.</p>
              <p>se sídlem: Příčná 1892/4, Nové Město, 110 00 Praha 1</p>
              <p>IČO: 237 99 838</p>
              <p>e-mail: obchod@teamoctopus.cz</p>
              <p className="text-xs mt-2 opacity-50">(dále jen „Správce“)</p>
            </div>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">2. Jaké údaje zpracováváme</h3>
            <p>Zpracováváme zejména tyto osobní údaje:</p>
            <div className="mt-4 space-y-4">
              <div className="p-6 border border-octopus-navy/5 rounded-2xl">
                <p className="font-bold text-octopus-navy mb-2">a) Údaje o zákaznících (firmách)</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>jméno a příjmení</li>
                  <li>e-mail</li>
                  <li>telefon</li>
                  <li>údaje o společnosti</li>
                </ul>
              </div>
              <div className="p-6 border border-octopus-navy/5 rounded-2xl">
                <p className="font-bold text-octopus-navy mb-2">b) Údaje o kandidátech</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>identifikační údaje (jméno, příjmení)</li>
                  <li>kontaktní údaje</li>
                  <li>profesní údaje (CV, zkušenosti)</li>
                  <li>odpovědi z pohovorů</li>
                </ul>
                <p className="mt-4 text-octopus-gold font-bold text-sm">👉 Tyto údaje zpracováváme výhradně jménem našich klientů.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">3. Postavení při zpracování údajů</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-octopus-blue mt-2.5 shrink-0" />
                <p><span className="font-bold text-octopus-navy">Vztah ke klientům (firmám):</span> Vůči zákazníkům vystupujeme jako správce osobních údajů.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-octopus-blue mt-2.5 shrink-0" />
                <p><span className="font-bold text-octopus-navy">Vztah ke kandidátům:</span> Vůči kandidátům vystupujeme jako zpracovatel osobních údajů, a to jménem našich klientů.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">4. Účely zpracování</h3>
            <p>Osobní údaje zpracováváme za účelem:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>poskytování služby</li>
              <li>správy uživatelských účtů</li>
              <li>komunikace se zákazníky</li>
              <li>zlepšování služby</li>
              <li>plnění právních povinností</li>
            </ul>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">5. Právní základ zpracování</h3>
            <p>Zpracování osobních údajů probíhá na základě:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>plnění smlouvy</li>
              <li>oprávněného zájmu</li>
              <li>souhlasu (např. marketing)</li>
            </ul>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">6. Předávání osobních údajů</h3>
            <p>Osobní údaje mohou být zpřístupněny třetím stranám, které se podílejí na poskytování služby, zejména:</p>
            <div className="mt-4 space-y-3">
              {[
                { name: "RTM Labs", desc: "technické zajištění služby a zpracování HR dat (např. CV, pohovory), (sub-zpracovatel)" },
                { name: "Clientee", desc: "správa kontaktních a obchodních údajů (neobsahuje kompletní HR dokumentaci)" },
                { name: "Stripe", desc: "zpracování plateb" },
                { name: "Google Analytics", desc: "analýza návštěvnosti webu" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 border border-octopus-navy/5 rounded-xl">
                  <div className="font-bold text-octopus-navy min-w-[120px]">{item.name}</div>
                  <div className="text-sm">{item.desc}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm italic opacity-60">👉 Každý z těchto subjektů zpracovává pouze údaje nezbytné pro daný účel. Aktuální seznam zpracovatelů může být průběžně aktualizován.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">7. Předávání mimo EU</h3>
            <p>V případě, že dochází k přenosu osobních údajů mimo Evropskou unii, je zajištěna odpovídající ochrana údajů, zejména prostřednictvím standardních smluvních doložek (SCC) nebo jiných odpovídajících mechanismů.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">8. Doba uchování</h3>
            <p>Osobní údaje uchováváme po dobu trvání smluvního vztahu, po dobu nezbytnou pro plnění právních povinností, případně dle pokynů klienta.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">9. Práva subjektů údajů</h3>
            <p>Subjekt údajů má právo na přístup, opravu, výmaz, omezení zpracování, přenositelnost údajů, vznést námitku nebo podat stížnost u Úřadu pro ochranu osobních údajů.</p>
            <div className="mt-4 p-6 bg-octopus-gold/5 border border-octopus-gold/20 rounded-2xl">
              <p className="text-octopus-gold font-bold mb-2 uppercase tracking-wider text-xs">Důležité upozornění:</p>
              <p className="text-sm">V případech, kdy vystupujeme jako zpracovatel (zejména u údajů o kandidátech), uplatňujte svá práva přímo u příslušného správce, kterému jste své údaje poskytli (typicky zaměstnavatel). Jako zpracovatel jsme oprávněni tyto žádosti předat správci.</p>
            </div>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">10. Zabezpečení osobních údajů</h3>
            <p>Používáme vhodná technická a organizační opatření, zejména omezení přístupu k údajům, řízení přístupových oprávnění a zabezpečení systémů.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">11. Cookies</h3>
            <p>Webové stránky používají cookies za účelem zajištění funkčnosti, analýzy návštěvnosti a marketingu.</p>
            <p className="mt-2 text-sm italic opacity-60">👉 Cookies, které nejsou nezbytné, jsou ukládány pouze na základě souhlasu uživatele prostřednictvím cookie lišty.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">12. Kontakt</h3>
            <p>V případě dotazů nás kontaktujte na: <span className="text-octopus-navy font-bold">obchod@teamoctopus.cz</span></p>
          </section>
        </div>
      )
    },
    terms: {
      title: "Obchodní podmínky",
      subtitle: "služby TEAM OCTOPUS s.r.o.",
      icon: FileText,
      body: (
        <div className="space-y-8 text-octopus-navy/70 leading-relaxed font-medium">
          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">1. Úvodní ustanovení</h3>
            <p>Tyto obchodní podmínky upravují práva a povinnosti mezi TEAM OCTOPUS s.r.o. (Poskytovatel) a zákazníkem (Uživatel).</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">2. Předmět služby</h3>
            <p>Poskytovatel poskytuje online nástroj zaměřený na podporu náboru, správu kandidátů, automatizaci komunikace a využití umělé inteligence (AI). Služba je poskytována formou SaaS.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">3. Uzavření smlouvy</h3>
            <p>Smlouva vzniká odesláním objednávky, jejím potvrzením nebo zaplacením služby. Uživatel potvrzuje, že se seznámil s těmito Podmínkami.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">4. Cena a platební podmínky</h3>
            <p>Cena je uvedena na webu. Platba probíhá online přes Stripe. Služba je aktivována po připsání platby.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">5. Charakter služby a AI</h3>
            <div className="p-6 bg-octopus-gold/5 border border-octopus-gold/20 rounded-2xl space-y-2">
              <p className="text-octopus-gold font-bold text-sm">👉 Výstupy AI mají pouze doporučující charakter.</p>
              <p className="text-octopus-gold font-bold text-sm">👉 Poskytovatel nenese odpovědnost za rozhodnutí Uživatele.</p>
              <p className="text-sm">Uživatel bere na vědomí, že AI může vykazovat nepřesnosti.</p>
            </div>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">6. Odpovědnost za nábor</h3>
            <p>Uživatel odpovídá za výběr zaměstnanců a dodržování právních předpisů. Poskytovatel nezasahuje do rozhodování.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">12. Ukončení služby a odstoupení</h3>
            <p>Uživatel může službu kdykoliv ukončit. Ukončení nabývá účinnosti ke konci aktuálního fakturačního období. Služba je určena primárně pro podnikatele.</p>
          </section>
          
          <p className="text-sm italic opacity-60">V případě dotazů nás kontaktujte na: obchod@teamoctopus.cz</p>
        </div>
      )
    },
    dpa: {
      title: "Smlouva o zpracování (DPA)",
      subtitle: "PŘÍLOHA Č. 1",
      icon: Handshake,
      body: (
        <div className="space-y-8 text-octopus-navy/70 leading-relaxed font-medium text-sm">
          <p className="italic text-octopus-navy/50">uzavřená dle čl. 28 nařízení Evropský parlament a Rady (EU) 2016/679 (GDPR)</p>
          
          <section>
            <h3 className="text-octopus-navy font-bold text-lg mb-3 underline">1. Smluvní strany</h3>
            <p><span className="font-bold">Správce:</span> Uživatel služby Team Octopus (zákazník)</p>
            <p><span className="font-bold">Zpracovatel:</span> TEAM OCTOPUS s.r.o.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-lg mb-3 underline">2. Předmět zpracování</h3>
            <p>Zpracovatel zpracovává údaje za účelem podpory náboru, správy kandidátů a využití AI nástrojů.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-lg mb-3 underline">8. Sub-zpracovatelé</h3>
            <div className="space-y-4">
              <div className="p-4 bg-octopus-cream rounded-xl">
                <p className="font-bold text-octopus-navy mb-1">RTM Labs (RTM Labs s.r.o.)</p>
                <p>Zajišťuje technický provoz a zpracování HR dat.</p>
              </div>
              <div className="p-4 bg-octopus-cream rounded-xl">
                <p className="font-bold text-octopus-navy mb-1">Clientee</p>
                <p>Zpracovává pouze kontaktní a obchodní údaje.</p>
              </div>
            </div>
            <p className="mt-4 text-octopus-gold font-bold">🔔 Změna sub-zpracovatelů: Zpracovatel informuje Správce (např. e-mailem). Správce může vznést námitku do 10 dnů.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-lg mb-3 underline">13. Ukončení zpracování</h3>
            <p>Po ukončení služby budou údaje smazány do 30 dnů, pokud zákon nevyžaduje delší uchování.</p>
          </section>

          <div className="border-t border-octopus-navy/10 pt-6">
            <p className="font-bold text-octopus-navy">Důležité: Tato smlouva tvoří nedílnou součást obchodních podmínek a je účinná okamžikem jejich odsouhlasení.</p>
          </div>
        </div>
      )
    }
  };

  const current = content[type];
  const Icon = current.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 md:p-10">
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
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[40px] shadow-2xl flex flex-col overflow-hidden border border-octopus-navy/5"
          >
            {/* Header */}
            <div className="p-8 sm:p-12 border-b border-octopus-navy/5 shrink-0 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-octopus-gold/10 flex items-center justify-center text-octopus-gold">
                  <Icon size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-octopus-gold mb-1">{current.subtitle}</p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-octopus-navy tracking-tight">{current.title}</h2>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-octopus-cream flex items-center justify-center text-octopus-navy/50 hover:text-octopus-navy hover:bg-octopus-gold transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-8 sm:p-12 custom-scrollbar selection:bg-octopus-gold/30">
              {current.body}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-octopus-navy/5 bg-octopus-cream/30 shrink-0 text-center">
              <button 
                onClick={onClose}
                className="bg-octopus-navy text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-octopus-gold hover:text-octopus-navy transition-all"
              >
                Rozumím a zavřít
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
