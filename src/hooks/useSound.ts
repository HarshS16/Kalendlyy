import { useCallback } from 'react';

// Web Audio API based sound effects
const createOscillator = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
    
    return audioContext;
  } catch (error) {
    console.warn('Web Audio API not supported:', error);
    return null;
  }
};

export function useSound() {
  const playSuccess = useCallback(() => {
    // Pleasant success sound (C major chord)
    createOscillator(523.25, 0.2); // C5
    setTimeout(() => createOscillator(659.25, 0.2), 50); // E5
    setTimeout(() => createOscillator(783.99, 0.3), 100); // G5
  }, []);

  const playError = useCallback(() => {
    // Gentle error sound (descending notes)
    createOscillator(400, 0.15);
    setTimeout(() => createOscillator(350, 0.15), 100);
    setTimeout(() => createOscillator(300, 0.2), 200);
  }, []);

  const playInfo = useCallback(() => {
    // Soft notification sound
    createOscillator(800, 0.1);
    setTimeout(() => createOscillator(1000, 0.15), 80);
  }, []);

  const playClick = useCallback(() => {
    // Subtle click sound
    createOscillator(1200, 0.05, 'square');
  }, []);

  return {
    playSuccess,
    playError,
    playInfo,
    playClick
  };
}
