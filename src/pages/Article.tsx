import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { articles } from "../data/articles";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";

export default function Article() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="pt-56 pb-40 px-6 text-center max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-octopus-navy mb-8">Článek nebyl nalezen.</h1>
        <Link to="/blog" className="text-octopus-gold font-bold uppercase tracking-widest hover:underline">Zpět na blog</Link>
      </div>
    );
  }

  return (
    <div className="pt-56 pb-40 relative">

      <article className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-20">
          <Link to="/blog" className="inline-flex items-center gap-3 text-octopus-navy/40 hover:text-octopus-gold font-bold text-[10px] uppercase tracking-[0.3em] transition-colors mb-12 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
            Zpět na přehled
          </Link>
          
          <div className="flex items-center gap-10 mb-10 text-[10px] font-bold uppercase tracking-[0.2em] text-octopus-gold">
            <div className="flex items-center gap-3"><Tag size={14} /> {article.category}</div>
            <div className="flex items-center gap-3 text-octopus-navy/30"><Clock size={14} /> {article.readTime}</div>
            <div className="flex items-center gap-3 text-octopus-navy/30"><Calendar size={14} /> {article.date}</div>
          </div>

          <h1 className="text-6xl sm:text-7xl font-bold text-octopus-navy tracking-tighter mb-12 leading-[0.9]">
            {article.title}
          </h1>

          <div className="aspect-[16/8] rounded-[60px] overflow-hidden shadow-2xl relative mb-20 group">
             <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
             <div className="absolute inset-0 bg-octopus-navy/10 group-hover:opacity-0 transition-opacity" />
          </div>

          <div className="prose prose-2xl prose-octopus max-w-none text-octopus-navy/70 leading-relaxed font-medium space-y-12" 
               dangerouslySetInnerHTML={{ __html: article.content }} />
          
          <div className="mt-32 pt-16 border-t border-octopus-navy/10 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-octopus-gold flex items-center justify-center text-octopus-navy font-bold text-2xl shadow-xl">
                 TO
              </div>
              <div>
                <h4 className="text-xl font-bold text-octopus-navy tracking-tight">Team Octopus Expert</h4>
                <p className="text-octopus-navy/40 font-bold uppercase tracking-[0.2em] text-[10px] mt-1">Specialista na HR strategie</p>
              </div>
            </div>
            
            <button className="flex items-center gap-4 bg-octopus-navy text-white px-10 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-octopus-gold hover:text-octopus-navy transition-all shadow-xl">
              Sdílet článek
              <Share2 size={16} />
            </button>
          </div>
        </motion.div>
      </article>
    </div>
  );
}

const Tag = ({ className, size }: { className?: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l4.58-4.58c.94-.94.94-2.48 0-3.42L12 2z"></path><path d="M7 7h.01"></path></svg>
);
