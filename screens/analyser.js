import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';

import { getAnalyse } from '../services/patientservice'; // Assurez-vous que ce chemin est correct
const ResultatAnalyseScreen = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setAnalyses(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des résultats d'analyses :", error);
    } finally {
      setLoading(false);
    }
  };
  const openPdf = (url) => {
    if (url) {
      Linking.openURL(url);
    } else {
      alert('Aucun fichier PDF disponible.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Résultats d'Analyses</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0cd15a" />
      ) : analyses.length === 0 ? (
        <Text style={styles.noData}>Aucun résultat d'analyse disponible.</Text>
      ) : (
        analyses.map((analyse) => (
          <View key={analyse.id} style={styles.card}>
            <Text style={styles.label}>📅 Date :</Text>
            <Text style={styles.value}>{analyse.date}</Text>

            <Text style={styles.label}>🧪 Titre :</Text>
            <Text style={styles.value}>{analyse.titre}</Text>

            <TouchableOpacity style={styles.pdfButton} onPress={() => openPdf(analyse.pdfUrl)}>
              <Text style={styles.pdfButtonText}>📄 Voir le fichier PDF</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: 'black',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  value: {
    marginBottom: 8,
    color: '#555',
  },
  pdfButton: {
    marginTop: 10,
    backgroundColor: '#0cd15a',
    paddingVertical: 10,
    borderRadius: 8,
  },
  pdfButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  noData: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
  },
});

export default ResultatAnalyseScreen;
