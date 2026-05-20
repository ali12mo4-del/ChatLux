import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  isListening: boolean;
  isSpeaking: boolean;
  onPress: () => void;
}

export default function VoiceButton({ isListening, isSpeaking, onPress }: Props) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.3, duration: 500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening]);

  return (
    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
      <TouchableOpacity
        style={[styles.btn, isListening && styles.listening, isSpeaking && styles.speaking]}
        onPress={onPress}
      >
        <Ionicons
          name={isListening ? 'stop' : isSpeaking ? 'volume-high' : 'mic'}
          size={22}
          color="#fff"
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  btn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#1a2035', justifyContent: 'center', alignItems: 'center' },
  listening: { backgroundColor: '#ff5555' },
  speaking: { backgroundColor: '#4caf50' },
});
