import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEMES, Theme } from '../constants/themes';

export default function ThemeScreen() {
  const [selected, setSelected] = useState('dark_blue');

  useEffect(() => {
    AsyncStorage.getItem('theme').then(t => { if (t) setSelected(t); });
  }, []);

  const handleSelect = async (theme: Theme) => {
    setSelected(theme.id);
    await AsyncStorage.setItem('theme', theme.id);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎨 الثيمات</Text>
      <Text style={styles.subtitle}>اختر الثيم المناسب لك</Text>
      {THEMES.map(theme => (
        <TouchableOpacity
          key={theme.id}
          style={[styles.card, selected === theme.id && { borderColor: theme.primary, borderWidth: 2 }]}
          onPress={() => handleSelect(theme)}
        >
          <View style={[styles.preview, { backgroundColor: theme.bg }]}>
            <View style={[styles.bubble, { backgroundColor: theme.surface }]} />
            <View style={[styles.bubble2, { backgroundColor: theme.primary }]} />
          </View>
          <View style={styles.info}>
            <Text style={styles.emoji}>{theme.emoji}</Text>
            <Text style={styles.name}>{theme.name}</Text>
          </View>
          {selected === theme.id && (
            <Text style={[styles.check, { color: theme.primary }]}>✓</Text>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e', padding: 16 },
  title: { fontSize: 28, color: '#4fc3f7', fontWeight: 'bold', textAlign: 'center', marginTop: 40, marginBottom: 8 },
  subtitle: { color: '#888', textAlign: 'center', marginBottom: 24 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a2035', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#1a2035' },
  preview: { width: 60, height: 40, borderRadius: 8, overflow: 'hidden', justifyContent: 'center', padding: 6, gap: 4 },
  bubble: { height: 10, borderRadius: 5, width: '80%' },
  bubble2: { height: 10, borderRadius: 5, width: '60%', alignSelf: 'flex-end' },
  info: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, marginLeft: 12 },
  emoji: { fontSize: 24 },
  name: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  check: { fontSize: 24, fontWeight: 'bold' },
});
