import AsyncStorage from '@react-native-async-storage/async-storage';

export function isNightTime(): boolean {
  const hour = new Date().getHours();
  return hour >= 21 || hour < 6;
}

export function isMorningTime(): boolean {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 12;
}

export async function autoSelectTheme(): Promise<string> {
  const userTheme = await AsyncStorage.getItem('theme');
  const autoMode = await AsyncStorage.getItem('auto_theme');
  if (autoMode !== 'true') return userTheme || 'dark_blue';
  const hour = new Date().getHours();
  if (hour >= 21 || hour < 6) return 'dark';
  if (hour >= 6 && hour < 12) return 'light';
  if (hour >= 18) return 'sunset';
  return userTheme || 'dark_blue';
}

export async function setAutoTheme(enabled: boolean) {
  await AsyncStorage.setItem('auto_theme', enabled.toString());
}

export async function isAutoThemeEnabled(): Promise<boolean> {
  const val = await AsyncStorage.getItem('auto_theme');
  return val === 'true';
}
