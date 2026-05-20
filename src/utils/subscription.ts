import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, database } from '../config/firebase';
import { ref, set, get } from 'firebase/database';

export type PlanType = 'free' | 'pro' | 'premium';

export interface Plan {
  id: PlanType;
  name: string;
  emoji: string;
  price: string;
  features: string[];
  messagesPerDay: number;
  color: string;
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'مجاني',
    emoji: '🆓',
    price: 'مجاناً',
    color: '#888',
    messagesPerDay: 20,
    features: [
      '20 رسالة يومياً',
      'شخصية واحدة',
      'محادثات محدودة',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    emoji: '⭐',
    price: '$4.99/شهر',
    color: '#4fc3f7',
    messagesPerDay: 200,
    features: [
      '200 رسالة يومياً',
      'كل الشخصيات',
      'AI Memory كاملة',
      'تصدير PDF',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    emoji: '👑',
    price: '$9.99/شهر',
    color: '#ffd700',
    messagesPerDay: 999999,
    features: [
      'رسائل غير محدودة',
      'كل الشخصيات',
      'Image Generation',
      'Voice Chat',
      'أولوية في الدعم',
    ],
  },
];

export async function getUserPlan(): Promise<PlanType> {
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) return 'free';
    const snap = await get(ref(database, `users/${uid}/plan`));
    return snap.exists() ? snap.val() : 'free';
  } catch {
    return 'free';
  }
}

export async function checkDailyLimit(): Promise<boolean> {
  const plan = await getUserPlan();
  const limit = PLANS.find(p => p.id === plan)?.messagesPerDay || 20;
  const today = new Date().toDateString();
  const key = `messages_${today}`;
  const count = parseInt(await AsyncStorage.getItem(key) || '0');
  return count < limit;
}

export async function incrementMessageCount() {
  const today = new Date().toDateString();
  const key = `messages_${today}`;
  const count = parseInt(await AsyncStorage.getItem(key) || '0');
  await AsyncStorage.setItem(key, (count + 1).toString());
}

export async function getRemainingMessages(): Promise<number> {
  const plan = await getUserPlan();
  const limit = PLANS.find(p => p.id === plan)?.messagesPerDay || 20;
  const today = new Date().toDateString();
  const key = `messages_${today}`;
  const count = parseInt(await AsyncStorage.getItem(key) || '0');
  return Math.max(0, limit - count);
}
