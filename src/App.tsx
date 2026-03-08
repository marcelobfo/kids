/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Menu from './components/Menu';
import AlphabetModule from './components/AlphabetModule';
import NumbersModule from './components/NumbersModule';
import QuizModule from './components/QuizModule';
import MathModule from './components/MathModule';
import WordBuilderModule from './components/WordBuilderModule';
import SettingsModule from './components/SettingsModule';
import { AppProvider } from './context/AppContext';

type View = 'menu' | 'alphabet' | 'numbers' | 'quiz' | 'math' | 'words' | 'settings';

function Main() {
  const [currentView, setCurrentView] = useState<View>('menu');

  const handleSelectModule = (module: View) => {
    setCurrentView(module);
  };

  const handleBack = () => {
    setCurrentView('menu');
  };

  return (
    <div className="font-sans text-gray-900 antialiased">
      {currentView === 'menu' && <Menu onSelectModule={handleSelectModule} />}
      {currentView === 'alphabet' && <AlphabetModule onBack={handleBack} />}
      {currentView === 'numbers' && <NumbersModule onBack={handleBack} />}
      {currentView === 'quiz' && <QuizModule onBack={handleBack} />}
      {currentView === 'math' && <MathModule onBack={handleBack} />}
      {currentView === 'words' && <WordBuilderModule onBack={handleBack} />}
      {currentView === 'settings' && <SettingsModule onBack={handleBack} />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}
