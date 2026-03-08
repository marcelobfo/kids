import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppContextType {
  userName: string;
  setUserName: (name: string) => void;
  voiceGender: 'male' | 'female';
  setVoiceGender: (gender: 'male' | 'female') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '');
  const [voiceGender, setVoiceGender] = useState<'male' | 'female'>(() => (localStorage.getItem('voiceGender') as 'male' | 'female') || 'female');

  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('voiceGender', voiceGender);
  }, [voiceGender]);

  return (
    <AppContext.Provider value={{ userName, setUserName, voiceGender, setVoiceGender }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
