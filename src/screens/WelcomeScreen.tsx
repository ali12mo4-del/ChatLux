import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function WelcomeScreen({ onStart }: { onStart: () => void }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bg1} />
      <View style={styles.bg2} />

      <Animated.View style={[styles.logoContainer, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.logoEmoji}>✨</Text>
      </Animated.View>

      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <Text style={styles.title}>ChatLux</Text>
        <Text style={styles.subtitle}>مساعدك الذكي الشخصي</Text>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>🧠</Text>
            <Text style={styles.featureText}>ذاكرة طويلة المدى</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>🎭</Text>
            <Text style={styles.featureText}>شخصيات متعددة</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>☁️</Text>
            <Text style={styles.featureText}>مزامنة على كل الأجهزة</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>🔒</Text>
            <Text style={styles.featureText}>آمن وخاص</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>ابدأ الآن 🚀</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>by Ali Mohammed</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e', justifyContent: 'center', alignItems: 'center', padding: 24 },
  bg1: { position: 'absolute', width: 300, height: 300, borderRadius: 150, backgroundColor: '#4fc3f720', top: -50, right: -50 },
  bg2: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: '#1a237e40', bottom: 50, left: -50 },
  logoContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#1a2035', justifyContent: 'center', alignItems: 'center', marginBottom: 24, borderWidth: 2, borderColor: '#4fc3f7' },
  logoEmoji: { fontSize: 48 },
  title: { fontSize: 42, color: '#4fc3f7', fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#888', textAlign: 'center', marginBottom: 40 },
  features: { gap: 12, marginBottom: 40 },
  feature: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a2035', padding: 14, borderRadius: 12, gap: 12 },
  featureEmoji: { fontSize: 24 },
  featureText: { color: '#fff', fontSize: 16 },
  button: { backgroundColor: '#4fc3f7', padding: 18, borderRadius: 16, alignItems: 'center', marginBottom: 16 },
  buttonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  footer: { color: '#444', textAlign: 'center', fontSize: 12 },
});
