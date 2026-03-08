import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { alphabetData, numbersData } from '../data';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { speak } from '../utils/speech';

interface QuizModuleProps {
  onBack: () => void;
}

type QuestionType = 'letter' | 'number';

interface Question {
  type: QuestionType;
  target: string | number;
  options: (string | number)[];
  prompt: string;
}

export default function QuizModule({ onBack }: QuizModuleProps) {
  const { voiceGender } = useApp();
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const generateQuestion = () => {
    const type = Math.random() > 0.5 ? 'letter' : 'number';
    let target: string | number;
    let options: (string | number)[] = [];
    let prompt = '';

    if (type === 'letter') {
      const item = alphabetData[Math.floor(Math.random() * alphabetData.length)];
      target = item.letter;
      prompt = `Onde está a letra ${target}?`;
      
      // Generate 2 wrong options
      while (options.length < 2) {
        const randomLetter = alphabetData[Math.floor(Math.random() * alphabetData.length)].letter;
        if (randomLetter !== target && !options.includes(randomLetter)) {
          options.push(randomLetter);
        }
      }
    } else {
      const item = numbersData[Math.floor(Math.random() * numbersData.length)];
      target = item.number;
      prompt = `Qual é o número ${target}?`;

      // Generate 2 wrong options
      while (options.length < 2) {
        const randomNumber = numbersData[Math.floor(Math.random() * numbersData.length)].number;
        if (randomNumber !== target && !options.includes(randomNumber)) {
          options.push(randomNumber);
        }
      }
    }

    options.push(target);
    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    setQuestion({ type, target, options, prompt });
    setSelectedOption(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleOptionClick = (option: string | number) => {
    if (selectedOption !== null) return; // Prevent multiple clicks

    setSelectedOption(option);
    const correct = option === question?.target;
    setIsCorrect(correct);

    if (correct) {
      setScore(s => s + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      speak("Muito bem!", voiceGender);
    } else {
      speak("Tente novamente!", voiceGender);
    }
  };

  const nextQuestion = () => {
    generateQuestion();
  };

  if (!question) return <div>Carregando...</div>;

  return (
    <div className="min-h-screen bg-purple-50 p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={32} className="text-purple-500" />
        </button>
        <h1 className="text-4xl font-bold text-purple-600">Quiz</h1>
        <div className="bg-white px-4 py-2 rounded-full shadow-md font-bold text-purple-600">
          Pontos: {score}
        </div>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-12">{question.prompt}</h2>

        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOptionClick(option)}
              className={`
                aspect-square rounded-2xl text-4xl md:text-6xl font-bold shadow-md border-b-4 transition-colors
                ${selectedOption === option 
                  ? (isCorrect ? 'bg-green-500 border-green-700 text-white' : 'bg-red-500 border-red-700 text-white')
                  : 'bg-blue-100 border-blue-300 text-blue-600 hover:bg-blue-200'}
                ${selectedOption !== null && option === question.target && !isCorrect ? 'bg-green-500 border-green-700 text-white ring-4 ring-green-300' : ''}
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
                onClick={nextQuestion}
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-bold text-xl shadow-lg flex items-center gap-2 transition-transform active:scale-95"
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
