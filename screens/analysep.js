import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

import { getAnalyse } from '../services/patientservice'; // Assurez-vous que ce chemin est correct
const AnalysePrescriteScreen = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchPrescriptions();
    }, [])
  );

  const fetchPrescriptions = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      console.log('📦 USER ID FROM ASYNC STORAGE:', userId);
      if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        return;
      }
      const response = await getAnalyse(userId, 0);
      setPrescriptions(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des analyses prescrites :', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Analyses Prescrites</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0cd15a" />
      ) : prescriptions.length === 0 ? (
        <Text style={styles.noData}>Aucune analyse prescrite pour le moment.</Text>
      ) : (
        prescriptions.map((analyse) => (
          <View key={analyse.id} style={styles.card}>
            <Text style={styles.label}>🧪 Nom de l'analyse :</Text>
            <Text style={styles.value}>{analyse.nom}</Text>

            <Text style={styles.label}>📋 Description :</Text>
            <Text style={styles.value}>{analyse.description}</Text>
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
    marginBottom: 8,
    color: '#555',
  },
  noData: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
  },
});

export default AnalysePrescriteScreen;
