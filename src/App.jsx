import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import RainyBackground from './components/RainyBackground';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import LocaleLayout from './components/LocaleLayout';
import { Analytics } from '@vercel/analytics/react';
import useDocumentMeta from './lib/useDocumentMeta';

function MetaUpdater() {
  // Actualiza <title>, canonical, hreflang y metas SEO según ruta e idioma actual
  useDocumentMeta();
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <MetaUpdater />
        {/* 🌧️ Fondo animado del Modo Lluvioso (solo visible en theme=rainy) */}
        <RainyBackground />
        <ScrollToTop />
        
        {/* ============================================================ */}
        {/* PUBLICIDAD: usa el snippet que te dé HilltopAds o un bloque HTML */}
        {/* personalizado. No se usa AdSense en este proyecto. */}
        {/* ============================================================ */}
        
        <Routes>
          {/* Rutas directas / default */}
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />

          {/* Rutas localizadas por idioma */}
          <Route path="/:lang" element={<LocaleLayout />}>
            <Route index element={<Home />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Fallback global */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
      </Router>
      <Toaster />
      <Analytics />
    </QueryClientProvider>
  )
}

export default App
