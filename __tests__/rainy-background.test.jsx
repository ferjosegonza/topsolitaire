import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

const mockUseTheme = vi.fn();

vi.mock('../src/lib/ThemeContext', () => ({
  useTheme: () => mockUseTheme(),
}));

import RainyBackground from '../src/components/RainyBackground';

describe('RainyBackground (O3 - Fondo animado del Modo Lluvioso)', () => {
  it('no renderiza nada cuando el tema NO es rainy', () => {
    mockUseTheme.mockReturnValue({ theme: 'dark' });
    const { container } = render(<RainyBackground />);
    expect(container.querySelector('.rainy-layer')).toBeNull();

    mockUseTheme.mockReturnValue({ theme: 'light' });
    const { container: c2 } = render(<RainyBackground />);
    expect(c2.querySelector('.rainy-layer')).toBeNull();
  });

  it('renderiza el fondo lluvioso cuando el tema es rainy', () => {
    mockUseTheme.mockReturnValue({ theme: 'rainy' });
    const { container } = render(<RainyBackground />);

    const layer = container.querySelector('.rainy-layer');
    expect(layer).not.toBeNull();

    // Lluvia: al menos unas gotas
    expect(container.querySelectorAll('.rainy-drop').length).toBeGreaterThan(0);

    // Niebla
    expect(container.querySelector('.rainy-fog')).not.toBeNull();

    // Nubes
    expect(container.querySelector('.rainy-cloud')).not.toBeNull();
  });

  it('la capa es aria-hidden y no captura eventos', () => {
    mockUseTheme.mockReturnValue({ theme: 'rainy' });
    const { container } = render(<RainyBackground />);

    const layer = container.querySelector('.rainy-layer');
    expect(layer.getAttribute('aria-hidden')).toBe('true');
    // pointer-events none se aplica vía CSS (clase .rainy-layer)
    expect(layer.className).toContain('rainy-layer');
  });
});

