
export interface LetterData {
  letter: string;
  word: string;
  emoji: string;
  color: string;
}

export interface NumberData {
  number: number;
  word: string;
  emoji: string;
  color: string;
}

export const alphabetData: LetterData[] = [
  { letter: 'A', word: 'Abelha', emoji: '🐝', color: 'bg-yellow-400' },
  { letter: 'B', word: 'Bola', emoji: '⚽', color: 'bg-blue-400' },
  { letter: 'C', word: 'Casa', emoji: '🏠', color: 'bg-red-400' },
  { letter: 'D', word: 'Dado', emoji: '🎲', color: 'bg-green-400' },
  { letter: 'E', word: 'Elefante', emoji: '🐘', color: 'bg-gray-400' },
  { letter: 'F', word: 'Flor', emoji: '🌸', color: 'bg-pink-400' },
  { letter: 'G', word: 'Gato', emoji: '🐱', color: 'bg-orange-400' },
  { letter: 'H', word: 'Hipopótamo', emoji: '🦛', color: 'bg-purple-400' },
  { letter: 'I', word: 'Ilha', emoji: '🏝️', color: 'bg-teal-400' },
  { letter: 'J', word: 'Jacaré', emoji: '🐊', color: 'bg-green-600' },
  { letter: 'K', word: 'Kiwi', emoji: '🥝', color: 'bg-lime-500' },
  { letter: 'L', word: 'Leão', emoji: '🦁', color: 'bg-yellow-600' },
  { letter: 'M', word: 'Macaco', emoji: '🐒', color: 'bg-amber-700' },
  { letter: 'N', word: 'Navio', emoji: '🚢', color: 'bg-blue-600' },
  { letter: 'O', word: 'Ovo', emoji: '🥚', color: 'bg-orange-200' },
  { letter: 'P', word: 'Pato', emoji: '🦆', color: 'bg-yellow-300' },
  { letter: 'Q', word: 'Queijo', emoji: '🧀', color: 'bg-yellow-200' },
  { letter: 'R', word: 'Rato', emoji: '🐁', color: 'bg-gray-300' },
  { letter: 'S', word: 'Sapo', emoji: '🐸', color: 'bg-green-500' },
  { letter: 'T', word: 'Tartaruga', emoji: '🐢', color: 'bg-emerald-600' },
  { letter: 'U', word: 'Uva', emoji: '🍇', color: 'bg-purple-600' },
  { letter: 'V', word: 'Vaca', emoji: '🐄', color: 'bg-neutral-200' },
  { letter: 'W', word: 'Wafer', emoji: '🧇', color: 'bg-amber-200' },
  { letter: 'X', word: 'Xícara', emoji: '☕', color: 'bg-rose-200' },
  { letter: 'Y', word: 'Yoga', emoji: '🧘', color: 'bg-indigo-300' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓', color: 'bg-neutral-400' },
];

export const numbersData: NumberData[] = [
  { number: 1, word: 'Um', emoji: '🍎', color: 'bg-red-500' },
  { number: 2, word: 'Dois', emoji: '🦆', color: 'bg-yellow-500' },
  { number: 3, word: 'Três', emoji: '🎈', color: 'bg-blue-500' },
  { number: 4, word: 'Quatro', emoji: '🚗', color: 'bg-green-500' },
  { number: 5, word: 'Cinco', emoji: '⭐', color: 'bg-purple-500' },
  { number: 6, word: 'Seis', emoji: '🦋', color: 'bg-pink-500' },
  { number: 7, word: 'Sete', emoji: '🍦', color: 'bg-orange-500' },
  { number: 8, word: 'Oito', emoji: '🍪', color: 'bg-amber-600' },
  { number: 9, word: 'Nove', emoji: '🐠', color: 'bg-cyan-500' },
  { number: 10, word: 'Dez', emoji: '🖐️', color: 'bg-indigo-500' },
];
