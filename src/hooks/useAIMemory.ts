import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase';
import { database } from '../config/firebase';
import { ref, set, get } from 'firebase/database';

export interface Memory {
  facts: string[];
  personality: string;
  lastUpdated: number;
}

export async function saveMemory(memory: Memory) {
  const uid = auth.currentUser?.uid;
  if (uid) {
    await set(ref(database, `users/${uid}/memory`), memory);
  }
  await AsyncStorage.setItem('ai_memory', JSON.stringify(memory));
}

export async function loadMemory(): Promise<Memory> {
  try {
    const uid = auth.currentUser?.uid;
    if (uid) {
      const snap = await get(ref(database, `users/${uid}/memory`));
      if (snap.exists()) return snap.val();
    }
  } catch {}
  const local = await AsyncStorage.getItem('ai_memory');
  if (local) return JSON.parse(local);
  return { facts: [], personality: '', lastUpdated: Date.now() };
}

export async function extractAndSaveMemory(messages: any[]) {
  const memory = await loadMemory();
  const lastMessages = messages.slice(-10);
  
  lastMessages.forEach(msg => {
    if (msg.role === 'user') {
      if (msg.content.includes('اسمي')) {
        const name = msg.content.split('اسمي')[1]?.trim().split(' ')[0];
        if (name && !memory.facts.includes(`اسم المستخدم: ${name}`)) {
          memory.facts.push(`اسم المستخدم: ${name}`);
        }
      }
      if (msg.content.includes('أنا من') || msg.content.includes('انا من')) {
        const place = msg.content.split('من')[1]?.trim().split(' ')[0];
        if (place && !memory.facts.includes(`من: ${place}`)) {
          memory.facts.push(`من: ${place}`);
        }
      }
      if (msg.content.includes('أحب') || msg.content.includes('بحب')) {
        const thing = msg.content.split(/أحب|بحب/)[1]?.trim().split(' ')[0];
        if (thing && !memory.facts.includes(`يحب: ${thing}`)) {
          memory.facts.push(`يحب: ${thing}`);
        }
      }
    }
  });

  memory.facts = memory.facts.slice(-20);
  memory.lastUpdated = Date.now();
  await saveMemory(memory);
  return memory;
}

export function buildMemoryPrompt(memory: Memory): string {
  if (!memory.facts.length) return '';
  return `\n\nمعلومات تعرفها عن المستخدم:\n${memory.facts.join('\n')}`;
}
