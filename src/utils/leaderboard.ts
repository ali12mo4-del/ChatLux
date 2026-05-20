import { auth, database } from '../config/firebase';
import { ref, set, get, query, orderByChild, limitToLast } from 'firebase/database';

export interface LeaderboardEntry {
  uid: string;
  email: string;
  totalMessages: number;
  rank: number;
}

export async function updateLeaderboard(totalMessages: number) {
  const uid = auth.currentUser?.uid;
  const email = auth.currentUser?.email;
  if (!uid || !email) return;

  await set(ref(database, `leaderboard/${uid}`), {
    email: email.split('@')[0],
    totalMessages,
    lastUpdated: Date.now(),
  });
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const snap = await get(
      query(ref(database, 'leaderboard'), orderByChild('totalMessages'), limitToLast(10))
    );
    
    if (!snap.exists()) return [];
    
    const data = snap.val();
    const entries = Object.entries(data).map(([uid, val]: any) => ({
      uid,
      email: val.email,
      totalMessages: val.totalMessages,
      rank: 0,
    }));

    return entries
      .sort((a, b) => b.totalMessages - a.totalMessages)
      .map((e, i) => ({ ...e, rank: i + 1 }));
  } catch {
    return [];
  }
}
