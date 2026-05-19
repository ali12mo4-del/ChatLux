import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import { useChatHistory } from '../hooks/useChatHistory';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

export default function ChatHistoryScreen({ onSelectChat }: { onSelectChat: (chat: any) => void }) {
  const { chats, createChat, deleteChat, renameChat } = useChatHistory();
  const [renaming, setRenaming] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const handleNew = async () => {
    const chat = await createChat();
    onSelectChat(chat);
  };

  const handleDelete = (id: string) => {
    Alert.alert('حذف', 'هل تريد حذف المحادثة؟', [
      { text: 'إلغاء' },
      { text: 'حذف', onPress: () => deleteChat(id), style: 'destructive' },
    ]);
  };

  const handleRename = async (id: string) => {
    if (newTitle.trim()) {
      await renameChat(id, newTitle);
      setRenaming(null);
      setNewTitle('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💬 ChatLux</Text>
      <TouchableOpacity style={styles.newBtn} onPress={handleNew}>
        <Text style={styles.newBtnText}>+ محادثة جديدة</Text>
      </TouchableOpacity>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.chatItem}>
            {renaming === item.id ? (
              <TextInput
                style={styles.input}
                value={newTitle}
                onChangeText={setNewTitle}
                onSubmitEditing={() => handleRename(item.id)}
                placeholder="اسم جديد"
                placeholderTextColor="#888"
                autoFocus
              />
            ) : (
              <TouchableOpacity style={{ flex: 1 }} onPress={() => onSelectChat(item)}>
                <Text style={styles.chatTitle}>{item.title}</Text>
                <Text style={styles.chatDate}>{new Date(item.createdAt).toLocaleDateString('ar')}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => { setRenaming(item.id); setNewTitle(item.title); }}>
              <Text style={styles.action}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.action}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>لا توجد محادثات بعد</Text>}
      />
      <TouchableOpacity style={styles.logout} onPress={() => signOut(auth)}>
        <Text style={styles.logoutText}>تسجيل الخروج</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e', padding: 16 },
  title: { fontSize: 28, color: '#4fc3f7', fontWeight: 'bold', textAlign: 'center', marginBottom: 16, marginTop: 40 },
  newBtn: { backgroundColor: '#4fc3f7', padding: 14, borderRadius: 12, alignItems: 'center', marginBottom: 16 },
  newBtnText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  chatItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a2035', padding: 14, borderRadius: 12, marginBottom: 10 },
  chatTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  chatDate: { color: '#888', fontSize: 12, marginTop: 4 },
  action: { fontSize: 20, marginLeft: 10 },
  input: { flex: 1, color: '#fff', backgroundColor: '#0a0f1e', padding: 8, borderRadius: 8 },
  empty: { color: '#888', textAlign: 'center', marginTop: 40, fontSize: 16 },
  logout: { padding: 14, alignItems: 'center', marginTop: 10 },
  logoutText: { color: '#ff5555', fontSize: 16 },
});
