import { Link } from "react-router-dom";
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
                <li><Link to="/#řešení" className="hover:text-octopus-navy transition-colors">Řešení</Link></li>
                <li><Link to="/#přínosy" className="hover:text-octopus-navy transition-colors">Přínosy</Link></li>
                <li><Link to="/o-nas" className="hover:text-octopus-navy transition-colors">O nás</Link></li>
                <li><Link to="/blog" className="hover:text-octopus-navy transition-colors">Blog</Link></li>
                <li><Link to="/videos" className="hover:text-octopus-navy transition-colors">Video</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-[11px] uppercase tracking-[0.3em] mb-10 text-octopus-gold">Kontakt</h5>
              <ul className="space-y-5 text-sm font-bold text-octopus-navy/60">
                <li className="hover:text-octopus-navy transition-colors cursor-pointer">obchod@teamoctopus.cz</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-16 border-t border-octopus-navy/10 flex flex-col sm:flex-row justify-between gap-8 items-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-octopus-navy/30">© 2026 Team Octopus. Budujeme vítězné týmy.</p>
          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-octopus-navy/30">
            <Link to="/privacy" className="hover:text-octopus-navy transition-colors">Soukromí</Link>
            <Link to="/terms" className="hover:text-octopus-navy transition-colors">Podmínky</Link>
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
