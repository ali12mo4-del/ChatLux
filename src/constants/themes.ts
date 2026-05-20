export interface Theme {
  id: string;
  name: string;
  emoji: string;
  bg: string;
  surface: string;
  primary: string;
  text: string;
  subtext: string;
}

export const THEMES: Theme[] = [
  {
    id: 'dark_blue',
    name: 'أزرق داكن',
    emoji: '🌊',
    bg: '#0a0f1e',
    surface: '#1a2035',
    primary: '#4fc3f7',
    text: '#ffffff',
    subtext: '#888888',
  },
  {
    id: 'dark',
    name: 'أسود',
    emoji: '🌑',
    bg: '#000000',
    surface: '#1a1a1a',
    primary: '#bb86fc',
    text: '#ffffff',
    subtext: '#888888',
  },
  {
    id: 'green',
    name: 'أخضر',
    emoji: '🌿',
    bg: '#0a1a0f',
    surface: '#1a2f1a',
    primary: '#4caf50',
    text: '#ffffff',
    subtext: '#888888',
  },
  {
    id: 'purple',
    name: 'بنفسجي',
    emoji: '🔮',
    bg: '#0f0a1e',
    surface: '#1e1535',
    primary: '#9c27b0',
    text: '#ffffff',
    subtext: '#888888',
  },
  {
    id: 'sunset',
    name: 'غروب',
    emoji: '🌅',
    bg: '#1a0a0a',
    surface: '#2d1515',
    primary: '#ff7043',
    text: '#ffffff',
    subtext: '#888888',
  },
];

export const DEFAULT_THEME = THEMES[0];

export const LIGHT_THEME = {
  id: 'light',
  name: 'فاتح',
  emoji: '☀️',
  bg: '#f5f5f5',
  surface: '#ffffff',
  primary: '#1976d2',
  text: '#000000',
  subtext: '#666666',
};
