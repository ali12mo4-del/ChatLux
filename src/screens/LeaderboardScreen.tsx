import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getLeaderboard, LeaderboardEntry } from '../utils/leaderboard';
import { auth } from '../config/firebase';

export default function LeaderboardScreen() {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard().then(d => { setData(d); setLoading(false); });
  }, []);

  const medals = ['🥇', '🥈', '🥉'];

  if (loading) return (
    <View style={styles.loading}>
      <ActivityIndicator color="#4fc3f7" size="large" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 المتصدرون</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.uid}
        renderItem={({ item }) => (
          <View style={[styles.card, item.email === auth.currentUser?.email?.split('@')[0] && styles.myCard]}>
            <Text style={styles.rank}>{medals[item.rank - 1] || `#${item.rank}`}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.messages}>{item.totalMessages} رسالة</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>مفيش بيانات بعد 😊</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e', padding: 16 },
  loading: { flex: 1, backgroundColor: '#0a0f1e', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, color: '#4fc3f7', fontWeight: 'bold', textAlign: 'center', marginTop: 40, marginBottom: 24 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a2035', padding: 16, borderRadius: 12, marginBottom: 10 },
  myCard: { borderColor: '#4fc3f7', borderWidth: 1 },
  rank: { fontSize: 24, marginRight: 12 },
  email: { flex: 1, color: '#fff', fontSize: 16 },
  messages: { color: '#4fc3f7', fontWeight: 'bold' },
  empty: { color: '#888', textAlign: 'center', marginTop: 40 },
});
