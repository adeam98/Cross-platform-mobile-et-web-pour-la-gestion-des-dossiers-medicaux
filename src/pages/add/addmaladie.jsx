'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';       
import { addmaladie } from '../../services/medcinservice';
export default function AjouterMaladiePage() {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id_user = localStorage.getItem('patientId');

    try {
      const response = await addmaladie({ nom, description, id_user });

      if (response.status === 200 || response.status === 201) {
        alert('Maladie ajoutée avec succès !');
        navigate('/maladie');
      } else {
        alert('Erreur lors de l\'ajout de la maladie.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la maladie :', error);
      alert('Une erreur s\'est produite.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Ajouter une Maladie</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.field}>
          <label style={styles.label}>Nom de la maladie :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            placeholder="Ex : Diabète"
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Description :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Ex : Maladie chronique caractérisée par un excès de sucre dans le sang..."
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
    color: '#9b59b6',
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
    color: '#444',
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
    backgroundColor: '#9b59b6',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};
