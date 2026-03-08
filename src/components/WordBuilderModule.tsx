import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle, XCircle, RefreshCw, Eraser } from 'lucide-react';
import { alphabetData } from '../data';
import { useApp } from '../context/AppContext';
import { speak } from '../utils/speech';
import confetti from 'canvas-confetti';

interface WordBuilderModuleProps {
  onBack: () => void;
}

export default function WordBuilderModule({ onBack }: WordBuilderModuleProps) {
  const { voiceGender } = useApp();
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [placedLetters, setPlacedLetters] = useState<(string | null)[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const generateWord = () => {
    const item = alphabetData[Math.floor(Math.random() * alphabetData.length)];
    const word = item.word.toUpperCase();
    const letters = word.split('');
    
    setCurrentWord(word);
    setScrambledLetters([...letters].sort(() => Math.random() - 0.5));
    setPlacedLetters(new Array(letters.length).fill(null));
    setIsCorrect(null);
  };

  useEffect(() => {
    generateWord();
  }, []);

  const handleLetterClick = (letter: string) => {
    if (isCorrect === true) return;

    // Find first empty slot
    const emptyIndex = placedLetters.findIndex(l => l === null);
    if (emptyIndex === -1) return;

    // Check if the clicked letter matches the expected letter at this position
    const expectedLetter = currentWord[emptyIndex];
    
    if (letter === expectedLetter) {
      const newPlaced = [...placedLetters];
      newPlaced[emptyIndex] = letter;
      setPlacedLetters(newPlaced);
      
      // Check if word is complete
      if (emptyIndex === currentWord.length - 1) {
        setIsCorrect(true);
        setScore(s => s + 1);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        speak(`Muito bem! ${currentWord}`, voiceGender);
      } else {
        // Encouraging sound or small effect?
        speak(letter, voiceGender);
      }
    } else {
      // Wrong letter feedback
      speak("Tente outra letra", voiceGender);
      // Optional: Shake animation on the clicked button (would require more complex state)
    }
  };

  const handleReset = () => {
    setPlacedLetters(new Array(currentWord.length).fill(null));
    setIsCorrect(null);
  };

  return (
    <div className="min-h-screen bg-pink-50 p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex items-center justify-between mb-8">
        <button onClick={onBack} className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft size={32} className="text-pink-600" />
        </button>
        <h1 className="text-4xl font-bold text-pink-600">Formar Palavras</h1>
        <div className="bg-white px-4 py-2 rounded-full shadow-md font-bold text-pink-600">
          Pontos: {score}
        </div>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 text-center flex flex-col items-center">
        
        {/* Image/Emoji */}
        <div className="text-9xl mb-8 animate-bounce-slow">
          {alphabetData.find(d => d.word.toUpperCase() === currentWord)?.emoji}
        </div>

        {/* Word Slots */}
        <div className="flex gap-2 mb-8 flex-wrap justify-center">
          {placedLetters.map((letter, index) => (
            <div 
              key={index}
              className={`w-12 h-16 md:w-16 md:h-20 border-b-4 flex items-center justify-center text-4xl font-bold
                ${letter ? 'border-pink-500 text-pink-600' : 'border-gray-300 bg-gray-100'}
                ${isCorrect === true ? 'border-green-500 text-green-600' : ''}
                ${isCorrect === false ? 'border-red-500 text-red-600' : ''}
              `}
            >
              {letter}
            </div>
          ))}
        </div>

        {/* Scrambled Letters */}
        <div className="flex gap-4 flex-wrap justify-center mb-8">
          {scrambledLetters.map((letter, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleLetterClick(letter)}
              // Simple disable logic: if we've placed more letters than this index, it might be used? 
              // No, that's not right. Let's just keep it simple: all letters clickable until full.
              // Ideally we'd track used indices but for a kid's app, simple is fine.
              // If they click 'A' and there are two 'A's, it just fills the next slot.
              className="w-14 h-14 md:w-16 md:h-16 bg-pink-100 rounded-xl shadow-md flex items-center justify-center text-3xl font-bold text-pink-600 border-b-4 border-pink-300 hover:bg-pink-200"
            >
              {letter}
            </motion.button>
          ))}
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleReset}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-full font-bold flex items-center gap-2"
          >
            <Eraser size={20} /> Limpar
          </button>
          
          {(isCorrect !== null) && (
            <button
              onClick={generateWord}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-bold text-xl shadow-lg flex items-center gap-2 transition-transform active:scale-95"
            >
              <RefreshCw /> Próxima
            </button>
          )}
        </div>

        {isCorrect === true && (
           <div className="mt-4 flex items-center gap-2 text-green-600 text-2xl font-bold">
             <CheckCircle size={32} />
             <span>Parabéns!</span>
           </div>
        )}
      </div>
    </div>
  );
}
