import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';
import { Asset } from 'expo-asset';

export default function HandbookScreen() {
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [pdfUri, setPdfUri] = useState(null);

  useEffect(() => {
  async function loadPdf() {
    const asset = await Asset.fromModule(
      require('../assets/pdfs/DMV_Handbook_2026.pdf')
    ).downloadAsync();
    setPdfUri(asset.localUri);
  }
  loadPdf();
}, []);

  const pdfSource = pdfUri ? { uri: pdfUri } : null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📖 California Driver Handbook</Text>
        {!loading && (
          <Text style={styles.pageIndicator}>
            Page {currentPage} of {totalPages}
          </Text>
        )}
      </View>

      <View style={styles.attributionBar}>
        <Text style={styles.attributionText}>
          California Driver's Handbook, California Department of Motor Vehicles, licensed under CC BY-NC 4.0
        </Text>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Loading handbook...</Text>
        </View>
      )}

      {pdfUri && (
        <Pdf
          source={pdfSource}
          style={styles.pdf}
          onLoadComplete={(numberOfPages) => {
            setTotalPages(numberOfPages);
            setLoading(false);
          }}
          onPageChanged={(page) => {
            setCurrentPage(page);
          }}
          onError={(error) => {
            console.log('PDF Error:', error);
          }}
          enablePaging={true}
          horizontal={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', paddingTop: 32 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#2563EB',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  pageIndicator: {
    fontSize: 13,
    color: '#BFDBFE',
  },
  attributionBar: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  attributionText: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748B',
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
});