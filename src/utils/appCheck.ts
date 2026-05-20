import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, database } from '../config/firebase';
import { ref, get } from 'firebase/database';

export async function runAppHealthCheck() {
  const results: string[] = [];

  try {
    const user = auth.currentUser;
    results.push(user ? '✅ Auth: مسجل دخول' : '⚠️ Auth: مش مسجل دخول');
  } catch {
    results.push('❌ Auth: مشكلة في Firebase Auth');
  }

  try {
    await get(ref(database, '.info/connected'));
    results.push('✅ Database: متصل');
  } catch {
    results.push('❌ Database: مشكلة في الاتصال');
  }

  try {
    await AsyncStorage.setItem('health_check', 'ok');
    const val = await AsyncStorage.getItem('health_check');
    results.push(val === 'ok' ? '✅ Storage: شغال' : '❌ Storage: مشكلة');
    await AsyncStorage.removeItem('health_check');
  } catch {
    results.push('❌ Storage: مشكلة في AsyncStorage');
  }

  return results;
}

export async function fixCommonIssues() {
  const memory = await AsyncStorage.getItem('ai_memory');
  if (!memory) {
    await AsyncStorage.setItem('ai_memory', JSON.stringify({
      facts: [], personality: '', lastUpdated: Date.now()
    }));
  }
  const personality = await AsyncStorage.getItem('personality');
  if (!personality) await AsyncStorage.setItem('personality', 'default');
  const chats = await AsyncStorage.getItem('chats');
  if (!chats) await AsyncStorage.setItem('chats', JSON.stringify([]));
}
