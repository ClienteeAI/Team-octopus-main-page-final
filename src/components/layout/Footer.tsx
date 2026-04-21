import { Link } from "react-router-dom";
import { Facebook } from "lucide-react";
const logo = "/logo.png";

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <div className={`relative flex items-center justify-center overflow-hidden rounded-xl ${className}`}>
    <img src={logo} alt="Team Octopus Logo" className="w-full h-full object-cover" />
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-octopus-cream py-40 border-t border-octopus-navy/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-24 mb-32">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-10 group cursor-pointer">
              <Logo className="w-24 h-24 group-hover:scale-110 transition-transform duration-700" />
              <div className="flex flex-col -translate-x-3">
                <span className="text-xs font-bold tracking-[0.4em] text-octopus-gold uppercase mt-1">MaxTeam HR AI Hub</span>
              </div>
            </div>
            <p className="text-octopus-navy/50 font-medium leading-relaxed text-lg italic font-serif">
              "Největší riziko pro firmu není trh, ale špatný výběr lidí. Pomáháme vám identifikovat špičkové talenty s přesností, která mění budoucnost vašich týmů."
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-24">
            <div>
              <h5 className="font-bold text-[11px] uppercase tracking-[0.3em] mb-10 text-octopus-gold">Navigace</h5>
              <ul className="space-y-5 text-sm font-bold text-octopus-navy/60">
                <li><Link to="/#reseni" className="hover:text-octopus-navy transition-colors">Řešení</Link></li>
                <li><Link to="/#prinosy" className="hover:text-octopus-navy transition-colors">Přínosy</Link></li>
                <li><Link to="/o-nas" className="hover:text-octopus-navy transition-colors">O nás</Link></li>
                <li><Link to="/blog" className="hover:text-octopus-navy transition-colors">Blog</Link></li>
                <li><Link to="/videos" className="hover:text-octopus-navy transition-colors">Video</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-[11px] uppercase tracking-[0.3em] mb-10 text-octopus-gold">Kontakt</h5>
              <ul className="space-y-5 text-sm font-bold text-octopus-navy/60">
                <li className="font-bold text-octopus-navy/80">TEAM OCTOPUS s.r.o.</li>
                <li>Příčná 1892/4, Nové Město</li>
                <li>110 00 Praha 1</li>
                <li>IČO: 237 99 838</li>
                <li>
                  <a href="mailto:obchod@teamoctopus.cz" className="hover:text-octopus-navy transition-colors text-octopus-gold/70 hover:text-octopus-gold">
                    obchod@teamoctopus.cz
                  </a>
                </li>
                <li className="pt-2">
                  <a 
                    href="https://www.facebook.com/teamoctopuscz" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 hover:text-octopus-navy transition-colors text-octopus-gold/70 hover:text-octopus-gold"
                  >
                    <Facebook className="w-5 h-5" />
                    <span>Facebook</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-16 border-t border-octopus-navy/10 flex flex-col lg:flex-row justify-between gap-12 items-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-octopus-navy/30">© 2026 Team Octopus. Budujeme vítězné týmy.</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[10px] font-bold uppercase tracking-[0.3em] text-octopus-navy/30">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-policy', { detail: 'privacy' }))}
              className="hover:text-octopus-navy transition-colors whitespace-nowrap"
            >
              Soukromí
            </button>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-policy', { detail: 'terms' }))}
              className="hover:text-octopus-navy transition-colors whitespace-nowrap"
            >
              Podmínky
            </button>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-settings'))}
              className="hover:text-octopus-navy transition-colors whitespace-nowrap"
            >
              Nastavení cookies
            </button>
          </div>
        </div>
      </div>
      
      {/* Large background text for premium feel */}
      <div className="absolute bottom-[-5%] left-0 w-full pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-bold text-octopus-navy/[0.02] whitespace-nowrap tracking-tighter">OCTOPUS</span>
      </div>
    </footer>
  );
}
