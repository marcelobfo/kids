import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle, XCircle, RefreshCw, Plus, Equal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { speak } from '../utils/speech';
import confetti from 'canvas-confetti';

interface MathModuleProps {
  onBack: () => void;
}

type Difficulty = 'simple' | 'tens' | 'mixed';

export default function MathModule({ onBack }: MathModuleProps) {
  const { voiceGender } = useApp();
  const [difficulty, setDifficulty] = useState<Difficulty>('simple');
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const generateProblem = () => {
    let n1, n2;
    if (difficulty === 'simple') {
      n1 = Math.floor(Math.random() * 10) + 1;
      n2 = Math.floor(Math.random() * 10) + 1;
    } else if (difficulty === 'tens') {
      n1 = (Math.floor(Math.random() * 9) + 1) * 10;
      n2 = (Math.floor(Math.random() * 9) + 1) * 10;
    } else {
      n1 = (Math.floor(Math.random() * 9) + 1) * 10;
      n2 = Math.floor(Math.random() * 9) + 1;
    }

    const answer = n1 + n2;
    const opts = new Set<number>();
    opts.add(answer);
    while (opts.size < 3) {
      let wrong = answer + (Math.floor(Math.random() * 20) - 10);
      if (wrong > 0 && wrong !== answer) opts.add(wrong);
    }

    setNum1(n1);
    setNum2(n2);
    setOptions(Array.from(opts).sort(() => Math.random() - 0.5));
    setSelectedOption(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    generateProblem();
  }, [difficulty]);

  const handleOptionClick = (option: number) => {
    if (selectedOption !== null) return;

    setSelectedOption(option);
    const correct = option === (num1 + num2);
    setIsCorrect(correct);

    if (correct) {
      setScore(s => s + 1);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      speak("Muito bem!", voiceGender);
    } else {
      speak("Tente novamente!", voiceGender);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex items-center justify-between mb-8">
        <button onClick={onBack} className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft size={32} className="text-yellow-600" />
        </button>
        <h1 className="text-4xl font-bold text-yellow-600">Somar</h1>
        <div className="bg-white px-4 py-2 rounded-full shadow-md font-bold text-yellow-600">
          Pontos: {score}
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setDifficulty('simple')}
          className={`px-4 py-2 rounded-full font-bold transition-colors ${difficulty === 'simple' ? 'bg-yellow-500 text-white' : 'bg-white text-yellow-500'}`}
        >
          Simples
        </button>
        <button 
          onClick={() => setDifficulty('tens')}
          className={`px-4 py-2 rounded-full font-bold transition-colors ${difficulty === 'tens' ? 'bg-yellow-500 text-white' : 'bg-white text-yellow-500'}`}
        >
          Dezenas
        </button>
        <button 
          onClick={() => setDifficulty('mixed')}
          className={`px-4 py-2 rounded-full font-bold transition-colors ${difficulty === 'mixed' ? 'bg-yellow-500 text-white' : 'bg-white text-yellow-500'}`}
        >
          Misto
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 text-center flex flex-col items-center">
        <div className="flex items-center justify-center gap-4 text-6xl md:text-8xl font-black text-gray-800 mb-12">
          <span className="text-blue-500">{num1}</span>
          <Plus size={48} className="text-gray-400" />
          <span className="text-green-500">{num2}</span>
          <Equal size={48} className="text-gray-400" />
          <span className="text-purple-500">?</span>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-8 w-full">
          {options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOptionClick(option)}
              className={`
                aspect-square rounded-2xl text-4xl md:text-6xl font-bold shadow-md border-b-4 transition-colors
                ${selectedOption === option 
                  ? (isCorrect ? 'bg-green-500 border-green-700 text-white' : 'bg-red-500 border-red-700 text-white')
                  : 'bg-yellow-100 border-yellow-300 text-yellow-600 hover:bg-yellow-200'}
              `}
              disabled={selectedOption !== null}
            >
              {option}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selectedOption !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex flex-col items-center"
            >
              {isCorrect ? (
                <div className="flex items-center gap-2 text-green-600 text-2xl font-bold mb-4">
                  <CheckCircle size={32} />
                  <span>Muito bem!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-500 text-2xl font-bold mb-4">
                  <XCircle size={32} />
                  <span>Tente novamente!</span>
                </div>
              )}
              
              <button
                onClick={generateProblem}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-bold text-xl shadow-lg flex items-center gap-2 transition-transform active:scale-95"
              >
                <RefreshCw /> Próxima
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
