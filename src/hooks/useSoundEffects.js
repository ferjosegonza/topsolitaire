import useSound from 'use-sound';
import { useCallback, useState } from 'react';

const SOUND_BASE_PATH = '/sounds/';

export function useSoundEffects() {
  const [isMuted, setIsMuted] = useState(false);

  // Cargar todos los sonidos
  const [playFlip] = useSound(`${SOUND_BASE_PATH}card-flip.mp3`, { 
    volume: 0.3,
    soundEnabled: !isMuted
  });
  
  const [playPlace] = useSound(`${SOUND_BASE_PATH}card-place.mp3`, { 
    volume: 0.25,
    soundEnabled: !isMuted
  });
  
  const [playDeal] = useSound(`${SOUND_BASE_PATH}deal.mp3`, { 
    volume: 0.2,
    soundEnabled: !isMuted
  });
  
  const [playWin] = useSound(`${SOUND_BASE_PATH}win.mp3`, { 
    volume: 0.4,
    soundEnabled: !isMuted
  });
  
  const [playClick] = useSound(`${SOUND_BASE_PATH}click.mp3`, { 
    volume: 0.15,
    soundEnabled: !isMuted
  });

  // Función para alternar mute
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  // Funciones para reproducir sonidos (con verificación de mute)
  const playFlipSound = useCallback(() => {
    if (!isMuted) playFlip();
  }, [isMuted, playFlip]);

  const playPlaceSound = useCallback(() => {
    if (!isMuted) playPlace();
  }, [isMuted, playPlace]);

  const playDealSound = useCallback(() => {
    if (!isMuted) playDeal();
  }, [isMuted, playDeal]);

  const playWinSound = useCallback(() => {
    if (!isMuted) playWin();
  }, [isMuted, playWin]);

  const playClickSound = useCallback(() => {
    if (!isMuted) playClick();
  }, [isMuted, playClick]);

  return {
    isMuted,
    toggleMute,
    playFlipSound,
    playPlaceSound,
    playDealSound,
    playWinSound,
    playClickSound,
  };
}