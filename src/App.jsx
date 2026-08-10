import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import RainyBackground from './components/RainyBackground';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import { Analytics } from '@vercel/analytics/react';
import useDocumentMeta from './lib/useDocumentMeta';

function App() {
  // Actualiza <title> y metas SEO según el idioma actual
  useDocumentMeta();

  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        {/* 🌧️ Fondo animado del Modo Lluvioso (solo visible en theme=rainy) */}
        <RainyBackground />
        <ScrollToTop />
        
        {/* ============================================================ */}
        {/* ANUNCIOS: se renderizan en index.html (estáticos) para evitar */}
        {/* duplicación de slots de AdSense. AdBanner de React ya no se usa. */}
        {/* ============================================================ */}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
        
      </Router>
      <Toaster />
      <Analytics />
    </QueryClientProvider>
  )
}

export default App
