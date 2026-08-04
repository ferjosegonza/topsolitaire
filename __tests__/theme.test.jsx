import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, useTheme } from '../src/lib/ThemeContext';
import ThemeToggle from '../src/components/ui/ThemeToggle';

// Componente de prueba que expone el estado del tema
function ThemeProbe() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  );
}

describe('ThemeContext + ThemeToggle (O1 - 3 modos)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.body.removeAttribute('data-theme');
  });

  it('usa "rainy" como tema por defecto', () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value').textContent).toBe('rainy');
  });

  it('toggleTheme cicla rainy → dark → light → rainy', () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value').textContent).toBe('rainy');

    fireEvent.click(screen.getByText('toggle'));
    expect(screen.getByTestId('theme-value').textContent).toBe('dark');

    fireEvent.click(screen.getByText('toggle'));
    expect(screen.getByTestId('theme-value').textContent).toBe('light');

    fireEvent.click(screen.getByText('toggle'));
    expect(screen.getByTestId('theme-value').textContent).toBe('rainy');
  });

  it('persiste el tema en localStorage', () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText('toggle'));
    expect(localStorage.getItem('topsolitaire-theme')).toBe('dark');
    fireEvent.click(screen.getByText('toggle'));
    expect(localStorage.getItem('topsolitaire-theme')).toBe('light');
  });

  it('recupera el tema guardado de localStorage al montar', () => {
    localStorage.setItem('topsolitaire-theme', 'light');
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value').textContent).toBe('light');
  });

  it('ignora valores no válidos en localStorage y usa rainy', () => {
    localStorage.setItem('topsolitaire-theme', 'verde');
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value').textContent).toBe('rainy');
  });

  it('aplica data-theme en html y body al cambiar', () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('rainy');
    expect(document.body.getAttribute('data-theme')).toBe('rainy');

    fireEvent.click(screen.getByText('toggle'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.body.getAttribute('data-theme')).toBe('dark');

    fireEvent.click(screen.getByText('toggle'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.body.getAttribute('data-theme')).toBe('light');
  });

  it('el ThemeToggle usa role="switch" y aria-checked coherente con rainy', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    const toggle = screen.getByRole('switch');
    // Por defecto rainy → aria-checked="true"
    expect(toggle.getAttribute('aria-checked')).toBe('true');
    // Al pasar a dark → false
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-checked')).toBe('false');
    // Al pasar a light → false
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-checked')).toBe('false');
    // Al volver a rainy → true
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-checked')).toBe('true');
  });
});

