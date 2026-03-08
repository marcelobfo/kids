export const speak = (text: string, gender: 'male' | 'female' = 'female') => {
  if (!window.speechSynthesis) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';

  // Get available voices
  const voices = window.speechSynthesis.getVoices();
  
  // Try to find a voice matching the gender preference
  // Note: Voice names are browser/OS dependent. This is a best-effort heuristic.
  let selectedVoice = voices.find(voice => voice.lang.includes('pt-BR'));

  if (gender === 'male') {
    // Look for male-sounding names or specific Google voices if available
    const maleVoice = voices.find(v => 
      v.lang.includes('pt-BR') && 
      (v.name.toLowerCase().includes('male') || v.name.includes('Daniel') || v.name.includes('Felipe'))
    );
    if (maleVoice) selectedVoice = maleVoice;
  } else {
    // Look for female-sounding names
    const femaleVoice = voices.find(v => 
      v.lang.includes('pt-BR') && 
      (v.name.toLowerCase().includes('female') || v.name.includes('Luciana') || v.name.includes('Fernanda') || v.name.includes('Google português do Brasil'))
    );
    if (femaleVoice) selectedVoice = femaleVoice;
  }

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  // Adjust pitch slightly based on gender if exact voice not found
  if (gender === 'male') {
    utterance.pitch = 0.9;
    utterance.rate = 0.9;
  } else {
    utterance.pitch = 1.1;
    utterance.rate = 1.0;
  }

  window.speechSynthesis.speak(utterance);
};
