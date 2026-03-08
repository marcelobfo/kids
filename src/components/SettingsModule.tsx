import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, Mic } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SettingsModuleProps {
  onBack: () => void;
}

export default function SettingsModule({ onBack }: SettingsModuleProps) {
  const { userName, setUserName, voiceGender, setVoiceGender } = useApp();
  const [tempName, setTempName] = useState(userName);

  const handleSave = () => {
    setUserName(tempName);
    onBack();
  };

  return (
    <div className="min-h-screen bg-orange-50 p-4 flex flex-col items-center justify-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full border-b-8 border-orange-200"
      >
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h2 className="text-3xl font-bold text-orange-500">Configurações</h2>
          <div className="w-10"></div>
        </div>

        <div className="space-y-8">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 font-bold mb-2 flex items-center gap-2">
              <User size={20} />
              Seu Nome
            </label>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Digite seu nome..."
              className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:outline-none text-lg"
            />
          </div>

          {/* Voice Selection */}
          <div>
            <label className="block text-gray-700 font-bold mb-4 flex items-center gap-2">
              <Mic size={20} />
              Voz do Narrador
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setVoiceGender('female')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                  voiceGender === 'female' 
                    ? 'border-pink-500 bg-pink-50 text-pink-600' 
                    : 'border-gray-200 text-gray-400 hover:border-pink-200'
                }`}
              >
                <span className="text-4xl">👩</span>
                <span className="font-bold">Mulher</span>
              </button>
              
              <button
                onClick={() => setVoiceGender('male')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                  voiceGender === 'male' 
                    ? 'border-blue-500 bg-blue-50 text-blue-600' 
                    : 'border-gray-200 text-gray-400 hover:border-blue-200'
                }`}
              >
                <span className="text-4xl">👨</span>
                <span className="font-bold">Homem</span>
              </button>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg transform transition active:scale-95 text-xl"
          >
            Salvar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
