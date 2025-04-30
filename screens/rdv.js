import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { getALLRdv } from 'services/patientservice';

const RdvScreen = () => {
  const [rdvs, setRdvs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch RDVs when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchRDVs();
    }, [])
  );

  // Function to fetch RDVs from the backend
  const fetchRDVs = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.error('No user ID found');
        return;
      }

      const response = await getALLRdv(userId); // Ensure this API returns RDVs
      setRdvs(response.data);
    } catch (error) {
      console.error('Error fetching RDVs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Placeholder function for opening PDF (you can add functionality later)
  const openPdf = () => {
    alert('PDF view functionality will be added later.');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mes Rendez-vous</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00bcd4" />
      ) : rdvs.length === 0 ? (
        <Text style={styles.noRdv}>Aucun rendez-vous pour le moment.</Text>
      ) : (
        rdvs.map((rdv) => (
          <View key={rdv.id_rdv} style={styles.card}>
            <Text style={styles.label}>
              🗓️ Date : <Text style={styles.value}>{rdv.date}</Text>
            </Text>
            <Text style={styles.label}>
              🕒 Heure : <Text style={styles.value}>{rdv.heure}</Text>
            </Text>
            <Text style={styles.label}>
              📌 Motif : <Text style={styles.value}>{rdv.motif}</Text>
            </Text>

            {/* Display the PDF button always */}
            <TouchableOpacity style={styles.pdfButton} onPress={openPdf}>
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
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#1a1a1a',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  value: {
    fontWeight: 'normal',
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
    color: '#000',
    fontWeight: 'bold',
  },
  noRdv: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#777',
  },
});

export default RdvScreen;
