import { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase';
import { database } from '../config/firebase';
import { ref, set } from 'firebase/database';
import { extractAndSaveMemory, loadMemory, buildMemoryPrompt } from './useAIMemory';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function useChat(chatId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<any>(null);

  useEffect(() => {
    if (chatId) loadMessages(chatId);
  }, [chatId]);

  const loadMessages = async (id: string) => {
    try {
      const uid = auth.currentUser?.uid;
      if (uid) {
        const snap = await (await import('firebase/database')).get(ref(database, `users/${uid}/chats/${id}/messages`));
        if (snap.exists()) {
          setMessages(snap.val() || []);
          return;
        }
      }
      const local = await AsyncStorage.getItem(`messages_${id}`);
      if (local) setMessages(JSON.parse(local));
    } catch {}
  };

  const saveMessages = async (msgs: Message[]) => {
    if (!chatId) return;
    try {
      const uid = auth.currentUser?.uid;
      if (uid) {
        await set(ref(database, `users/${uid}/chats/${chatId}/messages`), msgs);
      }
      await AsyncStorage.setItem(`messages_${chatId}`, JSON.stringify(msgs));
    } catch {}
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const memory = await loadMemory();
      const memoryPrompt = buildMemoryPrompt(memory);

      const response = await fetch('https://chat-lux-2--ali12mo4.replit.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          systemExtra: memoryPrompt,
        }),
      });

      const data = await response.json();
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'حدث خطأ',
      };

      const finalMessages = [...newMessages, assistantMsg];
      setMessages(finalMessages);
      await saveMessages(finalMessages);
      await extractAndSaveMemory(finalMessages);
    } catch (e) {
      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'حدث خطأ في الاتصال، حاول مرة أخرى',
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, input, setInput, loading, sendMessage, flatListRef };
}
