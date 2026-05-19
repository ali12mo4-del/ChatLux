import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.logo}>✨</Text>
        <Text style={styles.title}>ChatLux</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.email}>{auth.currentUser?.email?.split('@')[0]}</Text>
        <TouchableOpacity onPress={() => signOut(auth)}>
          <Text style={styles.logout}>خروج</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0d1426', padding: 16, paddingTop: 48, borderBottomWidth: 1, borderBottomColor: '#1a2035' },
  left: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logo: { fontSize: 24 },
  title: { fontSize: 22, color: '#4fc3f7', fontWeight: 'bold' },
  right: { alignItems: 'flex-end' },
  email: { color: '#888', fontSize: 12, marginBottom: 4 },
  logout: { color: '#ff5555', fontSize: 14 },
});
