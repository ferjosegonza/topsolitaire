import React from 'react';
import AdSlot from '@/components/AdSlot';
import Footer from '@/components/Footer';
import SolitaireGame from '@/components/solitaire/SolitaireGame';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AdSlot id="adsense-top" className="w-full" minHeight="90px" />

      <main className="flex-1 w-full">
        <div className="mx-auto max-w-[1100px] px-1 sm:px-3 py-1 sm:py-7 flex flex-col lg:flex-row gap-5">
          <section className="flex-1 min-w-0">
            <header className="mb-1 sm:mb-4 text-center sm:text-left">
              <h1 className="text-lg sm:text-3xl font-bold text-slate-900 tracking-tight">
                Play Solitaire Online Free
              </h1>
              <p className="hidden sm:block mt-1 text-sm sm:text-base text-slate-500">
                Classic Klondike Solitaire — no signup, no download, play instantly in your browser.
              </p>
            </header>
            <SolitaireGame />
          </section>

          <aside className="hidden lg:block w-[300px] shrink-0">
            <div className="sticky top-4">
              <AdSlot id="adsense-sidebar" className="w-full" minHeight="600px" />
            </div>
          </aside>
        </div>
      </main>

      <Footer />

      <AdSlot id="adsense-bottom" className="w-full" minHeight="90px" />
    </div>
  );
}