import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { getUserStats, UserStats } from '../utils/userStats';
import { auth } from '../config/firebase';

export default function StatsScreen() {
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    getUserStats().then(setStats);
  }, []);

  if (!stats) return (
    <View style={styles.loading}>
      <ActivityIndicator color="#4fc3f7" size="large" />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 إحصائياتك</Text>
      <Text style={styles.email}>{auth.currentUser?.email}</Text>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.cardEmoji}>💬</Text>
          <Text style={styles.cardNum}>{stats.totalMessages}</Text>
          <Text style={styles.cardLabel}>رسالة</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardEmoji}>🗂️</Text>
          <Text style={styles.cardNum}>{stats.totalChats}</Text>
          <Text style={styles.cardLabel}>محادثة</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardEmoji}>✍️</Text>
          <Text style={styles.cardNum}>{stats.totalCharacters}</Text>
          <Text style={styles.cardLabel}>حرف كتبته</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardEmoji}>🎭</Text>
          <Text style={styles.cardNum}>{stats.favoritePersonality}</Text>
          <Text style={styles.cardLabel}>شخصيتك المفضلة</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>📅 أول استخدام</Text>
        <Text style={styles.infoValue}>{new Date(stats.firstUseDate).toLocaleDateString('ar')}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e', padding: 16 },
  loading: { flex: 1, backgroundColor: '#0a0f1e', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, color: '#4fc3f7', fontWeight: 'bold', textAlign: 'center', marginTop: 40, marginBottom: 4 },
  email: { color: '#888', textAlign: 'center', marginBottom: 24, fontSize: 13 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  card: { flex: 1, minWidth: '45%', backgroundColor: '#1a2035', padding: 16, borderRadius: 16, alignItems: 'center' },
  cardEmoji: { fontSize: 32, marginBottom: 8 },
  cardNum: { fontSize: 24, color: '#4fc3f7', fontWeight: 'bold', marginBottom: 4 },
  cardLabel: { color: '#888', fontSize: 13 },
  infoCard: { backgroundColor: '#1a2035', padding: 16, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between' },
  infoTitle: { color: '#fff', fontSize: 16 },
  infoValue: { color: '#4fc3f7', fontSize: 16, fontWeight: 'bold' },
});
