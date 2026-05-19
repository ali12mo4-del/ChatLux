import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase';
import { database } from '../config/firebase';
import { ref, set, get, push } from 'firebase/database';

export interface Chat {
  id: string;
  title: string;
  createdAt: number;
  messages: any[];
}

export function useChatHistory() {
  const [chats, setChats] = useState<Chat[]>([]);

  const loadChats = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const snapshot = await get(ref(database, `users/${uid}/chats`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.entries(data).map(([id, val]: any) => ({ id, ...val }));
        setChats(list.sort((a, b) => b.createdAt - a.createdAt));
      }
    } catch (e) {
      const local = await AsyncStorage.getItem('chats');
      if (local) setChats(JSON.parse(local));
    }
  };

  const createChat = async () => {
    const uid = auth.currentUser?.uid;
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'محادثة جديدة',
      createdAt: Date.now(),
      messages: [],
    };
    if (uid) {
      await set(ref(database, `users/${uid}/chats/${newChat.id}`), newChat);
    }
    const updated = [newChat, ...chats];
    setChats(updated);
    await AsyncStorage.setItem('chats', JSON.stringify(updated));
    return newChat;
  };

  const deleteChat = async (chatId: string) => {
    const uid = auth.currentUser?.uid;
    if (uid) {
      await set(ref(database, `users/${uid}/chats/${chatId}`), null);
    }
    const updated = chats.filter(c => c.id !== chatId);
    setChats(updated);
    await AsyncStorage.setItem('chats', JSON.stringify(updated));
  };

  const renameChat = async (chatId: string, title: string) => {
    const uid = auth.currentUser?.uid;
    if (uid) {
      await set(ref(database, `users/${uid}/chats/${chatId}/title`), title);
    }
    const updated = chats.map(c => c.id === chatId ? { ...c, title } : c);
    setChats(updated);
    await AsyncStorage.setItem('chats', JSON.stringify(updated));
  };

  const saveMessages = async (chatId: string, messages: any[]) => {
    const uid = auth.currentUser?.uid;
    if (uid) {
      await set(ref(database, `users/${uid}/chats/${chatId}/messages`), messages);
    }
    const updated = chats.map(c => c.id === chatId ? { ...c, messages } : c);
    setChats(updated);
    await AsyncStorage.setItem('chats', JSON.stringify(updated));
  };

  useEffect(() => { loadChats(); }, []);

  return { chats, createChat, deleteChat, renameChat, saveMessages, loadChats };
}
