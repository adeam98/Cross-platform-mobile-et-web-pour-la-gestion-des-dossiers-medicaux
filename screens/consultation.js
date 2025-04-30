import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

import { getALLconsultation } from '../services/patientservice'; // Assurez-vous que ce chemin est correct
const RapportsConsultationScreen = () => {
  const [rapports, setRapports] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchRapports();
    }, [])
  );

  const fetchRapports = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        return;
      }
      const response = await getALLconsultation(userId);
      setRapports(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des rapports :', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mes Rapports de Consultation</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0cd15a" />
      ) : rapports.length === 0 ? (
        <Text style={styles.noData}>Aucun rapport disponible.</Text>
      ) : (
        rapports.map((rapport) => (
          <View key={rapport.id} style={styles.card}>
            <Text style={styles.label}>
              📅 Date : <Text style={styles.value}>{rapport.date}</Text>
            </Text>

            <Text style={styles.label}>📝 Rapport :</Text>
            <Text style={styles.rapport}>{rapport.rapport}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
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
    marginBottom: 12,
    color: '#555',
  },
  rapport: {
    color: '#4a5568',
    lineHeight: 20,
  },
  noData: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
  },
});

export default RapportsConsultationScreen;
