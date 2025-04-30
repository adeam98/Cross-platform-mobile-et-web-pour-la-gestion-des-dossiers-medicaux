import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

import { getALLMaladie } from '../services/patientservice';

const MaladiesScreen = () => {
  const [maladies, setMaladies] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchMaladies();
    }, [])
  );

  const fetchMaladies = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.error('No user ID found');
        return;
      }

      const response = await getALLMaladie(userId);
      setMaladies(response.data);
    } catch (error) {
      console.error('Erreur de récupération des maladies :', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Maladies</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0cd15a" />
      ) : maladies.length === 0 ? (
        <Text style={styles.noMaladie}>Aucune maladie enregistrée pour le moment.</Text>
      ) : (
        maladies.map((maladie) => (
          <View key={maladie.id_maladie} style={styles.card}>
            <Text style={styles.nom}>{maladie.nom}</Text>
            <Text style={styles.description}>{maladie.description}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: 'black',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  nom: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#1a202c' },
  description: { fontSize: 14, color: '#4a5568' },
  noMaladie: { textAlign: 'center', fontStyle: 'italic', color: '#888' },
});

export default MaladiesScreen;
