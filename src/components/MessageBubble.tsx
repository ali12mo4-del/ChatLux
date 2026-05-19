import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface Props {
  item: {
    id: string;
    role: 'user' | 'assistant';
    content: string;
  };
}

export default function MessageBubble({ item }: Props) {
  const isUser = item.role === 'user';

  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowBot]}>
      {!isUser && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🤖</Text>
        </View>
      )}
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
        <Text style={[styles.text, isUser ? styles.userText : styles.botText]}>
          {item.content}
        </Text>
      </View>
      {isUser && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 12 },
  rowUser: { justifyContent: 'flex-end' },
  rowBot: { justifyContent: 'flex-start' },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#1a2035', justifyContent: 'center', alignItems: 'center', marginHorizontal: 6 },
  avatarText: { fontSize: 16 },
  bubble: { maxWidth: '75%', padding: 12, borderRadius: 16 },
  userBubble: { backgroundColor: '#4fc3f7', borderBottomRightRadius: 4 },
  botBubble: { backgroundColor: '#1a2035', borderBottomLeftRadius: 4 },
  text: { fontSize: 15, lineHeight: 22 },
  userText: { color: '#000' },
  botText: { color: '#fff' },
});
