import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>✦</Text>
        </View>
        <View style={styles.onlineDot} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>ChatLux</Text>
        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.status}>Online · AI by Ali</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarContainer: { position: 'relative', marginRight: 12 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#fff', fontSize: 20 },
  onlineDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.online,
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  info: { flex: 1 },
  name: {
    color: COLORS.text,
    fontSize: FONTS.lg,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.online,
    marginRight: 5,
  },
  status: { color: COLORS.textDim, fontSize: FONTS.sm },
});
