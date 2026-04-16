import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Marek Novák",
    role: "HR Director",
    content: "Dřív jsme v náboru tápali a pálili peníze. Team Octopus nám otevřel oči. Teď přesně víme, koho hledat a jak ho získat. Naše týmy jsou teď o 100 % výkonnější.",
    rating: 5
  },
  {
    name: "Jana Dvořáková",
    role: "CEO",
    content: "Nejde jen o nábor, jde o jistotu. S Team Octopus jsme přestali dělat chyby, které nás stály miliony. Je to rozdíl mezi 'zkoušením' a 'vítězstvím'.",
    rating: 5
  },
  {
    name: "Petr Svoboda",
    role: "Head of Talent",
    content: "Konečně partner, který nemluví v hádankách, ale doručuje výsledky. Vidí v lidech potenciál, který my jsme neviděli. Naše fluktuace je minulostí.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="reference" className="py-40 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-32">
          <h2 className="text-octopus-gold font-bold text-xs uppercase tracking-[0.5em] mb-8">Důkaz místo slibů</h2>
          <h3 className="text-6xl font-bold tracking-tighter text-octopus-navy leading-[0.9]">Výsledky, které <br/>mění pravidla hry.</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-12 rounded-[48px] bg-octopus-cream border border-octopus-navy/5 relative group hover:shadow-2xl transition-all duration-700"
            >
              <div className="flex gap-1 mb-8">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-octopus-gold text-octopus-gold" />
                ))}
              </div>
              
              <Quote className="text-octopus-gold/20 absolute top-12 right-12 w-16 h-16" />
              
              <p className="text-xl text-octopus-navy/70 font-medium leading-relaxed mb-12 relative z-10 italic">
                "{t.content}"
              </p>
              
              <div className="flex items-center gap-5 pt-8 border-t border-octopus-navy/10">
                <div className="w-14 h-14 rounded-2xl bg-octopus-navy text-white flex items-center justify-center font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-octopus-navy">{t.name}</h4>
                  <p className="text-octopus-navy/40 text-[10px] font-bold uppercase tracking-[0.2em]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
