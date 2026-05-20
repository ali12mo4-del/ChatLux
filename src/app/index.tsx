import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform, StatusBar, Text, Alert } from 'react-native';
import { useChat } from '../hooks/useChat';
import Header from '../components/Header';
import MessageBubble from '../components/MessageBubble';
import TypingIndicator from '../components/TypingIndicator';
import InputBar from '../components/InputBar';
import AIAvatar from '../components/AIAvatar';
import SmartSuggestions from '../components/SmartSuggestions';
import { COLORS } from '../constants/theme';
import { useVoice } from '../hooks/useVoice';
import { getSmartSuggestions } from '../utils/smartSuggestions';
import { checkDailyLimit, incrementMessageCount, getRemainingMessages } from '../utils/subscription';
import { fixCommonIssues } from '../utils/appCheck';
import { autoBackup } from '../utils/autoBackup';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AvatarMood = 'idle' | 'greeting' | 'thinking' | 'victory' | 'like';

export default function App() {
  const { messages, input, setInput, loading, sendMessage, flatListRef } = useChat();
  const { isListening, isSpeaking, startListening, stopListening, speak } = useVoice();
  const [mood, setMood] = useState<AvatarMood>('greeting');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [remaining, setRemaining] = useState<number>(20);

  useEffect(() => {
    fixCommonIssues();
    setTimeout(() => setMood('idle'), 2000);
    loadSuggestions();
    loadRemaining();
  }, []);

  useEffect(() => {
    if (loading) {
      setMood('thinking');
    } else if (messages.length > 0) {
      setMood('victory');
      setTimeout(() => setMood('idle'), 1500);
      if (messages[messages.length - 1]?.role === 'assistant') {
        speak(messages[messages.length - 1].content.substring(0, 100));
      }
      autoBackup();
    }
  }, [loading]);

  const loadSuggestions = async () => {
    const personality = await AsyncStorage.getItem('personality') || 'default';
    setSuggestions(getSmartSuggestions(personality));
  };

  const loadRemaining = async () => {
    const r = await getRemainingMessages();
    setRemaining(r);
  };

  const handleSend = async () => {
    const canSend = await checkDailyLimit();
    if (!canSend) {
      Alert.alert('انتهت رسائلك! 😅', 'اشترك في Pro للحصول على رسائل أكتر!', [{ text: 'حسناً' }]);
      return;
    }
    setMood('like');
    setTimeout(() => setMood('thinking'), 500);
    await incrementMessageCount();
    await loadRemaining();
    sendMessage();
  };

  const handleVoice = async () => {
    if (isListening) {
      await stopListening();
    } else {
      await startListening();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={0}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.surface} />
      <Header />
      <View style={styles.topBar}>
        <AIAvatar mood={mood} />
        <Text style={styles.remaining}>متبقي: {remaining} رسالة</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MessageBubble item={item} />}
        contentContainerStyle={styles.chat}
        ListFooterComponent={loading ? <TypingIndicator /> : null}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
      {messages.length === 0 && (
        <SmartSuggestions suggestions={suggestions} onSelect={setInput} />
      )}
      <InputBar
        value={input}
        onChange={setInput}
        onSend={handleSend}
        loading={loading}
        isListening={isListening}
        isSpeaking={isSpeaking}
        onVoicePress={handleVoice}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 16, paddingLeft: 8 },
  remaining: { color: '#4fc3f7', fontSize: 12 },
  chat: { padding: 14, paddingBottom: 80 },
});
