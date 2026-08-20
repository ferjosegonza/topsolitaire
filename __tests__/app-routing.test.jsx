import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import React from 'react';
import i18n from '../src/i18n';

// Mock de Analytics de Vercel (evita dependencia de red)
vi.mock('@vercel/analytics/react', () => ({
  Analytics: () => null,
}));

// Mock de sonidos (evita dependencia de use-sound / audio)
vi.mock('../src/hooks/useSoundEffects', () => ({
  useSoundEffects: () => ({
    isMuted: false,
    toggleMute: vi.fn(),
    playFlipSound: vi.fn(),
    playPlaceSound: vi.fn(),
    playDealSound: vi.fn(),
    playWinSound: vi.fn(),
    playClickSound: vi.fn(),
  }),
}));

import App from '../src/App';

const navigateTo = (path) => {
  window.history.pushState({}, '', path);
};

const readProjectFile = (relativePath) => readFileSync(new URL(relativePath, import.meta.url), 'utf8');

describe('App - rutas y navegación del sitio (BrowserRouter)', () => {
  afterEach(() => {
    cleanup();
    window.history.pushState({}, '', '/');
  });

  it('renderiza el Home con el juego en la ruta raíz', () => {
    navigateTo('/');
    render(<App />);
    expect(screen.getAllByText(/Play Solitaire Online Free/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/New Game/i)).toBeDefined();
    expect(screen.getByText(/Moves:/i)).toBeDefined();
    expect(screen.getByText(/Time:/i)).toBeDefined();
  });

  it('renderiza la página de Privacy Policy en /privacy-policy', () => {
    navigateTo('/privacy-policy');
    render(<App />);
    expect(screen.getAllByText(/Privacy Policy/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText((content) => content.includes('without registration or login')).length).toBeGreaterThan(0);
  });

  it('renderiza la página de Contact en /contact', () => {
    navigateTo('/contact');
    render(<App />);
    expect(screen.getAllByText(/Contact/i).length).toBeGreaterThan(0);
  });

  it('una ruta desconocida renderiza la página 404 (NotFound) con enlace de retorno', () => {
    navigateTo('/ruta-que-no-existe');
    render(<App />);
    expect(screen.getByText('404')).toBeDefined();
    expect(screen.getByText('Page Not Found')).toBeDefined();
    expect(screen.getByText(/Back to Solitaire/i)).toBeDefined();
  });

  it('el footer contiene enlaces a Privacy Policy y Contact con rutas limpias', () => {
    navigateTo('/');
    render(<App />);
    const privacyLink = screen.getByText('Privacy Policy').closest('a');
    expect(privacyLink).toHaveAttribute('href', '/privacy-policy');
    const contactLink = screen.getByText('Contact').closest('a');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('el sitio no depende de autenticación: no hay ruta de login', () => {
    navigateTo('/');
    render(<App />);
    // La app no expone ningún enlace/ruta de login/registro en el footer ni en la página principal
    expect(screen.queryByText(/Log in/i)).toBeNull();
    expect(screen.queryByText(/Create your account/i)).toBeNull();
  });

  it('actualiza canonical y robots correctamente en páginas indexables y 404', () => {
    navigateTo('/privacy-policy');
    render(<App />);
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe('https://topsolitaire.online/privacy-policy');
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute('content')).toBe('index, follow');
  });

  it('asigna noindex en rutas 404', () => {
    navigateTo('/pagina-inexistente-xyz');
    render(<App />);
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute('content')).toBe('noindex, nofollow');
  });

  it('renderiza rutas localizadas por idioma (ej: /es) y genera tags hreflang', () => {
    navigateTo('/es');
    render(<App />);
    expect(document.documentElement.lang).toBe('es');
    expect(document.documentElement.getAttribute('data-lang')).toBe('es');
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe('https://topsolitaire.online/es');
    
    // Verificar hreflang tags
    const hreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    expect(hreflangs.length).toBeGreaterThanOrEqual(9); // 8 idiomas + x-default
    const xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    expect(xDefault?.getAttribute('href')).toBe('https://topsolitaire.online/');
  });

  it('renderiza subpáginas localizadas (ej: /fr/privacy-policy) y actualiza enlace de retorno', () => {
    navigateTo('/fr/privacy-policy');
    render(<App />);
    const backLink = screen.getByText('← Back to Solitaire').closest('a');
    expect(backLink).toHaveAttribute('href', '/fr');
  });

  it('en la home localizada (ej: /fr) el footer contiene enlaces en el idioma activo', () => {
    navigateTo('/fr');
    render(<App />);
    const privacyLink = screen.getByText('Politique de confidentialité').closest('a');
    expect(privacyLink).toHaveAttribute('href', '/fr/privacy-policy');
    const contactLink = screen.getByText('Contact').closest('a');
    expect(contactLink).toHaveAttribute('href', '/fr/contact');
  });

  it('un prefijo de idioma inválido (ej: /invalido-lang/privacy-policy) cae en 404', () => {
    navigateTo('/invalido-lang/privacy-policy');
    render(<App />);
    expect(screen.getByText('404')).toBeDefined();
    expect(screen.getByText('Page Not Found')).toBeDefined();
  });
});

describe('App - P6: estructura de headings', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
  });

  afterEach(async () => {
    cleanup();
    window.history.pushState({}, '', '/');
    await i18n.changeLanguage('en');
  });

  it.each([
    ['/', 'Play Solitaire Online Free'],
    ['/privacy-policy', 'Privacy Policy'],
    ['/contact', 'Contact'],
    ['/ruta-que-no-existe', 'Page Not Found'],
  ])('renderiza un único H1 semántico en %s', (path, expectedHeading) => {
    navigateTo(path);
    render(<App />);

    const headings = document.querySelectorAll('h1');
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(expectedHeading);
  });

  it('mantiene el H1 de la home localizado y ligado a la intención de búsqueda', () => {
    navigateTo('/es');
    render(<App />);

    const headings = document.querySelectorAll('h1');
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Jugar Solitario Online Gratis');
  });

  it('usa H2 solo como subsecciones de Privacy Policy, después del H1', () => {
    navigateTo('/privacy-policy');
    render(<App />);

    const headingLevels = Array.from(document.querySelectorAll('h1, h2, h3'))
      .map((heading) => Number(heading.tagName.slice(1)));

    expect(headingLevels[0]).toBe(1);
    expect(headingLevels.slice(1)).toEqual(Array(7).fill(2));
  });
});

