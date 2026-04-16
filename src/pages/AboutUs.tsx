import { motion } from "motion/react";
import { Quote, BrainCircuit, Users2, Award, ArrowRight, Handshake } from "lucide-react";
import Newsletter from "../components/sections/Newsletter";

export default function AboutUs() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="pt-56 pb-32 px-6 max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-octopus-gold/10 text-octopus-gold text-[10px] font-bold uppercase tracking-[0.25em] mb-10 border border-octopus-gold/20">
            <span className="w-1.5 h-1.5 rounded-full bg-octopus-gold animate-pulse" />
            O nás
          </div>
          <h1 className="text-7xl sm:text-[90px] font-bold leading-[0.85] tracking-tighter mb-14 text-octopus-navy">
            Reálná praxe,<br />
            <span className="text-octopus-gold italic font-serif font-normal text-8xl sm:text-[110px]">ne teorie.</span>
          </h1>
          <p className="text-xl text-octopus-navy/60 max-w-2xl leading-relaxed font-medium">
            Naše zkušenosti nejsou postavené jen na teoriích, ale na reálné praxi z náboru a každodenní spolupráce s firmami.
          </p>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="h-px bg-octopus-navy/5 max-w-7xl mx-auto" />

      {/* Main Story */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-octopus-gold/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-20">

            {/* Left column - main quote */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="relative p-14 sm:p-20 rounded-[56px] bg-white border border-octopus-navy/5 shadow-[0_40px_80px_-20px_rgba(15,23,42,0.06)]">
                <Quote className="absolute top-12 right-14 text-octopus-gold/10 w-28 h-28 rotate-12 pointer-events-none" />
                <div className="space-y-8 text-lg text-octopus-navy/65 font-medium leading-relaxed">
                  <p>
                    V <span className="font-bold text-octopus-navy">Team Octopus</span> pomáháme firmám najít ty správné lidi rychleji, chytřeji a s menšími náklady. Stojí za námi zkušenosti z personalistiky, obchodu a práce s firmami, které jsme spojili s moderními AI technologiemi.
                  </p>
                  <p>
                    Za projektem stojí tým lidí, kteří mají přímou zkušenost s tím, jak náročné je dnes najít spolehlivé zaměstnance — obzvlášť pro menší a střední firmy, kde často řeší nábor majitel nebo management vedle své hlavní práce.
                  </p>
                  <p>
                    Právě proto vzniklo řešení, které pomáhá automatizovat první kontakt s kandidáty, předvýběr i část náborového procesu. Kandidáti dostanou odpověď okamžitě, mohou absolvovat první pohovor kdykoliv a firmy získají více času na to nejdůležitější — vybrat si ty správné lidi.
                  </p>
                  <p>
                    Naše řešení vychází z reálných zkušeností a postupně ho rozvíjíme ve spolupráci s firmami, které chtějí svůj nábor zjednodušit a zefektivnit.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right column - stat cards */}
            <div className="lg:col-span-5 flex flex-col gap-8 justify-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="p-10 rounded-[40px] bg-octopus-navy text-white relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-octopus-gold/10 blur-3xl rounded-full" />
                <BrainCircuit className="text-octopus-gold mb-5 w-9 h-9" />
                <h4 className="text-2xl font-bold mb-4 tracking-tight">AI + Lidský přístup</h4>
                <p className="text-white/55 leading-relaxed font-medium text-sm">
                  Kombinací lidského úsudku a výkonu AI nástrojů získáte více času na to nejdůležitější — vybrat si ty správné lidi do vašeho týmu.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="p-10 rounded-[40px] bg-octopus-gold text-octopus-navy group"
              >
                <Users2 className="mb-5 w-9 h-9" />
                <h4 className="text-2xl font-bold mb-4 tracking-tight">Silnější týmy, rychleji</h4>
                <p className="opacity-70 leading-relaxed font-bold text-sm">
                  Nechceme nahradit lidský přístup. Chceme firmám dát nástroje, díky kterým budou dělat lepší rozhodnutí, rychleji růst a budovat silnější týmy.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-pillar section */}
      <section className="py-40 bg-octopus-cream/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <h2 className="text-octopus-gold font-bold text-xs uppercase tracking-[0.5em] mb-8">Co nás pohání</h2>
            <h3 className="text-5xl sm:text-6xl font-bold tracking-tighter text-octopus-navy leading-[0.9]">Naše hodnoty</h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Award,
                title: "Reálná praxe",
                desc: "Každé rozhodnutí stavíme na zkušenostech z každodenní spolupráce s firmami, ne na abstraktních teoriích.",
                color: "bg-octopus-blue"
              },
              {
                icon: BrainCircuit,
                title: "Chytrá automatizace",
                desc: "Kombinujeme lidský úsudek s výkonem moderní umělé inteligence, aby nábor byl rychlejší a přesnější.",
                color: "bg-octopus-gold"
              },
              {
                icon: Handshake,
                title: "Partnerství",
                desc: "Rozvíjíme naše řešení ve spolupráci s klienty. Váš úspěch je naším úspěchem.",
                color: "bg-octopus-green"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="p-12 rounded-[48px] bg-white border border-octopus-navy/5 hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.1)] transition-all duration-700 group"
              >
                <div className={`w-16 h-16 rounded-3xl ${item.color} flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <item.icon className="text-white w-8 h-8" />
                </div>
                <h4 className="text-3xl font-bold mb-5 tracking-tight text-octopus-navy">{item.title}</h4>
                <p className="text-octopus-navy/55 leading-relaxed font-medium text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transition to newsletter */}
      <div className="h-20 bg-octopus-navy" />
      <Newsletter />
    </div>
  );
}
