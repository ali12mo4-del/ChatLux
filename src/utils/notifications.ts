import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function requestNotificationPermission(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleDailyReminder() {
  await Notifications.cancelAllScheduledNotificationsAsync();
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '✨ ChatLux',
      body: 'مرحباً! هل تحتاج مساعدة اليوم؟',
      sound: true,
    },
    trigger: {
      hour: 9,
      minute: 0,
      repeats: true,
    },
  });
}

export async function sendWelcomeNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🎉 أهلاً في ChatLux!',
      body: 'ابدأ محادثتك الأولى مع الذكاء الاصطناعي!',
      sound: true,
    },
    trigger: { seconds: 2 },
  });
}

export async function sendMessageNotification(reply: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🤖 ChatLux رد عليك',
      body: reply.substring(0, 100),
      sound: true,
    },
    trigger: { seconds: 1 },
  });
}
