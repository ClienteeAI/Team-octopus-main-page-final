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
      icon: Shie      body: (
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
            <div className="space-y-6">
              <div>
                <p className="font-bold text-octopus-navy mb-2">🔹 Vztah ke klientům (firmám)</p>
                <p>Vůči zákazníkům vystupujeme jako správce osobních údajů</p>
              </div>
              <div>
                <p className="font-bold text-octopus-navy mb-2">🔹 Vztah ke kandidátům</p>
                <p>Vůči kandidátům vystupujeme jako zpracovatel osobních údajů, a to jménem našich klientů.</p>
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
            <p className="mt-6 text-sm italic opacity-60">👉 Každý z těchto subjektů zpracovává pouze údaje nezbytné pro daný účel.</p>
            <p className="text-sm italic opacity-60">👉 Aktuální seznam zpracovatelů může být průběžně aktualizován.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">7. Předávání mimo EU</h3>
            <p>V případě, že dochází k přenosu osobních údajů mimo Evropskou unii, je zajištěna odpovídající ochrana údajů, zejména prostřednictvím:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>standardních smluvních doložek (SCC)</li>
              <li>nebo jiných odpovídajících mechanismů</li>
            </ul>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">8. Doba uchování</h3>
            <p>Osobní údaje uchováváme:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>po dobu trvání smluvního vztahu</li>
              <li>po dobu nezbytnou pro plnění právních povinností</li>
              <li>případně dle pokynů klienta</li>
            </ul>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">9. Práva subjektů údajů</h3>
            <p>Subjekt údajů má právo:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2 mb-4">
              <li>na přístup k osobním údajům</li>
              <li>na opravu</li>
              <li>na výmaz</li>
              <li>na omezení zpracování</li>
              <li>na přenositelnost údajů</li>
              <li>vznést námitku proti zpracování</li>
              <li>podat stížnost u Úřad pro ochranu osobních údajů</li>
            </ul>
            <div className="mt-4 p-6 bg-octopus-gold/5 border border-octopus-gold/20 rounded-2xl">
              <p className="text-octopus-gold font-bold mb-2 uppercase tracking-wider text-xs">👉 Důležité upozornění:</p>
              <p className="text-sm mb-4">V případech, kdy vystupujeme jako zpracovatel (zejména u údajů o kandidátech), uplatňujte svá práva přímo u příslušného správce, kterému jste své údaje poskytli (typicky zaměstnavatel nebo firma, u které se ucházíte o práci).</p>
              <p className="text-sm">Jako zpracovatel jsme oprávněni tyto žádosti předat správci, který je odpovědný za jejich vyřízení.</p>
            </div>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">10. Zabezpečení osobních údajů</h3>
            <p>Používáme vhodná technická a organizační opatření k ochraně osobních údajů. Uplatňujeme zejména:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>omezení přístupu k údajům</li>
              <li>řízení přístupových oprávnění</li>
              <li>zabezpečení systémů</li>
            </ul>
            <p className="mt-4 text-sm italic opacity-60">👉 K osobním údajům mají přístup pouze oprávněné osoby a subjekty nezbytné pro poskytování služby.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">11. Cookies</h3>
            <p>Webové stránky používají cookies za účelem:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2 mb-4">
              <li>zajištění správné funkčnosti webu</li>
              <li>analýzy návštěvnosti</li>
              <li>marketingových aktivit</li>
            </ul>
            <p>Cookies jsou malé textové soubory, které se ukládají do zařízení uživatele při návštěvě webu.</p>
            <div className="mt-4 space-y-2">
              <p>Rozlišujeme následující typy cookies:</p>
              <ul className="list-disc list-inside ml-2">
                <li>Nezbytné cookies – nutné pro základní funkčnost webu</li>
                <li>Analytické cookies – slouží k analýze návštěvnosti (např. Google Analytics)</li>
                <li>Marketingové cookies – slouží k personalizaci reklam a marketingu</li>
              </ul>
            </div>
            <p className="mt-4 text-sm italic opacity-60">👉 Cookies, které nejsou nezbytné, jsou ukládány pouze na základě souhlasu uživatele prostřednictvím cookie lišty.</p>
            <p className="text-sm italic opacity-60">👉 Uživatel může svůj souhlas kdykoliv změnit nebo odvolat prostřednictvím nastavení cookies na webu.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">12. Kontakt</h3>
            <p>V případě dotazů ohledně ochrany osobních údajů nás můžete kontaktovat: <span className="text-octopus-navy font-bold">obchod@teamoctopus.cz</span></p>
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
            <p>Tyto obchodní podmínky (dále jen „Podmínky“) upravují práva a povinnosti mezi:</p>
            <div className="mt-4 p-6 bg-octopus-cream rounded-2xl border border-octopus-navy/5">
              <p className="font-bold text-octopus-navy">TEAM OCTOPUS s.r.o.</p>
              <p>se sídlem: Příčná 1892/4, Nové Město, 110 00 Praha 1</p>
              <p>IČO: 237 99 838</p>
              <p>e-mail: obchod@teamoctopus.cz</p>
              <p className="text-xs mt-2 opacity-50">(dále jen „Poskytovatel“)</p>
            </div>
            <p className="mt-4">a zákazníkem (dále jen „Uživatel“).</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">2. Předmět služby</h3>
            <p>Poskytovatel poskytuje online nástroj zaměřený na:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>podporu náboru zaměstnanců</li>
              <li>správu kandidátů</li>
              <li>automatizaci komunikace s uchazeči</li>
              <li>využití prvků umělé inteligence (AI)</li>
            </ul>
            <p className="mt-4 font-bold text-octopus-navy">Služba je poskytována formou SaaS (Software as a Service).</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">3. Uzavření smlouvy</h3>
            <p>Smlouva vzniká:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>odesláním objednávky</li>
              <li>potvrzením objednávky</li>
              <li>nebo zaplacením služby</li>
            </ul>
            <p className="mt-4">Smlouva může být uzavřena i elektronicky. Uživatel potvrzuje, že se seznámil s Podmínkami a souhlasí s nimi.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">4. Cena a platební podmínky</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Cena je uvedena na webu</li>
              <li>Platba probíhá online (např. kartou přes Stripe)</li>
              <li>Služba je aktivována po připsání platby</li>
            </ul>
            <p className="mt-4 text-sm italic opacity-60">Poskytovatel si vyhrazuje právo změny ceny.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">5. Charakter služby a AI</h3>
            <p>Služba využívá prvky umělé inteligence.</p>
            <div className="mt-4 p-6 bg-octopus-gold/5 border border-octopus-gold/20 rounded-2xl space-y-3">
              <p className="text-octopus-gold font-bold text-sm">👉 Výstupy AI mají pouze doporučující charakter</p>
              <p className="text-octopus-gold font-bold text-sm">👉 Poskytovatel nenese odpovědnost za rozhodnutí Uživatele</p>
              <p className="text-sm">Uživatel bere na vědomí, že AI může vykazovat nepřesnosti.</p>
            </div>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">6. Odpovědnost za nábor</h3>
            <p>Uživatel odpovídá za:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>výběr zaměstnanců</li>
              <li>dodržování právních předpisů</li>
              <li>nediskriminační přístup</li>
            </ul>
            <p className="mt-4">Poskytovatel nezasahuje do rozhodování.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">7. Povinnosti uživatele</h3>
            <p>Uživatel se zavazuje:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>používat službu v souladu s právními předpisy</li>
              <li>nezneužívat službu</li>
              <li>mít oprávnění zpracovávat osobní údaje kandidátů</li>
            </ul>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">8. Zpracování osobních údajů</h3>
            <p>Poskytovatel zpracovává osobní údaje:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>jako správce (u zákazníků)</li>
              <li>jako zpracovatel (u kandidátů)</li>
            </ul>
            <p className="mt-4">Podrobnosti upravují Zásady ochrany osobních údajů a Smlouva o zpracování osobních údajů (DPA), která tvoří přílohu těchto Podmínek.</p>
            <p className="mt-4 text-octopus-gold font-bold text-sm">👉 Odsouhlasením těchto Podmínek Uživatel zároveň souhlasí s DPA.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">9. Využití externích nástrojů</h3>
            <p>Pro poskytování služby může Poskytovatel využívat třetí strany, zejména: RTM Labs, Clientee, Stripe.</p>
            <p className="mt-4 text-sm italic opacity-60">👉 Poskytovatel je oprávněn využívat i další obdobné nástroje. Aktuální seznam zpracovatelů je uveden v Zásadách ochrany osobních údajů.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">10. Dostupnost služby</h3>
            <p>Poskytovatel negarantuje nepřetržitou dostupnost služby.</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Může docházet k plánované údržbě, o které bude Uživatel předem informován.</li>
              <li>Uživatel nemá nárok na náhradu škody ani slevu z ceny služby z důvodu plánované údržby oznámené předem.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">11. Omezení odpovědnosti</h3>
            <p>Poskytovatel neodpovídá za ušlý zisk, nepřímé škody nebo rozhodnutí Uživatele. Maximální odpovědnost Poskytovatele je omezena výší částky zaplacené Uživatelem.</p>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">12. Ukončení služby a odstoupení od smlouvy</h3>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-octopus-navy">12.1 Ukončení služby</p>
                <p>Uživatel může službu kdykoliv ukončit. Poskytovatel může službu ukončit zejména v případě porušení těchto Podmínek ze strany Uživatele.</p>
              </div>
              <div>
                <p className="font-bold text-octopus-navy">12.2 Předplatné a fakturační období</p>
                <p>Ukončení služby nabývá účinnosti ke konci aktuálního fakturačního období. Do té doby má Uživatel k službě plný přístup.</p>
                <p className="mt-2 text-octopus-gold font-bold text-sm">👉 Služba je účtována vždy na celé fakturační období. Poskytovatel není povinen vracet již uhrazené platby za probíhající fakturační období.</p>
              </div>
              <div>
                <p className="font-bold text-octopus-navy">12.3 Způsob ukončení</p>
                <p>Uživatel může službu ukončit prostřednictvím uživatelského účtu nebo zasláním žádosti na e-mail: <span className="font-bold text-octopus-navy">obchod@teamoctopus.cz</span></p>
              </div>
              <div>
                <p className="font-bold text-octopus-navy">12.4 Nakládání s daty po ukončení služby</p>
                <p>Po ukončení služby je Poskytovatel oprávněn uživatelský účet včetně všech dat po uplynutí 30 dnů smazat, pokud právní předpisy nestanoví jinak. Po tuto dobu má Uživatel možnost si data vyexportovat.</p>
              </div>
              <div>
                <p className="font-bold text-octopus-navy">12.5 Odstoupení od smlouvy (spotřebitel)</p>
                <p>Uživatel, který je spotřebitelem, má právo odstoupit od smlouvy do 14 dnů od jejího uzavření.</p>
                <p className="mt-2 text-sm italic opacity-60">👉 Uživatel bere na vědomí, že pokud na jeho žádost dojde k zahájení poskytování služby před uplynutím této lhůty, nemá nárok na vrácení poměrné části ceny za již poskytnuté plnění.</p>
              </div>
              <p className="font-bold text-octopus-navy pt-2">12.6 Charakter služby: Služba je určena primárně pro podnikatele.</p>
            </div>
          </section>

          <section>
            <h3 className="text-octopus-navy font-bold text-xl mb-4">13. Změna Podmínek a závěrečná ustanovení</h3>
            <p>Poskytovatel si vyhrazuje právo tyto Podmínky měnit. Změnu Podmínek oznámí Poskytovatel Uživateli e-mailem alespoň 14 dní před nabytím účinnosti změny. Uživatel má právo změnu odmítnout a smlouvu ke dni účinnosti změny vypovědět.</p>
          </section>
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
