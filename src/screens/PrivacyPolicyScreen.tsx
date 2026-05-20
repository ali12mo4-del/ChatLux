import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>سياسة الخصوصية</Text>
      <Text style={styles.date}>آخر تحديث: مايو 2026</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>1. المعلومات التي نجمعها</Text>
        <Text style={styles.text}>
          نجمع البريد الإلكتروني وكلمة المرور لتسجيل الدخول، والمحادثات التي تجريها مع الذكاء الاصطناعي.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>2. كيف نستخدم معلوماتك</Text>
        <Text style={styles.text}>
          نستخدم معلوماتك فقط لتقديم خدمة ChatLux وتحسين تجربتك. لا نبيع بياناتك لأي طرف ثالث.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>3. حفظ البيانات</Text>
        <Text style={styles.text}>
          يتم حفظ محادثاتك بأمان في Firebase. يمكنك حذف بياناتك في أي وقت من الإعدادات.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>4. الأمان</Text>
        <Text style={styles.text}>
          نستخدم تشفير SSL وFirebase Authentication لحماية بياناتك.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>5. التواصل معنا</Text>
        <Text style={styles.text}>
          للتواصل: ali12.mo4@gmail.com
        </Text>
      </View>

      <Text style={styles.footer}>ChatLux by Ali Mohammed © 2026</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e', padding: 16 },
  title: { fontSize: 28, color: '#4fc3f7', fontWeight: 'bold', textAlign: 'center', marginTop: 40, marginBottom: 8 },
  date: { color: '#888', textAlign: 'center', marginBottom: 24, fontSize: 13 },
  section: { backgroundColor: '#1a2035', padding: 16, borderRadius: 12, marginBottom: 12 },
  heading: { color: '#4fc3f7', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  text: { color: '#ccc', fontSize: 14, lineHeight: 22 },
  footer: { color: '#444', textAlign: 'center', marginTop: 24, marginBottom: 40, fontSize: 12 },
});
