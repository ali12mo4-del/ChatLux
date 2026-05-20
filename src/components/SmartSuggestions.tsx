import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface Props {
  suggestions: string[];
  onSelect: (text: string) => void;
}

export default function SmartSuggestions({ suggestions, onSelect }: Props) {
  if (!suggestions.length) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {suggestions.map((s, i) => (
        <TouchableOpacity key={i} style={styles.chip} onPress={() => onSelect(s)}>
          <Text style={styles.text}>{s}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { maxHeight: 50, marginBottom: 4 },
  content: { paddingHorizontal: 12, gap: 8 },
  chip: { backgroundColor: '#1a2035', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#4fc3f730' },
  text: { color: '#4fc3f7', fontSize: 13 },
});
