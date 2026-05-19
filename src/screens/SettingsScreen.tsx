import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const user = auth.currentUser;

  const handleLogout = () => {
    Alert.alert('تسجيل الخروج', 'هل أنت متأكد؟', [
      { text: 'إلغاء' },
      { text: 'خروج', style: 'destructive', onPress: () => signOut(auth) },
    ]);
  };

  const handleClearMemory = async () => {
    Alert.alert('مسح الذاكرة', 'هل تريد مسح كل ذاكرة الـ AI؟', [
      { text: 'إلغاء' },
      { text: 'مسح', style: 'destructive', onPress: async () => {
        await AsyncStorage.removeItem('ai_memory');
        Alert.alert('تم', 'تم مسح الذاكرة بنجاح ✅');
      }},
    ]);
  };

  const handleClearChats = async () => {
    Alert.alert('مسح المحادثات', 'هل تريد مسح كل المحادثات؟', [
      { text: 'إلغاء' },
      { text: 'مسح', style: 'destructive', onPress: async () => {
        await AsyncStorage.removeItem('chats');
        Alert.alert('تم', 'تم مسح المحادثات بنجاح ✅');
      }},
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ الإعدادات</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>الحساب</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>البريد الإلكتروني</Text>
          <Text style={styles.itemValue}>{user?.email}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>التفضيلات</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>الوضع الداكن</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ true: '#4fc3f7' }} />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>الإشعارات</Text>
          <Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: '#4fc3f7' }} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>البيانات</Text>
        <TouchableOpacity style={styles.dangerBtn} onPress={handleClearMemory}>
          <Text style={styles.dangerText}>🧠 مسح ذاكرة AI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dangerBtn} onPress={handleClearChats}>
          <Text style={styles.dangerText}>💬 مسح كل المحادثات</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>تسجيل الخروج</Text>
      </TouchableOpacity>

      <Text style={styles.version}>ChatLux v1.0.0 - by Ali Mohammed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e', padding: 16 },
  title: { fontSize: 28, color: '#4fc3f7', fontWeight: 'bold', textAlign: 'center', marginBottom: 24, marginTop: 40 },
  section: { backgroundColor: '#1a2035', borderRadius: 12, padding: 16, marginBottom: 16 },
  sectionTitle: { color: '#4fc3f7', fontSize: 14, fontWeight: 'bold', marginBottom: 12 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  itemText: { color: '#fff', fontSize: 16 },
  itemValue: { color: '#888', fontSize: 14 },
  dangerBtn: { padding: 12, borderRadius: 8, backgroundColor: '#2a1a1a', marginBottom: 8 },
  dangerText: { color: '#ff5555', fontSize: 16 },
  logoutBtn: { backgroundColor: '#ff5555', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  version: { color: '#444', textAlign: 'center', marginTop: 24, fontSize: 12 },
});
