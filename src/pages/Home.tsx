import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Search, 
  ClipboardCheck, 
  UserPlus, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  ChevronRight,
  Users,
  Target,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  Rocket,
  Star,
  Check,
  Lock,
  Headphones
} from "lucide-react";
import Testimonials from "../components/sections/Testimonials";
import Newsletter from "../components/sections/Newsletter";
import ExperienceSection from "../components/sections/Experience";
import ContactModal from "../components/modals/ContactModal";
import CheckoutModal from "../components/checkout/CheckoutModal";
import { PACKAGES, type CheckoutPackage } from "../data/packages";
const logoImg = "/octopus-logo.png";
const infographicImg = "/hr_process_infographic.jpg";

const Logo = ({ className = "w-10 h-10" }: { className?: string; light?: boolean }) => (
  <div className={`relative flex items-center justify-center overflow-hidden rounded-xl ${className}`}>
    <img src={logoImg} alt="Team Octopus Logo" className="w-full h-full object-cover" />
  </div>
);

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState("");

  const openModal = (context: string) => {
    setModalContext(context);
    setIsModalOpen(true);
  };

  const [checkoutPkg, setCheckoutPkg] = useState<CheckoutPackage | null>(null);

  const openCheckout = (id: CheckoutPackage["id"]) => {
    setCheckoutPkg(PACKAGES[id]);
  };

  return (
    <div className="relative">
      {/* Hero */}
      <section className="pt-56 pb-32 px-6 max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-octopus-gold/10 text-octopus-gold text-[10px] font-bold uppercase tracking-[0.25em] mb-10 border border-octopus-gold/20 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-octopus-gold animate-pulse" />
              AI Řešení MaxTeam HR
            </div>
            <h1 className="text-7xl sm:text-[100px] font-bold leading-[0.82] tracking-tighter mb-12 text-octopus-navy">
              Váš AI parťák <br />
              <span className="text-octopus-gold italic font-serif font-normal text-8xl sm:text-[120px]">pro nábor</span>
            </h1>
            <p className="text-xl text-octopus-navy/70 max-w-lg mb-14 leading-relaxed font-medium">
              MaxTeam HR je jediné řešení svého druhu. Pomáháme firmám s HR oddělením i bez něj najít, vybrat a onboardovat ty nejlepší kandidáty s nevídanou přesností a rychlostí.
            </p>
            <div className="flex flex-wrap gap-8">
              <button 
                onClick={() => openModal("Vyzkoušet MaxTeam HR (Hero)")}
                className="bg-octopus-navy text-white px-12 py-6 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-octopus-gold hover:text-octopus-navy transition-all shadow-[0_20px_50px_-10px_rgba(15,23,42,0.3)] flex items-center gap-4 group active:scale-95"
              >
                Vyzkoušet MaxTeam HR
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} className="relative">
            <div className="aspect-[4/5] bg-octopus-navy rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(15,23,42,0.4)] relative group">
              <img src="/hr_hero_professional.png" alt="MaxTeam HR Dashboard" className="object-cover w-full h-full opacity-60 group-hover:scale-105 transition-transform duration-[2s]" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-octopus-navy/10" />
              <div className="absolute bottom-12 left-12 right-12">
                <div className="flex items-center gap-8 p-10 bg-white/5 backdrop-blur-3xl rounded-[40px] border border-white/10 shadow-2xl">
                  <div className="w-20 h-20 rounded-3xl bg-octopus-gold flex items-center justify-center shadow-xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-700 overflow-hidden border-2 border-octopus-navy">
                    <img src={logoImg} alt="MaxTeam HR Logo" className="w-full h-full object-cover scale-110" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-3xl tracking-tight mb-1">MaxTeam HR</h3>
                    <p className="text-white/50 text-sm font-medium tracking-wide uppercase">Vaše inteligentní výhoda</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transition: Hero -> Dual-Path */}
      <div className="h-20 bg-octopus-cream/50" />

      {/* Dual-Path Value Proposition */}
      <section className="py-40 bg-octopus-cream/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-32">
            <h2 className="text-octopus-gold font-bold text-xs uppercase tracking-[0.5em] mb-10 text-center">Flexibilita pro každého</h2>
            <h3 className="text-6xl font-bold tracking-tighter text-octopus-navy leading-[0.9] text-center">Máte HR oddělení? <br/>Nebo ho právě budujete?</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Path A: With HR */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: -0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="p-16 rounded-[60px] bg-white border border-octopus-navy/5 shadow-xl relative group">
              <div className="w-16 h-16 rounded-3xl bg-octopus-blue flex items-center justify-center mb-10 text-white shadow-lg">
                <Users size={32} />
              </div>
              <h4 className="text-4xl font-bold mb-8 tracking-tight text-octopus-navy">Budeme pravou rukou vašeho HR</h4>
              <p className="text-lg text-octopus-navy/50 font-medium leading-relaxed mb-12">
                Oprostěte své personalisty od rutinní administrativy. MaxTeam HR šetří až 70 % času při screeningu životopisů a umožňuje HR týmu soustředit se na budování vztahů a firemní kultury.
              </p>
              <div 
                onClick={() => openModal("Zefektivnění stávajícího HR")}
                className="flex items-center gap-3 text-octopus-gold font-bold text-[10px] uppercase tracking-[0.3em] group-hover:gap-5 transition-all cursor-pointer"
              >
                Chci zefektivnit své HR
                <ArrowRight size={16} />
              </div>
            </motion.div>

            {/* Path B: No HR */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="p-16 rounded-[60px] bg-octopus-navy text-white shadow-2xl relative group overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-octopus-gold/10 blur-[60px] rounded-full" />
               <div className="w-16 h-16 rounded-3xl bg-octopus-gold flex items-center justify-center mb-10 text-octopus-navy shadow-lg">
                <Layers size={32} />
              </div>
              <h4 className="text-4xl font-bold mb-8 tracking-tight">Nahradíme celé HR oddělení</h4>
              <p className="text-lg text-white/50 font-medium leading-relaxed mb-12">
                Nemáte HR oddělení? Nevadí. MaxTeam HR je komplexní systém, který se postará o celý proces – od vyhledávání kandidátů přes jejich testování až po hladký nástup do firmy. Vše zvládnete sami za zlomkem času.
              </p>
              <div 
                onClick={() => openModal("Automatizované HR (bez oddělení)")}
                className="flex items-center gap-3 text-octopus-gold font-bold text-[10px] uppercase tracking-[0.3em] group-hover:gap-5 transition-all cursor-pointer"
              >
                Chci automatizované HR
                <ArrowRight size={16} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transition: Dual-Path -> AI Phases */}
      <div className="h-20 bg-white" />

      {/* 3 AI Phases */}
      <section id="reseni" className="py-40 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
            <div className="max-w-2xl">
              <h2 className="text-octopus-gold font-bold text-xs uppercase tracking-[0.5em] mb-8">Funkce MaxTeam HR</h2>
              <h3 className="text-6xl sm:text-7xl font-bold tracking-tighter text-octopus-navy leading-[0.9]">Těžiště vašeho <br/>úspěchu.</h3>
            </div>
            <p className="text-octopus-navy/40 font-medium max-w-xs text-lg leading-relaxed">Špičková AI technologie pro každou fázi zaměstnaneckého cyklu.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              { title: 'Inteligentní Nábor', icon: Target, color: 'bg-octopus-blue', desc: 'MaxTeam HR identifikuje talenty, kteří u vás ještě nepracují, ale měli by. Přitahuje ty pravé lidi silou dat a přesným cílením.' },
              { title: 'Neomylný Výběr', icon: Zap, color: 'bg-octopus-gold', desc: 'S naším algoritmem se nespletete. Identifikujeme kandidáty s nejvyšší shodou na pozici i firemní kulturu dříve, než se s nimi setkáte.' },
              { title: 'Plynulý Onboarding', icon: UserPlus, color: 'bg-octopus-green', desc: 'Aby nový kolega začal hned vítězit. MaxTeam HR zjednodušuje první dny ve firmě díky automatizovaným balíčkům a digitální podpoře.' }
            ].map((phase, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -15 }} 
                onClick={() => openModal(`Zájem o: ${phase.title}`)}
                className="group p-12 rounded-[48px] bg-octopus-cream border border-octopus-navy/5 hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.1)] transition-all duration-700 relative overflow-hidden cursor-pointer"
              >
                <div className={`w-20 h-20 rounded-3xl ${phase.color} flex items-center justify-center mb-12 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                  <phase.icon className="text-white w-10 h-10" />
                </div>
                <h4 className="text-4xl font-bold mb-6 tracking-tight text-octopus-navy">{phase.title}</h4>
                <p className="text-octopus-navy/60 leading-relaxed mb-10 text-lg font-medium">{phase.desc}</p>
                <div className="flex items-center gap-3 text-octopus-gold font-bold text-[10px] uppercase tracking-[0.3em]">
                  Budoucnost je AI
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transition: AI Phases -> Infographic */}
      <div className="h-20 bg-octopus-cream/30" />

      {/* HR Process Infographic */}
      <section className="py-40 bg-octopus-cream/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-24">
            <h2 className="text-octopus-gold font-bold text-xs uppercase tracking-[0.5em] mb-10">Váš model úspěchu</h2>
            <h3 className="text-6xl font-bold tracking-tighter text-octopus-navy leading-[0.9] mb-12">Jak zrychlit nábor <br/>až o 70 %</h3>
            <p className="text-xl text-octopus-navy/50 font-medium leading-relaxed">
              Představujeme Model 3 fází moderního HR, který kombinuje lidskou intuici s neomylnou AI technologií.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }} 
            viewport={{ once: true }}
            className="relative group lg:px-20"
          >
            <div className="relative rounded-[60px] overflow-hidden border border-octopus-navy/5 shadow-[0_50px_100px_-20px_rgba(15,23,42,0.1)] bg-white p-4">
              <img 
                src={infographicImg} 
                alt="Model 3 fází moderního HR - Infografika" 
                className="w-full h-auto rounded-[50px] transition-transform duration-[2s] group-hover:scale-[1.02]"
              />
            </div>
            
          </motion.div>
        </div>
      </section>

      {/* Transition: Infographic -> Benefits */}
      <div className="h-20 bg-[#0F172A]" />

      {/* Benefits - ROI focused */}
      <section id="prinosy" className="py-40 bg-octopus-navy text-octopus-cream relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div>
              <h2 className="text-octopus-gold font-bold text-xs uppercase tracking-[0.5em] mb-10">Maximální návratnost</h2>
              <h3 className="text-6xl sm:text-7xl font-bold tracking-tighter mb-20 leading-[0.85]">MaxTeam HR <br/>šetří, co je nejdražší.</h3>
              
              <div className="space-y-16">
                {[
                  { icon: Clock, title: '70% úspora času', desc: 'Zbavte své manažery i personalisty administrativní zátěže. MaxTeam HR postoupí jen ty, kteří za to stojí.' },
                  { icon: DollarSign, title: 'Snížení nákladů', desc: 'Rychleji obsazená pozice znamená méně ušlých příležitostí a nižší náklady na inzerci i externí agentury.' },
                  { icon: TrendingUp, title: 'Identifikace talentů', desc: 'Najdeme potenciál i tam, kde ho ostatní nevidí. S MaxTeam HR získáte lidi, kteří u vás chtějí skutečně vítězit.' }
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-10 group">
                    <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-octopus-gold group-hover:border-octopus-gold transition-all duration-500">
                      <benefit.icon className="w-7 h-7 text-octopus-gold group-hover:text-octopus-navy transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-3xl font-bold mb-3 tracking-tight">{benefit.title}</h4>
                      <p className="text-white/40 font-medium text-lg">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-[80px] overflow-hidden border border-white/10 p-3 bg-white/5 backdrop-blur-sm">
                <img src="/hr_team_success.png" alt="Úspěšný HR tým" className="w-full h-full object-cover rounded-[70px] opacity-70 hover:opacity-100 transition-all duration-1000" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-12 -left-12 bg-octopus-gold p-12 rounded-[50px] text-octopus-navy shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <div className="text-6xl font-bold mb-2 tracking-tighter">70%</div>
                <p className="font-bold uppercase tracking-[0.3em] text-[10px]">Tato efektivita čeká i na vás</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transition: Benefits -> Pricing */}
      <div className="h-20 bg-white" />

      {/* Ceník Section */}
      <section id="cenik" className="py-40 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-octopus-gold font-bold text-xs uppercase tracking-[0.5em] mb-8 text-center">Transparentní Ceník</h2>
            <h3 className="text-6xl font-bold tracking-tighter text-octopus-navy leading-[0.9] text-center mb-6">
              AI nábor pro firmy <br />
              <span className="text-octopus-gold italic font-serif font-normal text-6xl sm:text-7xl">každé velikosti</span>
            </h3>
            <p className="text-lg text-octopus-navy/50 font-medium leading-relaxed">
              Zrychlete svůj nábor s naším inteligentním AI asistentem. Vyberte si balíček, který nejlépe odpovídá vašim aktuálním potřebám. Žádné dlouhodobé závazky ani skryté poplatky.
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid lg:grid-cols-3 gap-12 items-stretch max-w-6xl mx-auto">
            
            {/* START Plan */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-octopus-cream/30 border border-octopus-navy/5 rounded-[40px] p-10 flex flex-col justify-between hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.08)] transition-all duration-500 relative"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-600 shadow-sm border border-teal-500/20">
                    <Rocket size={24} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-700 border border-teal-500/20">
                    Až 15 kandidátů
                  </span>
                </div>
                
                <h4 className="text-3xl font-bold tracking-tight text-octopus-navy mb-2">START</h4>
                <p className="text-octopus-navy/50 text-sm font-medium mb-8">Pro menší nábor nebo vyzkoušení</p>
                
                <div className="mb-8">
                  <div className="text-5xl font-extrabold text-octopus-navy tracking-tight mb-1">5 985 Kč</div>
                  <div className="text-sm font-bold text-teal-600">399 Kč / kandidát</div>
                </div>

                <div className="w-full h-px bg-octopus-navy/5 mb-8" />

                <ul className="space-y-4 mb-10">
                  {[
                    "AI pohovor a vyhodnocení",
                    "Detailní report kandidáta",
                    "Záznam rozhovoru",
                    "Okamžité výsledky"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-octopus-navy/70 font-medium text-sm">
                      <Check size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => openCheckout("start")}
                className="w-full py-4 text-center rounded-2xl text-xs font-bold uppercase tracking-[0.2em] border border-teal-600/50 text-teal-700 hover:bg-teal-600 hover:text-white transition-all active:scale-[0.98] cursor-pointer"
              >
                Vybrat balíček
              </button>
            </motion.div>

            {/* BUSINESS Plan - Featured */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white border-2 border-indigo-600 rounded-[40px] p-10 flex flex-col justify-between shadow-[0_30px_60px_-15px_rgba(30,27,75,0.12)] hover:shadow-[0_45px_90px_-20px_rgba(30,27,75,0.18)] transition-all duration-500 relative"
            >
              {/* Most Popular Ribbon */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-[0.25em] shadow-lg z-10">
                Nejoblíbenější
              </div>

              <div>
                <div className="flex items-center justify-between mb-8 mt-2">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-500/20">
                    <TrendingUp size={24} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-700 border border-indigo-500/20">
                    Až 35 kandidátů
                  </span>
                </div>
                
                <h4 className="text-3xl font-bold tracking-tight text-octopus-navy mb-2">BUSINESS</h4>
                <p className="text-octopus-navy/50 text-sm font-medium mb-8">Pro firmy, které chtějí nabírat efektivně</p>
                
                <div className="mb-8">
                  <div className="text-5xl font-extrabold text-octopus-navy tracking-tight mb-1">12 915 Kč</div>
                  <div className="text-sm font-bold text-indigo-600">369 Kč / kandidát</div>
                </div>

                <div className="w-full h-px bg-octopus-navy/5 mb-8" />

                <ul className="space-y-4 mb-10">
                  {[
                    "AI pohovor a vyhodnocení",
                    "Detailní report kandidáta",
                    "Záznam rozhovoru",
                    "Prioritní zpracování"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-octopus-navy/70 font-medium text-sm">
                      <Check size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => openCheckout("business")}
                className="w-full py-4.5 text-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-md shadow-indigo-600/10 active:scale-[0.98] cursor-pointer"
              >
                Vybrat balíček
              </button>
            </motion.div>

            {/* PERFORMANCE Plan */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-octopus-cream/30 border border-octopus-navy/5 rounded-[40px] p-10 flex flex-col justify-between hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.08)] transition-all duration-500 relative"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 shadow-sm border border-amber-500/20">
                    <Star size={24} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-700 border border-amber-500/20">
                    Až 80 kandidátů
                  </span>
                </div>
                
                <h4 className="text-3xl font-bold tracking-tight text-octopus-navy mb-2">PERFORMANCE</h4>
                <p className="text-octopus-navy/50 text-sm font-medium mb-8">Pro aktivní nábor a větší objem</p>
                
                <div className="mb-8">
                  <div className="text-5xl font-extrabold text-octopus-navy tracking-tight mb-1">27 920 Kč</div>
                  <div className="text-sm font-bold text-amber-600">349 Kč / kandidát</div>
                </div>

                <div className="w-full h-px bg-octopus-navy/5 mb-8" />

                <ul className="space-y-4 mb-10">
                  {[
                    "AI pohovor a vyhodnocení",
                    "Detailní report kandidáta",
                    "Záznam rozhovoru",
                    "Prioritní zpracování"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-octopus-navy/70 font-medium text-sm">
                      <Check size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => openCheckout("performance")}
                className="w-full py-4 text-center rounded-2xl text-xs font-bold uppercase tracking-[0.2em] border border-amber-600/50 text-amber-700 hover:bg-amber-600 hover:text-white transition-all active:scale-[0.98] cursor-pointer"
              >
                Vybrat balíček
              </button>
            </motion.div>

          </div>

          {/* Bottom Trust Banner */}
          <div className="mt-24 max-w-5xl mx-auto py-8 px-10 bg-octopus-cream/40 border border-octopus-navy/5 rounded-[32px] grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Bez závazků", text: "Kupujete jen když potřebujete.", color: "text-teal-600", bg: "bg-teal-500/10" },
              { icon: Lock, title: "Transparentní ceny", text: "Žádné skryté poplatky.", color: "text-indigo-650", bg: "bg-indigo-500/10" },
              { icon: Clock, title: "Okamžitý přístup", text: "Začněte do pár minut.", color: "text-blue-600", bg: "bg-blue-500/10" },
              { icon: Headphones, title: "Lidská podpora", text: "Jsme tu pro vás.", color: "text-amber-600", bg: "bg-amber-500/10" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center ${item.color} shrink-0`}>
                  <item.icon size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-octopus-navy leading-none mb-1">{item.title}</h5>
                  <p className="text-octopus-navy/50 text-xs font-medium">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Transition: Pricing -> Testimonials */}
      <div className="h-20 bg-white" />
      <Testimonials />
      <div className="h-20 bg-octopus-cream/30" />
      
      <ExperienceSection />
      
      <div className="h-20 bg-octopus-navy" />

      <Newsletter />
      
      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        context={modalContext}
      />

      {/* Checkout Modal (nákupní flow: formulář -> souhrn -> platba) */}
      <CheckoutModal
        isOpen={checkoutPkg !== null}
        onClose={() => setCheckoutPkg(null)}
        pkg={checkoutPkg}
      />
    </div>
  );
}
