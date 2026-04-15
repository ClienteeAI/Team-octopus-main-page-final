import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { articles } from "../data/articles";
import { ArrowLeft, Clock, Tag, ChevronRight } from "lucide-react";

export default function Blog() {
  return (
    <div className="pt-56 pb-40 px-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mb-32">
        <h1 className="text-8xl font-bold text-octopus-navy tracking-tighter mb-10 leading-[0.85]">
          Inspirace <br />
          <span className="text-octopus-gold italic font-serif font-normal">& HR trendy</span>
        </h1>
        <p className="text-2xl text-octopus-navy/50 font-medium leading-relaxed">
          Aktuální vhledy do světa Human Resources, moderních technologií a firemní kultury roku 2026.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
        {articles.map((article, i) => (
          <motion.div key={article.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.1 }}>
            <Link to={`/blog/${article.id}`} className="group block h-full">
              <div className="relative aspect-[16/10] rounded-[40px] overflow-hidden mb-10 shadow-2xl shadow-octopus-navy/5 border border-octopus-navy/5">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                  {article.category}
                </div>
              </div>
              
              <div className="flex items-center gap-6 mb-6 text-octopus-navy/40 text-[10px] font-bold uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-octopus-gold" />
                  {article.readTime}
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-octopus-gold/30" />
                {article.date}
              </div>
              
              <h3 className="text-3xl font-bold text-octopus-navy mb-6 tracking-tight group-hover:text-octopus-gold transition-colors leading-tight">
                {article.title}
              </h3>
              <p className="text-octopus-navy/50 font-medium leading-relaxed mb-8 line-clamp-2">
                {article.excerpt}
              </p>
              
              <div className="flex items-center gap-3 text-octopus-navy font-bold text-[10px] uppercase tracking-[0.3em] group-hover:gap-5 transition-all">
                Číst více
                <ChevronRight size={16} className="text-octopus-gold" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
