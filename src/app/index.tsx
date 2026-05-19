import React from 'react';
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { useChat } from '../hooks/useChat';
import Header from '../components/Header';
import MessageBubble from '../components/MessageBubble';
import TypingIndicator from '../components/TypingIndicator';
import InputBar from '../components/InputBar';
import { COLORS } from '../constants/theme';
export default function App() {
  const { messages, input, setInput, loading, sendMessage, flatListRef } = useChat();
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.surface} />
      <Header />
      <FlatList ref={flatListRef} data={messages} keyExtractor={item => item.id} renderItem={({ item }) => <MessageBubble item={item} />} contentContainerStyle={styles.chat} ListFooterComponent={loading ? <TypingIndicator /> : null} onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })} />
      <InputBar value={input} onChange={setInput} onSend={sendMessage} loading={loading} />
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  chat: { padding: 14, paddingBottom: 8 },
});
