import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HandbookScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📖 Handbook</Text>
      <Text style={styles.subtitle}>California DMV Driver's Handbook</Text>
      <Text style={styles.body}>Chapters and reading sections coming soon!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 12 },
  body: { fontSize: 14, color: '#888' },
});