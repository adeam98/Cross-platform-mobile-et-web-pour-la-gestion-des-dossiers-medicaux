import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Linking,
  ScrollView,
} from 'react-native';
import PDFView from 'react-native-view-pdf';

import { getAnalyse, getPdfUrl } from '../services/patientservice';

const ResultatAnalyseScreen = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPdf, setShowPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  useFocusEffect(
    useCallback(() => {
      fetchAnalyses();
    }, [])
  );

  const fetchAnalyses = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        return;
      }

      const response = await getAnalyse(userId, 1);

      const filteredAnalyses = response.data.filter(
        (analyse) =>
          analyse.resultat &&
          analyse.resultat.toLowerCase().endsWith('.pdf') &&
          analyse.resultat.startsWith('/uploads/')
      );

      setAnalyses(filteredAnalyses);
    } catch (error) {
      console.error("Erreur lors de la récupération des résultats d'analyses :", error);
    } finally {
      setLoading(false);
    }
  };

  const openPdf = (filePath) => {
    try {
      console.log('Fichier PDF détecté:', filePath);

      const fullUrl = getPdfUrl(filePath);

      Linking.openURL(fullUrl).catch((err) => {
        console.error('Erreur ouverture URL:', err);
        alert("Erreur lors de l'ouverture du fichier.");
      });
    } catch (error) {
      console.error('Erreur ouverture PDF:', error);
      alert("Erreur lors de l'ouverture du fichier.");
    }
  };

  const closePdf = () => {
    setShowPdf(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résultats d'Analyses</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00c853" style={{ marginTop: 80 }} />
      ) : analyses.length === 0 ? (
        <Text style={styles.noData}>Aucun fichier PDF disponible.</Text>
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }} // optional padding
          showsVerticalScrollIndicator={false} // optional style
        >
          {analyses.map((analyse) => (
            <View key={analyse.id_analyse} style={styles.card}>
              <Text style={styles.label}>
                📅 Date : {new Date(analyse.date_examen).toLocaleDateString('fr-FR')}
              </Text>
              <Text style={styles.label}>🧪 Titre : {analyse.nom}</Text>

              <TouchableOpacity
                style={styles.pdfButton}
                onPress={() => openPdf(analyse.resultat)}
                activeOpacity={0.8}>
                <Text style={styles.pdfButtonText}>📄 Voir le fichier PDF</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {/* PDF Modal remains unchanged */}
      <Modal visible={showPdf} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closePdf}>
              <Text style={styles.closeButtonText}>❌ Fermer</Text>
            </TouchableOpacity>
            <PDFView
              style={{ flex: 1 }}
              resource={pdfUrl}
              resourceType="url"
              onError={(error) => {
                console.log('Erreur PDFView:', error);
                alert("Impossible d'afficher le fichier PDF.");
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 30,
    color: '#00796b',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 24,
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: '#00c853',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  label: {
    fontWeight: '700',
    color: '#004d40',
    fontSize: 16,
    marginBottom: 10,
  },
  pdfButton: {
    backgroundColor: '#00c853',
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#00c853',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  pdfButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 17,
  },
  noData: {
    marginTop: 80,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#6a994e',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '90%',
    height: '80%',
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: '#00796b',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ResultatAnalyseScreen;
