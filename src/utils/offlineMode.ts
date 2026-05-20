import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export interface QueuedMessage {
  id: string;
  chatId: string;
  content: string;
  timestamp: number;
}

export async function isOnline(): Promise<boolean> {
  const state = await NetInfo.fetch();
  return state.isConnected ?? false;
}

export async function queueMessage(chatId: string, content: string) {
  const queue = await getQueue();
  queue.push({
    id: Date.now().toString(),
    chatId,
    content,
    timestamp: Date.now(),
  });
  await AsyncStorage.setItem('offline_queue', JSON.stringify(queue));
}

export async function getQueue(): Promise<QueuedMessage[]> {
  const q = await AsyncStorage.getItem('offline_queue');
  return q ? JSON.parse(q) : [];
}

export async function clearQueue() {
  await AsyncStorage.removeItem('offline_queue');
}

export async function getOfflineReply(): Promise<string> {
  const replies = [
    'أنا مش متصل بالنت دلوقتي، بس رسالتك اتحفظت وهرد عليك لما يرجع الاتصال! 📵',
    'مفيش اتصال بالنت، رسالتك في الطابور وهترسل تلقائياً! 🔄',
    'أنا offline دلوقتي، بس مش هتضيع رسالتك! ✅',
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}
