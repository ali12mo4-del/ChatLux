import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

const SERVER_URL = 'https://ai-server-production-534e.up.railway.app/chat';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, sessionId: 'user1' }),
      });
      const data = await response.json();
      const botMsg = { id: (Date.now() + 1).toString(), text: data.reply, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: 'Connection error', sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <FlatList data={messages} keyExtractor={item => item.id} renderItem={({ item }) => (
        <View style={[styles.bubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      )} contentContainerStyle={styles.chat} />
      {loading && <Text style={styles.typing}>typing...</Text>}
      <View style={styles.inputArea}>
        <TextInput style={styles.input} value={input} onChangeText={setInput} placeholder="Type a message" placeholderTextColor="#888" />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  chat: { padding: 16 },
  bubble: { maxWidth: '75%', padding: 12, borderRadius: 16, marginBottom: 8 },
  userBubble: { backgroundColor: '#2563eb', alignSelf: 'flex-end' },
  botBubble: { backgroundColor: '#1f1f1f', alignSelf: 'flex-start' },
  text: { color: '#fff', fontSize: 15 },
  typing: { color: '#888', paddingLeft: 16, marginBottom: 4 },
  inputArea: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderTopColor: '#222' },
  input: { flex: 1, backgroundColor: '#1f1f1f', color: '#fff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, fontSize: 15 },
  button: { backgroundColor: '#2563eb', borderRadius: 12, paddingHorizontal: 18, justifyContent: 'center', marginLeft: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
