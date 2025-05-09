'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';       
import { addconsultation } from '../../services/medcinservice'; 
export default function AjouterRapportPage() {
  const [rapport, setRapport] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const maintenant = new Date();
    const date = maintenant.toISOString().split('T')[0]; 
    const heure = maintenant.toTimeString().split(' ')[0]; 

    try {
      const id_user = localStorage.getItem('patientId');
      const response = await addconsultation({ date, heure, rapport, id_user });

      if (response.status === 200 || response.status === 201) {
        alert('Rapport ajouté avec succès !');
        navigate('/consultation');
      } else {
        alert('Erreur lors de l\'ajout du rapport.');
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du rapport :", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Ajouter un Rapport de Consultation</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Rapport :</label>
          <textarea
            value={rapport}
            onChange={(e) => setRapport(e.target.value)}
            required
            placeholder="Décrivez la consultation ici..."
            style={styles.textarea}
          />
        </div>

        <button type="submit" style={styles.button}>Ajouter</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#fff',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
    borderRadius: '10px',
    marginTop: '3rem',
  },
  title: {
    textAlign: 'center',
    fontSize: '1.8rem',
    marginBottom: '2rem',
    color: '#e67e22',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 600,
    marginBottom: '0.5rem',
    color: '#333',
  },
  textarea: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    minHeight: '100px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#e67e22',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};
