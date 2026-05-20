import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, database } from '../config/firebase';
import { ref, set, get } from 'firebase/database';

export async function autoBackup() {
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const chats = await AsyncStorage.getItem('chats');
    const memory = await AsyncStorage.getItem('ai_memory');
    const personality = await AsyncStorage.getItem('personality');
    const theme = await AsyncStorage.getItem('theme');

    await set(ref(database, `users/${uid}/backup`), {
      chats: chats ? JSON.parse(chats) : [],
      memory: memory ? JSON.parse(memory) : {},
      personality: personality || 'default',
      theme: theme || 'dark_blue',
      backupDate: Date.now(),
    });

    await AsyncStorage.setItem('last_backup', Date.now().toString());
  } catch (e) {
    console.error(e);
  }
}

export async function restoreBackup() {
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) return false;

    const snap = await get(ref(database, `users/${uid}/backup`));
    if (!snap.exists()) return false;

    const backup = snap.val();
    if (backup.chats) await AsyncStorage.setItem('chats', JSON.stringify(backup.chats));
    if (backup.memory) await AsyncStorage.setItem('ai_memory', JSON.stringify(backup.memory));
    if (backup.personality) await AsyncStorage.setItem('personality', backup.personality);
    if (backup.theme) await AsyncStorage.setItem('theme', backup.theme);

    return true;
  } catch {
    return false;
  }
}

export async function getLastBackupDate(): Promise<string> {
  const date = await AsyncStorage.getItem('last_backup');
  if (!date) return 'لم يتم عمل backup بعد';
  return new Date(parseInt(date)).toLocaleDateString('ar');
}
