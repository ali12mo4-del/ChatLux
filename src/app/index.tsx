import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { useChat } from '../hooks/useChat';
import Header from '../components/Header';
import MessageBubble from '../components/MessageBubble';
import TypingIndicator from '../components/TypingIndicator';
import InputBar from '../components/InputBar';
import AIAvatar from '../components/AIAvatar';
import { COLORS } from '../constants/theme';

type AvatarMood = 'idle' | 'greeting' | 'thinking' | 'victory' | 'like';

export default function App() {
  const { messages, input, setInput, loading, sendMessage, flatListRef } = useChat();
  const [mood, setMood] = useState<AvatarMood>('greeting');

  useEffect(() => {
    setTimeout(() => setMood('idle'), 2000);
  }, []);

  useEffect(() => {
    if (loading) {
      setMood('thinking');
    } else if (messages.length > 0) {
      setMood('victory');
      setTimeout(() => setMood('idle'), 1500);
    }
  }, [loading]);

  const handleSend = () => {
    setMood('like');
    setTimeout(() => setMood('thinking'), 500);
    sendMessage();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={0}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.surface} />
      <Header />
      <View style={styles.avatarContainer}>
        <AIAvatar mood={mood} />
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
      <InputBar value={input} onChange={setInput} onSend={handleSend} loading={loading} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  avatarContainer: { alignItems: 'flex-end', paddingRight: 16, paddingTop: 4 },
  chat: { padding: 14, paddingBottom: 80 },
});
