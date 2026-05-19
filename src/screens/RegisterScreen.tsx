import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert('خطأ', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>إنشاء حساب</Text>
      <TextInput style={styles.input} placeholder="البريد الإلكتروني" placeholderTextColor="#888" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="كلمة المرور" placeholderTextColor="#888" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>إنشاء حساب</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>لدي حساب بالفعل</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e', justifyContent: 'center', padding: 24 },
  title: { fontSize: 36, color: '#4fc3f7', fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: '#1a2035', color: '#fff', padding: 14, borderRadius: 12, marginBottom: 16, fontSize: 16 },
  button: { backgroundColor: '#4fc3f7', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 16 },
  buttonText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  link: { color: '#4fc3f7', textAlign: 'center', fontSize: 14 },
});
