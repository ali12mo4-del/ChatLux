import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Text } from 'react-native';

type AvatarMood = 'idle' | 'greeting' | 'thinking' | 'victory' | 'like';

interface Props {
  mood: AvatarMood;
}

export default function AIAvatar({ mood }: Props) {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (mood === 'greeting') {
      Animated.sequence([
        Animated.timing(rotateAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(rotateAnim, { toValue: -1, duration: 200, useNativeDriver: true }),
        Animated.timing(rotateAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(rotateAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }

    if (mood === 'thinking') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, { toValue: -8, duration: 400, useNativeDriver: true }),
          Animated.timing(bounceAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
        ]), { iterations: 3 }
      ).start();
    }

    if (mood === 'victory') {
      Animated.sequence([
        Animated.spring(scaleAnim, { toValue: 1.3, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
      ]).start();
    }

    if (mood === 'like') {
      Animated.sequence([
        Animated.timing(bounceAnim, { toValue: -15, duration: 200, useNativeDriver: true }),
        Animated.timing(bounceAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [mood]);

  const rotate = rotateAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-20deg', '0deg', '20deg'],
  });

  const emoji = {
    idle: '🤖',
    greeting: '👋',
    thinking: '🤔',
    victory: '🎉',
    like: '👍',
  }[mood];

  return (
    <Animated.View style={[
      styles.container,
      {
        transform: [
          { translateY: bounceAnim },
          { rotate },
          { scale: scaleAnim },
        ]
      }
    ]}>
      <Text style={styles.emoji}>{emoji}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { width: 60, height: 60, justifyContent: 'center', alignItems: 'center' },
  emoji: { fontSize: 40 },
});
