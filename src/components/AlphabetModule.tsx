import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { alphabetData, LetterData } from '../data';
import { useApp } from '../context/AppContext';
import { speak } from '../utils/speech';

interface AlphabetModuleProps {
  onBack: () => void;
}

export default function AlphabetModule({ onBack }: AlphabetModuleProps) {
  const { voiceGender } = useApp();
  const [selectedLetter, setSelectedLetter] = useState<LetterData | null>(null);

  return (
    <div className="min-h-screen bg-blue-50 p-4 flex flex-col items-center">
      <div className="w-full max-w-6xl flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={32} className="text-blue-500" />
        </button>
        <h1 className="text-4xl font-bold text-blue-600">Alfabeto</h1>
        <div className="w-12"></div> {/* Spacer */}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full max-w-6xl">
        {alphabetData.map((item, index) => (
          <motion.button
            key={item.letter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedLetter(item);
              speak(item.letter, voiceGender);
            }}
            className={`${item.color} text-white rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center aspect-square border-b-4 border-black/20`}
          >
            <span className="text-6xl font-black drop-shadow-md">{item.letter}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`absolute top-0 left-0 right-0 h-32 ${selectedLetter.color}`}></div>
              
              <button 
                onClick={() => setSelectedLetter(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors z-10"
              >
                <ArrowLeft size={24} />
              </button>

              <div className="relative z-10 flex flex-col items-center pt-8">
                <div className="bg-white rounded-full p-6 shadow-xl mb-6 border-4 border-blue-100">
                  <span className="text-8xl font-black text-gray-800">{selectedLetter.letter}</span>
                </div>
                
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-gray-800 mb-2">{selectedLetter.word}</h2>
                  <div className="text-9xl my-4 animate-bounce-slow">{selectedLetter.emoji}</div>
                </div>

                <button
                  onClick={() => speak(`${selectedLetter.letter} de ${selectedLetter.word}`, voiceGender)}
                  className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-xl shadow-lg flex items-center gap-2 transition-transform active:scale-95"
                >
                  <Volume2 /> Ouvir
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
