import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { Message } from '../hooks/useChat';

type Props = { item: Message };

function parseMessage(text: string) {
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => {
    if (part.startsWith('```')) {
      const code = part.replace(/```\w*\n?/, '').replace(/```$/, '');
      return { type: 'code', content: code, key: i };
    }
    return { type: 'text', content: part, key: i };
  });
}

export default function MessageBubble({ item }: Props) {
  const isUser = item.sender === 'user';
  const parts = parseMessage(item.text);

  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowBot]}>
      {!isUser && (
        <View style={styles.botAvatar}>
          <Text style={styles.botAvatarText}>✦</Text>
        </View>
      )}
      <View style={styles.bubbleWrapper}>
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
          {parts.map(part =>
            part.type === 'code' ? (
              <ScrollView key={part.key} horizontal style={styles.codeBox} showsHorizontalScrollIndicator={false}>
                <Text style={styles.codeText}>{part.content.trim()}</Text>
              </ScrollView>
            ) : (
              <Text key={part.key} style={[styles.text, isUser && styles.textUser]}>
                {part.content}
              </Text>
            )
          )}
        </View>
        <Text style={[styles.time, isUser && styles.timeUser]}>{item.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', marginBottom: 14, alignItems: 'flex-end' },
  rowUser: { justifyContent: 'flex-end' },
  rowBot: { justifyContent: 'flex-start' },
  botAvatar: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 16,
  },
  botAvatarText: { color: '#fff', fontSize: 14 },
  bubbleWrapper: { maxWidth: '78%' },
  bubble: {
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    overflow: 'hidden',
  },
  userBubble: {
    backgroundColor: COLORS.userBubble,
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: COLORS.botBubble,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderBottomLeftRadius: 4,
  },
  text: { color: COLORS.textDim, fontSize: FONTS.md, lineHeight: 22 },
  textUser: { color: '#fff' },
  time: {
    color: COLORS.textMuted,
    fontSize: 10,
    marginTop: 4,
    paddingLeft: 4,
  },
  timeUser: { textAlign: 'right', paddingRight: 4 },
  codeBox: {
    backgroundColor: COLORS.code,
    borderRadius: 10,
    padding: 10,
    marginVertical: 4,
  },
  codeText: {
    color: COLORS.codeText,
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
  },
});
