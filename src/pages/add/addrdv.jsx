'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Correct for React Router
import { Link } from 'react-router-dom';        // ✅ Correct for React Router
import { addrdv } from '../../services/medcinservice'; // Importer la fonction addrdv
export default function AjouterRdvPage() {
  const [date, setDate] = useState('');
  const [heure, setHeure] = useState('');
  const [hopitale, setHopitale] = useState('');
  const [motif, setMotif] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      const id_user = localStorage.getItem('patientId');
      const response = await addrdv({ date, hopitale, heure, motif, id_user });
      if (response.status === 200 || response.status === 201) {
        alert('Rendez-vous ajouté avec succès !');
        navigate('/rdv'); 
      } else {
        alert('Erreur lors de l\'ajout du rendez-vous.');
      }
    }
    catch (error) {
      console.error('Erreur lors de l\'ajout du rendez-vous :', error);
      alert('Une erreur s\'est produite.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Ajouter un Rendez-vous</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.field}>
          <label style={styles.label}>Date :</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Heure :</label>
          <input type="time" value={heure} onChange={(e) => setHeure(e.target.value)} required style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Hôpital :</label>
          <input type="text" value={hopitale} onChange={(e) => setHopitale(e.target.value)} required placeholder="Nom de l'hôpital" style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Motif :</label>
          <textarea value={motif} onChange={(e) => setMotif(e.target.value)} required placeholder="Ex : Suivi médical, consultation..." style={styles.textarea} />
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
    backgroundColor: '#ffffff',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
    borderRadius: '10px',
    marginTop: '3rem',
  },
  title: {
    textAlign: 'center',
    fontSize: '1.8rem',
    marginBottom: '2rem',
    color: '#3a7bd5',
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
    fontWeight: 'bold',
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
    backgroundColor: '#3a7bd5',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};
