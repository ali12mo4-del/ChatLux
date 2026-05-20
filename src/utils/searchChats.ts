import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SearchResult {
  chatId: string;
  chatTitle: string;
  messageContent: string;
  timestamp: number;
}

export async function searchInChats(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];
  
  const chatsData = await AsyncStorage.getItem('chats');
  if (!chatsData) return [];
  
  const chats = JSON.parse(chatsData);
  const results: SearchResult[] = [];
  const q = query.toLowerCase();

  for (const chat of chats) {
    if (!chat.messages) continue;
    for (const msg of chat.messages) {
      if (msg.content?.toLowerCase().includes(q)) {
        results.push({
          chatId: chat.id,
          chatTitle: chat.title,
          messageContent: msg.content,
          timestamp: chat.createdAt,
        });
      }
    }
  }

  return results.slice(0, 20);
}
