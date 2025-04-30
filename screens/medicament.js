import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

import { getAllMedicament } from '../services/patientservice'; // Assurez-vous que ce chemin est correct
const MedicamentsPrescritsScreen = () => {
  const [medicaments, setMedicaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchMedicaments();
    }, [])
  );

  const fetchMedicaments = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        return;
      }
      const response = await getAllMedicament(userId);
      setMedicaments(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des médicaments :', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Médicaments Prescrits</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0cd15a" />
      ) : medicaments.length === 0 ? (
        <Text style={styles.emptyText}>Aucun médicament prescrit pour le moment.</Text>
      ) : (
        medicaments.map((medicament) => (
          <View key={medicament.id} style={styles.card}>
            <Text style={styles.label}>
              Nom : <Text style={styles.value}>{medicament.nom}</Text>
            </Text>
            <Text style={styles.label}>
              📝 Posologie : <Text style={styles.value}>{medicament.description}</Text>
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  card: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  value: {
    fontWeight: 'normal',
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#777',
  },
});

export default MedicamentsPrescritsScreen;
