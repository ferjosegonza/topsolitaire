import React from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import SolitaireGame from '@/components/solitaire/SolitaireGame';

const HILLTOP_BANNER_SRC = "\/\/unfoldedtrade.com\/bBX.VesPdZG\/lm0AYCW\/cq\/Je\/mS9\/uQZ\/UBlRk\/P_TGc\/zIMcTlYM2XOvDwkBteNGznM\/xiN\/jTYc5QMTwR";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-app)' }}>
      <main className="flex-1 w-full">
        <div className="mx-auto max-w-[1100px] px-3 py-5 sm:py-7 flex flex-col lg:flex-row gap-5">
          <section className="flex-1 min-w-0">
            <header className="mb-5 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase mb-2"
                style={{ color: 'var(--accent)', backgroundColor: 'var(--accent-muted)', border: '1px solid var(--accent-hover)' }}>
                {t('game.badge')}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {t('game.title')}
              </h1>
              <p className="mt-1 text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                {t('game.subtitle')}
              </p>
            </header>
            <SolitaireGame />
          </section>
        </div>
      </main>

      <AdBanner
        slotId="hilltop-bottom"
        scriptSrc={HILLTOP_BANNER_SRC}
        className="ad-bottom"
      />

      <Footer />
    </div>
  );
}
