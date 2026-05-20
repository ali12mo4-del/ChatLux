import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { searchInChats, SearchResult } from '../utils/searchChats';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length > 1) {
      const r = await searchInChats(text);
      setResults(r);
    } else {
      setResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 البحث</Text>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={handleSearch}
        placeholder="ابحث في محادثاتك..."
        placeholderTextColor="#555"
      />
      <FlatList
        data={results}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.result}>
            <Text style={styles.chatTitle}>{item.chatTitle}</Text>
            <Text style={styles.message} numberOfLines={2}>{item.messageContent}</Text>
          </View>
        )}
        ListEmptyComponent={
          query.length > 1
            ? <Text style={styles.empty}>مفيش نتائج 😕</Text>
            : <Text style={styles.empty}>اكتب للبحث في محادثاتك</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e', padding: 16 },
  title: { fontSize: 28, color: '#4fc3f7', fontWeight: 'bold', textAlign: 'center', marginTop: 40, marginBottom: 16 },
  input: { backgroundColor: '#1a2035', color: '#fff', padding: 14, borderRadius: 12, fontSize: 16, marginBottom: 16, textAlign: 'right' },
  result: { backgroundColor: '#1a2035', padding: 14, borderRadius: 12, marginBottom: 10 },
  chatTitle: { color: '#4fc3f7', fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  message: { color: '#ccc', fontSize: 14 },
  empty: { color: '#555', textAlign: 'center', marginTop: 40, fontSize: 16 },
});
