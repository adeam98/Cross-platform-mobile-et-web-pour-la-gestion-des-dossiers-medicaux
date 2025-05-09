'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';        
import { addmedicament } from '../../services/medcinservice'; 
export default function AjouterMedicamentPage() {
  const [nom, setNom] = useState('');
  const [frequence, setFrequence] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id_user = localStorage.getItem('patientId');
      const response = await addmedicament({ nom, frequence, description, id_user });

      if (response.status === 200 || response.status === 201) {
        alert('Médicament ajouté avec succès !');
        navigate('/medicament'); 
      } else {
        alert('Erreur lors de l\'ajout du médicament.');
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du médicament :", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Ajouter un Médicament</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.field}>
          <label style={styles.label}>Nom du médicament :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            placeholder="Ex : Paracétamol"
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Fréquence par jour :</label>
          <input
            type="text"
            value={frequence}
            onChange={(e) => setFrequence(e.target.value)}
            required
            placeholder="Ex : 2    / fois par jour"
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Description :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Ex : Antalgique utilisé pour soulager la douleur..."
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
    color: '#087283',
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
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  textarea: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    minHeight: '80px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#087283',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};