describe('App - P5: Meta Tags y Document Head', () => {
  beforeEach(async () => {
    // Resetear idioma a inglés para evitar bleeding entre tests
    await i18n.changeLanguage('en');
  });
  afterEach(() => {
    cleanup();
    window.history.pushState({}, '', '/');
  });

  it('og:site_name es "Top Solitaire" en la home', () => {
    navigateTo('/');
    render(<App />);
    const ogSiteName = document.querySelector('meta[property="og:site_name"]');
    expect(ogSiteName?.getAttribute('content')).toBe('Top Solitaire');
  });

  it('og:image apunta a la imagen correcta en todas las páginas', () => {
    navigateTo('/');
    render(<App />);
    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogImage?.getAttribute('content')).toBe('https://topsolitaire.online/images/og-image.jpg');
  });

  it('og:locale es "en_US" por defecto en la home (idioma inglés)', () => {
    navigateTo('/');
    render(<App />);
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    expect(ogLocale?.getAttribute('content')).toBe('en_US');
  });

  it('og:locale es "es_ES" en la ruta /es', () => {
    navigateTo('/es');
    render(<App />);
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    expect(ogLocale?.getAttribute('content')).toBe('es_ES');
  });

  it('og:locale es "fr_FR" en la ruta /fr', () => {
    navigateTo('/fr');
    render(<App />);
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    expect(ogLocale?.getAttribute('content')).toBe('fr_FR');
  });

  it('og:title en privacy-policy (en inglés) contiene "Privacy Policy"', () => {
    // idioma reseteado a 'en' en beforeEach
    navigateTo('/privacy-policy');
    render(<App />);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    // En inglés: t('footer.privacy') = "Privacy Policy"
    expect(ogTitle?.getAttribute('content')).toContain('Privacy');
  });

  it('sincroniza title and description for a localized internal page', () => {
    navigateTo('/es/privacy-policy');
    render(<App />);
    const description = document.querySelector('meta[name="description"]');

    expect(document.title).toBe('Política de Privacidad - Top Solitaire');
    expect(description?.getAttribute('content')).toContain('Política de Privacidad');
    expect(description?.getAttribute('content')).toContain('Juega al clásico Klondike Solitario');
  });

  it('og:url coincide con la canonical URL de la página actual', () => {
    navigateTo('/contact');
    render(<App />);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    expect(ogUrl?.getAttribute('content')).toBe('https://topsolitaire.online/contact');
  });

  it('twitter:card está presente y es summary_large_image', () => {
    navigateTo('/');
    render(<App />);
    const twCard = document.querySelector('meta[name="twitter:card"]');
    expect(twCard?.getAttribute('content')).toBe('summary_large_image');
  });

  it('twitter:title se sincroniza con el título de la página', () => {
    navigateTo('/');
    render(<App />);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    expect(twTitle?.getAttribute('content')).toBeTruthy();
    expect(twTitle?.getAttribute('content')).toContain('Solitaire');
  });

  it('twitter:image apunta a la imagen correcta', () => {
    navigateTo('/');
    render(<App />);
    const twImage = document.querySelector('meta[name="twitter:image"]');
    expect(twImage?.getAttribute('content')).toBe('https://topsolitaire.online/images/og-image.jpg');
  });

  it('conserva los metadatos estáticos de plataforma requeridos', () => {
    const indexHtml = readProjectFile('../index.html');
    const manifest = JSON.parse(readProjectFile('../public/manifest.json'));

    expect(indexHtml).toContain('<meta name="viewport" content="width=device-width, initial-scale=1.0" />');
    expect(indexHtml).toContain('<meta name="theme-color" content="#065f46" />');
    expect(indexHtml).toContain('<link rel="manifest" href="/manifest.json" />');
    expect(indexHtml).toContain('<link rel="icon" type="image/x-icon" href="/favicon.ico" />');
    expect(manifest.name).toBe('Top Solitaire');
    expect(manifest.short_name).toBe('Top Solitaire');
  });

  it('Schema.org JSON-LD es inyectado dinámicamente con "Top Solitaire"', () => {
    navigateTo('/');
    render(<App />);
    // El JSON-LD es inyectado por useDocumentMeta en el head del documento
    const ldJsonAll = document.querySelectorAll('script[type="application/ld+json"]');
    expect(ldJsonAll.length).toBeGreaterThan(0);
    const combinedContent = Array.from(ldJsonAll).map(s => s.textContent).join('');
    expect(combinedContent).toContain('Top Solitaire');
    expect(combinedContent).toContain('topsolitaire.online');
  });

  it('Schema.org incluye WebApplication con applicationCategory GameApplication', () => {
    navigateTo('/');
    render(<App />);
    const ldJsonAll = document.querySelectorAll('script[type="application/ld+json"]');
    const combinedContent = Array.from(ldJsonAll).map(s => s.textContent).join('');
    expect(combinedContent).toContain('WebApplication');
    expect(combinedContent).toContain('GameApplication');
  });
});
