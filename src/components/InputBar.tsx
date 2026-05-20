import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VoiceButton from './VoiceButton';

interface Props {
  value: string;
  onChange: (text: string) => void;
  onSend: () => void;
  loading: boolean;
  isListening?: boolean;
  isSpeaking?: boolean;
  onVoicePress?: () => void;
}

export default function InputBar({ value, onChange, onSend, loading, isListening = false, isSpeaking = false, onVoicePress }: Props) {
  return (
    <View style={styles.container}>
      {onVoicePress && (
        <VoiceButton
          isListening={isListening}
          isSpeaking={isSpeaking}
          onPress={onVoicePress}
        />
      )}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="اكتب رسالتك..."
        placeholderTextColor="#555"
        multiline
        maxLength={1000}
      />
      <TouchableOpacity style={[styles.btn, loading && styles.btnDisabled]} onPress={onSend} disabled={loading}>
        {loading
          ? <ActivityIndicator color="#fff" size="small" />
          : <Ionicons name="send" size={20} color="#fff" />
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'flex-end', padding: 12, backgroundColor: '#0d1426', borderTopWidth: 1, borderTopColor: '#1a2035', gap: 8 },
  input: { flex: 1, backgroundColor: '#1a2035', color: '#fff', padding: 12, borderRadius: 20, fontSize: 15, maxHeight: 120, textAlign: 'right' },
  btn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#4fc3f7', justifyContent: 'center', alignItems: 'center' },
  btnDisabled: { backgroundColor: '#1a2035' },
});
