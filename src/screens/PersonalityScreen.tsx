import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PERSONALITIES, Personality } from '../constants/personalities';

export default function PersonalityScreen({ onSelect }: { onSelect: (p: Personality) => void }) {
  const [selected, setSelected] = useState('default');

  useEffect(() => {
    AsyncStorage.getItem('personality').then(p => { if (p) setSelected(p); });
  }, []);

  const handleSelect = async (p: Personality) => {
    setSelected(p.id);
    await AsyncStorage.setItem('personality', p.id);
    onSelect(p);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>اختر شخصية AI</Text>
      <Text style={styles.subtitle}>كل شخصية لها أسلوب مختلف</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {PERSONALITIES.map(p => (
          <TouchableOpacity
            key={p.id}
            style={[styles.card, selected === p.id && { borderColor: p.color, borderWidth: 2 }]}
            onPress={() => handleSelect(p)}
          >
            <Text style={styles.emoji}>{p.emoji}</Text>
            <View style={styles.info}>
              <Text style={[styles.name, { color: p.color }]}>{p.name}</Text>
              <Text style={styles.desc}>{p.description}</Text>
            </View>
            {selected === p.id && <Text style={[styles.check, { color: p.color }]}>✓</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e', padding: 16 },
  title: { fontSize: 28, color: '#4fc3f7', fontWeight: 'bold', textAlign: 'center', marginTop: 40, marginBottom: 8 },
  subtitle: { color: '#888', textAlign: 'center', marginBottom: 24, fontSize: 14 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a2035', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#1a2035' },
  emoji: { fontSize: 36, marginRight: 16 },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  desc: { color: '#888', fontSize: 13 },
  check: { fontSize: 24, fontWeight: 'bold' },
});
