import { useState, useRef } from 'react';

const SERVER_URL = 'https://ai-server-production-534e.up.railway.app/chat';

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
};

const getTime = () => {
  const d = new Date();
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: 'أهلاً! أنا ChatLux 👋\nكيف أقدر أساعدك النهارده؟',
      sender: 'bot',
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<any>(null);

  const scrollToBottom = () => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      time: getTime(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    scrollToBottom();

    try {
      const res = await fetch(SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId: 'user1' }),
      });
      const data = await res.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || 'مفيش رد 🤔',
        sender: 'bot',
        time: getTime(),
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: '❌ في مشكلة في الاتصال، حاول تاني.',
          sender: 'bot',
          time: getTime(),
        },
      ]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  return { messages, input, setInput, loading, sendMessage, flatListRef };
}
