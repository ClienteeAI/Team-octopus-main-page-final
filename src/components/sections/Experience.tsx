import React from "react";
import { motion } from "motion/react";
import { Quote, Award, Users2, BrainCircuit } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="o-nas" className="py-40 bg-octopus-cream/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-octopus-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-octopus-blue/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          
          <div className="lg:col-span-12 mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-octopus-navy/5 text-octopus-navy/40 text-[10px] font-bold uppercase tracking-[0.25em] mb-10 border border-octopus-navy/5"
            >
              <Award size={12} className="text-octopus-gold" />
              Naše DNA & Zkušenosti
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-5xl sm:text-7xl font-bold tracking-tighter text-octopus-navy leading-[0.9] max-w-4xl"
            >
              Nejsme jen teorie. Jsme <br/>
              <span className="text-octopus-gold italic font-serif font-normal">reálná praxe</span> z náboru.
            </motion.h2>
          </div>

          <div className="lg:col-span-7 space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative p-12 sm:p-16 rounded-[48px] bg-white border border-octopus-navy/5 shadow-[0_40px_80px_-20px_rgba(15,23,42,0.05)]"
            >
              <Quote className="absolute top-10 right-12 text-octopus-gold/10 w-24 h-24 rotate-12 pointer-events-none" />
              <p className="text-2xl sm:text-3xl text-octopus-navy font-medium leading-tight mb-10 tracking-tight">
                "Naše zkušenosti nejsou postavené jen na teoriích, ale na reálné praxi z náboru a každodenní spolupráce s firmami."
              </p>
              <div className="space-y-6 text-lg text-octopus-navy/60 font-medium leading-relaxed">
                <p>
                  V Team Octopus pomáháme firmám najít ty správné lidi rychleji, chytřeji a s menšími náklady. Stojí za námi zkušenosti z personalistiky, obchodu a práce s firmami, které jsme spojili s moderními AI technologiemi.
                </p>
                <p>
                  Za projektem stojí tým lidí, kteří mají přímou zkušenost s tím, jak náročné je dnes najít spolehlivé zaměstnance — obzvlášť pro menší a střední firmy, kde často řeší nábor majitel nebo management vedle své hlavní práce.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="p-10 rounded-[40px] bg-octopus-navy text-white shadow-2xl relative overflow-hidden group"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-octopus-gold/10 blur-[60px] rounded-full" />
               <BrainCircuit className="text-octopus-gold mb-6 w-10 h-10" />
               <h4 className="text-2xl font-bold mb-6 tracking-tight">Automatizace s lidskou tváří</h4>
               <p className="text-white/60 leading-relaxed font-medium">
                  Právě proto vzniklo řešení, které pomáhá automatizovat první kontakt s kandidáty, předvýběr i část náborového procesu. Kandidáti dostanou odpověď okamžitě, mohou absolvovat první pohovor kdykoliv a firmy získají více času na to nejdůležitější — vybrat si ty správné lidi.
               </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-10 rounded-[40px] bg-octopus-gold text-octopus-navy shadow-xl"
            >
               <Users2 className="text-octopus-navy mb-6 w-10 h-10" />
               <h4 className="text-2xl font-bold mb-6 tracking-tight">Lepší rozhodnutí</h4>
               <p className="opacity-70 leading-relaxed font-bold">
                  Nechceme nahradit lidský přístup. Chceme firmám dát nástroje, díky kterým budou dělat lepší rozhodnutí, rychleji růst a budovat silnější týmy.
               </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-12 mt-12 text-center"
          >
            <p className="text-octopus-navy/30 text-[10px] font-bold uppercase tracking-[0.5em]">
              Budujeme budoucnost HR společně s vámi
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
