import { motion } from "motion/react";
import { Play, Filter, Clock, ChevronRight } from "lucide-react";

const videoCategories = ["Vše", "Webináře", "Produktové Demo", "Klientské Příběhy"];

const videos = [
  {
    title: "Budoucnost AI v HR: Webinář 2026",
    category: "Webináře",
    thumbnail: "https://picsum.photos/seed/view-webinar/800/450",
    duration: "45:00",
    desc: "Záznam našeho nejúspěšnějšího webináře o implementaci umělé inteligence do každodenních HR procesů."
  },
  {
    title: "Team Octopus v akci: Produktová prohlídka",
    category: "Produktové Demo",
    thumbnail: "https://picsum.photos/seed/view-demo/800/450",
    duration: "12:30",
    desc: "Podívejte se, jak naše platforma zjednodušuje nábor a správu talentů v praxi."
  },
  {
    title: "TechnoLogix: Příběh úspěšné transformace",
    category: "Klientské Příběhy",
    thumbnail: "https://picsum.photos/seed/view-client/800/450",
    duration: "08:15",
    desc: "Jak jsme pomohli přední technologické firmě zkrátit náborový proces o 70 %."
  }
];

export default function VideoGallery() {
  return (
    <div className="pt-56 pb-40 px-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mb-32">
        <h1 className="text-8xl font-bold text-octopus-navy tracking-tighter mb-10 leading-[0.85]">
          Video <br />
          <span className="text-octopus-gold italic font-serif font-normal">& Inspirace</span>
        </h1>
        <p className="text-2xl text-octopus-navy/50 font-medium leading-relaxed">
          Prozkoumejte naše webináře, produktové ukázky a příběhy klientů, které vám pomohou lépe pochopit moderní HR.
        </p>
      </motion.div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-6 mb-20 border-b border-octopus-navy/10 pb-8">
        <Filter size={16} className="text-octopus-gold" />
        {videoCategories.map((cat, i) => (
          <button key={i} className={`text-[10px] font-bold uppercase tracking-[0.3em] px-8 py-3 rounded-full transition-all ${i === 0 ? 'bg-octopus-navy text-white' : 'hover:bg-octopus-navy/5 text-octopus-navy/40 hover:text-octopus-navy'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
        {videos.map((vid, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.1 }}>
            <div className="group block cursor-pointer">
              <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden mb-10 shadow-2xl shadow-octopus-navy/5 bg-octopus-navy/5 border border-octopus-navy/5">
                <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-octopus-navy/20 group-hover:opacity-0 transition-opacity" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white scale-90 group-hover:scale-100 group-hover:bg-octopus-gold group-hover:text-octopus-navy transition-all duration-500 shadow-2xl">
                    <Play size={24} className="ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-6 right-6 px-4 py-1.5 rounded-full bg-octopus-navy/80 backdrop-blur-md text-white text-[10px] font-bold tracking-[0.2em] flex items-center gap-2">
                  <Clock size={12} className="text-octopus-gold" />
                  {vid.duration}
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-6 text-octopus-gold text-[10px] font-bold uppercase tracking-[0.3em]">
                {vid.category}
              </div>
              
              <h3 className="text-3xl font-bold text-octopus-navy mb-4 tracking-tight group-hover:text-octopus-gold transition-colors leading-tight">
                {vid.title}
              </h3>
              <p className="text-octopus-navy/50 font-medium leading-relaxed mb-10">
                {vid.desc}
              </p>
              
              <div className="flex items-center gap-3 text-octopus-navy font-bold text-[10px] uppercase tracking-[0.3em] group-hover:gap-5 transition-all">
                Přehrát video
                <ChevronRight size={16} className="text-octopus-gold" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Cinematic Highlight Video Placeholder */}
      <div className="mt-40 rounded-[60px] overflow-hidden bg-octopus-navy p-20 text-center relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/felt.png')] pointer-events-none" />
        <h4 className="text-octopus-gold font-bold text-xs uppercase tracking-[0.5em] mb-12 relative z-10">Hlavní Video</h4>
        <h3 className="text-5xl sm:text-6xl font-bold text-white tracking-tighter mb-16 max-w-4xl mx-auto leading-tight relative z-10">Objevte svět moderního HR s Team Octopus.</h3>
        <button className="bg-white text-octopus-navy px-12 py-6 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-octopus-gold transition-all shadow-2xl flex items-center gap-4 mx-auto relative z-10 active:scale-95">
          Spustit prezentaci
          <Play size={20} className="ml-1 fill-current" />
        </button>
      </div>
    </div>
  );
}
