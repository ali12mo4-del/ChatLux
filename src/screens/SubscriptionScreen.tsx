import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { PLANS, getUserPlan, PlanType } from '../utils/subscription';

export default function SubscriptionScreen() {
  const [currentPlan, setCurrentPlan] = useState<PlanType>('free');

  useEffect(() => {
    getUserPlan().then(setCurrentPlan);
  }, []);

  const handleUpgrade = (plan: PlanType) => {
    if (plan === 'free') return;
    Alert.alert(
      'قريباً! 🚀',
      'نظام الدفع هيكون متاح قريباً عبر Google Play!',
      [{ text: 'حسناً' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>💎 الاشتراكات</Text>
      <Text style={styles.subtitle}>اختر الخطة المناسبة لك</Text>

      {PLANS.map(plan => (
        <View key={plan.id} style={[styles.card, currentPlan === plan.id && { borderColor: plan.color, borderWidth: 2 }]}>
          <View style={styles.header}>
            <Text style={styles.emoji}>{plan.emoji}</Text>
            <View>
              <Text style={[styles.planName, { color: plan.color }]}>{plan.name}</Text>
              <Text style={styles.price}>{plan.price}</Text>
            </View>
            {currentPlan === plan.id && <Text style={[styles.current, { color: plan.color }]}>✓ حالي</Text>}
          </View>

          {plan.features.map((f, i) => (
            <Text key={i} style={styles.feature}>✅ {f}</Text>
          ))}

          {currentPlan !== plan.id && plan.id !== 'free' && (
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: plan.color }]}
              onPress={() => handleUpgrade(plan.id)}
            >
              <Text style={styles.btnText}>اشترك الآن</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <Text style={styles.footer}>الدفع سيكون عبر Google Play قريباً</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e', padding: 16 },
  title: { fontSize: 28, color: '#4fc3f7', fontWeight: 'bold', textAlign: 'center', marginTop: 40, marginBottom: 8 },
  subtitle: { color: '#888', textAlign: 'center', marginBottom: 24 },
  card: { backgroundColor: '#1a2035', padding: 16, borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: '#1a2035' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  emoji: { fontSize: 32 },
  planName: { fontSize: 20, fontWeight: 'bold' },
  price: { color: '#888', fontSize: 14 },
  current: { marginLeft: 'auto', fontSize: 16, fontWeight: 'bold' },
  feature: { color: '#ccc', fontSize: 14, marginBottom: 6 },
  btn: { padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  footer: { color: '#444', textAlign: 'center', marginBottom: 40, fontSize: 12 },
});
