import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import { Analytics } from '@vercel/analytics/react';
import AdBanner from './components/AdBanner';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />
        
        {/* ============================================================ */}
        {/* 🆕 ANUNCIO SUPERIOR - Se muestra ENCIMA de todas las páginas */}
        {/* ============================================================ */}
        <AdBanner 
          slot="2778338000" 
          format="auto" 
          className="ad-top"
        />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
        
        {/* ============================================================ */}
        {/* 🆕 ANUNCIO INFERIOR - Se muestra DEBAJO de todas las páginas */}
        {/* ============================================================ */}
        <AdBanner 
          slot="2778338000"  // ← Usa el mismo slot o crea uno nuevo
          format="auto" 
          className="ad-bottom"
        />
        
        {/* ============================================================ */}
        {/* 🆕 ANUNCIO LATERAL - Fijo en el costado derecho */}
        {/* ============================================================ */}
        <AdBanner 
          slot="2778338000"  // ← Usa el mismo slot o crea uno nuevo
          format="vertical" 
          className="ad-side"
          style={{ 
            position: 'fixed', 
            right: '8px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            width: '160px',
            minHeight: '600px',
            zIndex: 100,
          }}
        />
        
      </Router>
      <Toaster />
      <Analytics />
    </QueryClientProvider>
  )
}

export default App