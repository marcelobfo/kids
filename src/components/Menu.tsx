import { motion } from 'motion/react';
import { BookOpen, Calculator, Gamepad2, Settings, Plus, Type } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface MenuProps {
  onSelectModule: (module: 'alphabet' | 'numbers' | 'quiz' | 'math' | 'words' | 'settings') => void;
}

export default function Menu({ onSelectModule }: MenuProps) {
  const { userName } = useApp();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-purple-200 p-4 relative">
      <button 
        onClick={() => onSelectModule('settings')}
        className="absolute top-4 right-4 bg-white/50 p-3 rounded-full hover:bg-white transition-colors"
      >
        <Settings size={32} className="text-gray-700" />
      </button>

      <motion.h1 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-4xl md:text-6xl font-black text-white drop-shadow-lg mb-4 text-center"
      >
        Aprender Brincando
      </motion.h1>

      {userName && (
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl md:text-3xl font-bold text-white mb-8"
        >
          Olá, {userName}! 👋
        </motion.h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectModule('alphabet')}
          className="bg-white rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center gap-4 border-b-8 border-blue-400 hover:bg-blue-50 transition-colors group"
        >
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <BookOpen size={40} className="text-blue-500" />
          </div>
          <span className="text-2xl font-bold text-gray-700">Alfabeto</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectModule('numbers')}
          className="bg-white rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center gap-4 border-b-8 border-green-400 hover:bg-green-50 transition-colors group"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
            <Calculator size={40} className="text-green-500" />
          </div>
          <span className="text-2xl font-bold text-gray-700">Números</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectModule('math')}
          className="bg-white rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center gap-4 border-b-8 border-yellow-400 hover:bg-yellow-50 transition-colors group"
        >
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
            <Plus size={40} className="text-yellow-500" />
          </div>
          <span className="text-2xl font-bold text-gray-700">Somar</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectModule('words')}
          className="bg-white rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center gap-4 border-b-8 border-pink-400 hover:bg-pink-50 transition-colors group"
        >
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-200 transition-colors">
            <Type size={40} className="text-pink-500" />
          </div>
          <span className="text-2xl font-bold text-gray-700">Palavras</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectModule('quiz')}
          className="bg-white rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center gap-4 border-b-8 border-purple-400 hover:bg-purple-50 transition-colors group sm:col-span-2 lg:col-span-1"
        >
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
            <Gamepad2 size={40} className="text-purple-500" />
          </div>
          <span className="text-2xl font-bold text-gray-700">Quiz</span>
        </motion.button>
      </div>
    </div>
  );
}
