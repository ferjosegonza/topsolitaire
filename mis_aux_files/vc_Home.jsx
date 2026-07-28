import React from 'react';
import AdBanner from '@/components/AdBanner';  // ← CAMBIADO
import Footer from '@/components/Footer';
import SolitaireGame from '@/components/solitaire/SolitaireGame';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Anuncio superior - AHORA usa AdBanner */}
      <AdBanner
        slot="2778338000"
        format="auto"
        className="w-full ad-top"
      />

      <main className="flex-1 w-full">
        <div className="mx-auto max-w-[1100px] px-3 py-5 sm:py-7 flex flex-col lg:flex-row gap-5">
          <section className="flex-1 min-w-0">
            <header className="mb-4 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Play Solitaire Online Free
              </h1>
              <p className="mt-1 text-sm sm:text-base text-slate-500">
                Classic Klondike Solitaire — no signup, no download, play instantly in your browser.
              </p>
            </header>
            <SolitaireGame />
          </section>

          <aside className="hidden lg:block w-[300px] shrink-0">
            <div className="sticky top-4">
              {/* Anuncio lateral - AHORA usa AdBanner */}
              <AdBanner
                slot="1348751976"
                format="auto"
                className="w-full"
                style={{ minHeight: '600px' }}
              />
            </div>
          </aside>
        </div>
      </main>

      <Footer />

      {/* Anuncio inferior - AHORA usa AdBanner */}
      <AdBanner
        slot="5866581486"
        format="auto"
        className="w-full ad-bottom"
      />
    </div>
  );
}