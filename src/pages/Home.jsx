import React from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import SolitaireGame from '@/components/solitaire/SolitaireGame';

const HILLTOP_BANNER_SRC = "\/\/unfoldedtrade.com\/bBX.VesPdZG\/lm0AYCW\/cq\/Je\/mS9\/uQZ\/UBlRk\/P_TGc\/zIMcTlYM2XOvDwkBteNGznM\/xiN\/jTYc5QMTwR";

export default function Home() {
  const { t } = useTranslation();
  const ruleKeys = ['rule1', 'rule2', 'rule3', 'rule4'];
  const faqs = [
    { q: 'faq1q', a: 'faq1a' },
    { q: 'faq2q', a: 'faq2a' },
    { q: 'faq3q', a: 'faq3a' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-app)' }}>
      <main className="flex-1 w-full">
        <div className="mx-auto max-w-[1100px] px-1 py-5 sm:py-7 flex flex-col lg:flex-row gap-5">
          <section id="game" className="flex-1 min-w-0">
            <header className="mb-5 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full px-1 py-1 text-xs font-medium tracking-wide uppercase mb-2"
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

        {/* Contenido semántico SEO (P8): How to Play, Rules y FAQ localizados */}
        <div className="mx-auto max-w-[1100px] px-3 pb-5 sm:pb-7">
          <div className="grid gap-5 md:grid-cols-2" style={{ color: 'var(--text-primary)' }}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {t('home.howToTitle')}
              </h2>
              <p className="mb-3 text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                {t('home.howToIntro')}
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                {ruleKeys.map((key, i) => (
                  <li key={key}>{t(`game.rule${i + 1}`)}</li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {t('home.rulesTitle')}
              </h2>
              <ul className="space-y-3 text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                {ruleKeys.map((key) => (
                  <li key={key} className="rounded-xl p-3 border"
                    style={{ borderColor: 'var(--accent-muted)', backgroundColor: 'var(--bg-board)' }}>
                    {t(`home.${key}`)}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              {t('home.faqTitle')}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {faqs.map((item) => (
                <div key={item.q} className="rounded-xl p-4 border"
                  style={{ borderColor: 'var(--accent-muted)', backgroundColor: 'var(--bg-board)' }}>
                  <h3 className="mb-1.5 text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {t(`home.${item.q}`)}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {t(`home.${item.a}`)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <nav className="mt-10 text-center" aria-label={t('home.backToGame')}>
            <a
              href="#game"
              className="inline-flex items-center justify-center px-6 py-3 rounded-2xl text-white font-bold text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600"
            >
              {t('home.backToGame')}
            </a>
          </nav>
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
