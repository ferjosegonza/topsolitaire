import { describe, it, expect } from 'vitest';

describe('Configuración de tests', () => {
  it('verifica que el entorno jsdom funciona', () => {
    expect(typeof window).toBe('object');
    expect(typeof document).toBe('object');
  });

  it('verifica que el mock de matchMedia funciona', () => {
    // ✅ Verificar que matchMedia existe
    expect(window.matchMedia).toBeDefined();
    expect(typeof window.matchMedia).toBe('function');
    
    // ✅ Verificar que funciona
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    expect(mediaQuery).toBeDefined();
    expect(mediaQuery.matches).toBe(false);
  });

  it('verifica que el mock de adsbygoogle funciona', () => {
    expect(window.adsbygoogle).toBeDefined();
    expect(Array.isArray(window.adsbygoogle)).toBe(true);
  });
});