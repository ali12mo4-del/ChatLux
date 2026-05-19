import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
type Props = { value: string; onChange: (t: string) => void; onSend: () => void; loading: boolean };
export default function InputBar({ value, onChange, onSend, loading }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput style={styles.input} value={value} onChangeText={onChange} placeholder="اكتب رسالتك..." placeholderTextColor={COLORS.textMuted} multiline maxLength={1000} onSubmitEditing={onSend} />
      </View>
      <TouchableOpacity style={[styles.btn, (!value.trim() || loading) && styles.btnDisabled]} onPress={onSend} disabled={!value.trim() || loading} activeOpacity={0.8}>
        <Text style={styles.btnIcon}>{loading ? '...' : '>'}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 12, paddingVertical: 10, paddingBottom: 20, backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: COLORS.border, gap: 10 },
  inputWrapper: { flex: 1, backgroundColor: COLORS.surfaceAlt, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 14, paddingVertical: 10, minHeight: 48, maxHeight: 130, justifyContent: 'center' },
  input: { color: COLORS.text, fontSize: FONTS.md, lineHeight: 22 },
  btn: { width: 50, height: 50, borderRadius: 14, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  btnDisabled: { backgroundColor: COLORS.surfaceAlt },
  btnIcon: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});
