import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { useSoundEffects } from '../src/hooks/useSoundEffects';

// Mock de useSound
vi.mock('use-sound', () => ({
  default: () => [vi.fn(), { soundEnabled: true }]
}));

describe('Sistema de Sonidos', () => {
  it('el hook useSoundEffects se puede usar', () => {
    const TestComponent = () => {
      const { isMuted, toggleMute } = useSoundEffects();
      return (
        <div>
          <span data-testid="mute-status">{isMuted ? 'Muted' : 'Unmuted'}</span>
          <button onClick={toggleMute}>Toggle Mute</button>
        </div>
      );
    };
    
    render(<TestComponent />);
    expect(screen.getByTestId('mute-status')).toHaveTextContent('Unmuted');
    
    fireEvent.click(screen.getByText('Toggle Mute'));
    expect(screen.getByTestId('mute-status')).toHaveTextContent('Muted');
  });
});