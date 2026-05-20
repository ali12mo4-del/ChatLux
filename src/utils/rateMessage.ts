import AsyncStorage from '@react-native-async-storage/async-storage';

export interface MessageRating {
  messageId: string;
  rating: 'up' | 'down';
  timestamp: number;
}

export async function rateMessage(messageId: string, rating: 'up' | 'down') {
  const ratingsData = await AsyncStorage.getItem('message_ratings');
  const ratings: MessageRating[] = ratingsData ? JSON.parse(ratingsData) : [];
  
  const existing = ratings.findIndex(r => r.messageId === messageId);
  if (existing >= 0) {
    ratings[existing].rating = rating;
  } else {
    ratings.push({ messageId, rating, timestamp: Date.now() });
  }
  
  await AsyncStorage.setItem('message_ratings', JSON.stringify(ratings));
}

export async function getMessageRating(messageId: string): Promise<'up' | 'down' | null> {
  const ratingsData = await AsyncStorage.getItem('message_ratings');
  if (!ratingsData) return null;
  const ratings: MessageRating[] = JSON.parse(ratingsData);
  return ratings.find(r => r.messageId === messageId)?.rating || null;
}

export async function getRatingStats() {
  const ratingsData = await AsyncStorage.getItem('message_ratings');
  if (!ratingsData) return { up: 0, down: 0 };
  const ratings: MessageRating[] = JSON.parse(ratingsData);
  return {
    up: ratings.filter(r => r.rating === 'up').length,
    down: ratings.filter(r => r.rating === 'down').length,
  };
}
