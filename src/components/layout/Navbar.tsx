import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
const logo = "/logo.png";

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <div className={`relative flex items-center justify-center overflow-hidden rounded-xl ${className}`}>
    <img src={logo} alt="Team Octopus Logo" className="w-full h-full object-cover" />
  </div>
);

export default function Navbar({ onAuditClick }: { onAuditClick?: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Řešení', path: '/#reseni' },
    { label: 'Přínosy', path: '/#prinosy' },
    { label: 'AI audit', path: '#audit', onClick: onAuditClick },
    { label: 'O nás', path: '/o-nas' },
    { label: 'Blog', path: '/blog' },
    { label: 'Video', path: '/videos' }
  ];

  return (
    <nav className="fixed top-0 w-full z-40 bg-octopus-cream/80 backdrop-blur-2xl border-b border-octopus-navy/5">
      <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-1 group">
          <Logo className="w-20 h-20 group-hover:scale-110 transition-transform duration-700 ease-out translate-y-1" />
          <div className="flex flex-col -translate-x-2">
            <span className="text-[10px] font-bold tracking-[0.4em] text-octopus-gold uppercase mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-700">MaxTeam HR AI Hub</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-12">
          {menuItems.map((item) => (
            item.onClick ? (
              <button 
                key={item.label} 
                onClick={item.onClick}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-octopus-navy/60 hover:text-octopus-gold transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <Link key={item.label} to={item.path} className="text-[11px] font-bold uppercase tracking-[0.2em] text-octopus-navy/60 hover:text-octopus-gold transition-colors">
                {item.label}
              </Link>
            )
          ))}
          <button className="bg-octopus-navy text-octopus-cream px-10 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-octopus-gold hover:text-octopus-navy transition-all shadow-xl shadow-octopus-navy/10 active:scale-95">
            Najít talenty
          </button>
        </div>

        <button className="md:hidden text-octopus-navy p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-octopus-cream border-b border-octopus-navy/10 p-10 flex flex-col gap-8">
          {menuItems.map((item) => (
            item.onClick ? (
              <button 
                key={item.label} 
                onClick={() => { item.onClick!(); setIsMenuOpen(false); }}
                className="text-2xl font-bold tracking-tight text-octopus-navy text-left"
              >
                {item.label}
              </button>
            ) : (
              <Link key={item.label} to={item.path} className="text-2xl font-bold tracking-tight text-octopus-navy" onClick={() => setIsMenuOpen(false)}>{item.label}</Link>
            )
          ))}
          <button className="bg-octopus-navy text-white py-5 rounded-full font-bold text-lg shadow-xl">Chci najít talenty</button>
        </motion.div>
      )}
    </nav>
  );
}
