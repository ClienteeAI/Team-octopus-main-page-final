import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Article from "./pages/Article";
import VideoGallery from "./pages/VideoGallery";
import AuditModal from "./components/modals/AuditModal";
import PolicyModal from "./components/modals/PolicyModal";
import CookieBanner from "./components/layout/CookieBanner";
import AboutUs from "./pages/AboutUs";
import { useState, useEffect } from "react";

// Simple Skeleton for Other pages
const Placeholder = ({ title }: { title: string }) => (
  <div className="pt-56 pb-32 flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
    <h1 className="text-6xl font-bold text-octopus-navy mb-8 tracking-tighter">{title}</h1>
    <p className="text-xl text-octopus-navy/50 max-w-lg mb-12 leading-relaxed">
      Tato sekce je momentálně v přípravě. Brzy zde naleznete zajímavý obsah týkající se HR a technologií.
    </p>
    <div className="w-1.5 h-1.5 rounded-full bg-octopus-gold animate-pulse" />
  </div>
);

export default function App() {
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [policyType, setPolicyType] = useState<"privacy" | "terms" | "dpa" | null>(null);

  // Listen for open-policy events from footer
  useEffect(() => {
    const handleOpenPolicy = (e: any) => {
      setPolicyType(e.detail);
    };
    window.addEventListener("open-policy", handleOpenPolicy);
    return () => window.removeEventListener("open-policy", handleOpenPolicy);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-octopus-cream selection:bg-octopus-gold selection:text-octopus-navy font-sans antialiased overflow-x-hidden">
        {/* Velvet Texture Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/felt.png')] z-50" />

        <Navbar onAuditClick={() => setIsAuditOpen(true)} />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<Article />} />
            <Route path="/o-nas" element={<AboutUs />} />
            <Route path="/videos" element={<VideoGallery />} />
          </Routes>
        </main>

        <Footer />

        <AuditModal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} />
        
        <PolicyModal 
          isOpen={policyType !== null} 
          onClose={() => setPolicyType(null)} 
          type={policyType || "privacy"} 
        />

        <CookieBanner />
      </div>
    </Router>
  );
}
