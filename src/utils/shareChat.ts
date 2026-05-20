import { Share } from 'react-native';

export async function shareChat(messages: any[], title: string) {
  try {
    const text = messages
      .map(m => `${m.role === 'user' ? '👤 أنا' : '🤖 ChatLux'}: ${m.content}`)
      .join('\n\n');

    await Share.share({
      message: `📱 محادثة من ChatLux\n\n${title}\n\n${text}\n\n⬇️ حمل ChatLux دلوقتي!`,
      title: `محادثة: ${title}`,
    });
  } catch (e) {
    console.error(e);
  }
}
