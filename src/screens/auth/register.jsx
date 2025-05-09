'use client';

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { registerUser } from '../services/centreservice';

export default function RegisterCentreAnalyse() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nom: '',
    adresse: '',
    telephone: '',
    role: 'centre',
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("❌ Les mots de passe ne correspondent pas !");
      return;
    }
    try {
      const userData = {
        email: form.email,
       password: form.password,
        role: form.role,
        nom: form.nom,
        adresse: form.adresse,
        telephone: form.telephone,
      };
      const res = await registerUser(userData);
      if (res.status !== 200) {
        alert(res.data.message);
        return;
      }
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Une erreur est survenue lors de l'inscription.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Créer un compte <br/>Centre d'Analyse</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
          value={form.confirmPassword}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="nom"
          placeholder="Nom du centre"
          value={form.nom}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="adresse"
          placeholder="Adresse"
          value={form.adresse}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="telephone"
          placeholder="Téléphone"
          value={form.telephone}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>S'inscrire</button>

        <p style={styles.link}>
          Déjà inscrit ? <Link to="/" style={styles.linkAnchor}>Se connecter</Link>
        </p>
      </form>

      <style jsx>{`
        input:focus {
          border: 2px solid #3a7bd5;
          outline: none;
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    padding: '2rem',
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '3rem',
    borderRadius: '1.5rem',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.08), 0 5px 15px rgba(0, 0, 0, 0.03)',
    maxWidth: '500px',
    width: '100%',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
  },
  title: {
    textAlign: 'center',
    background: 'linear-gradient(to right, #3a7bd5, #00d2ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '2.5rem',
    fontSize: '2rem',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  input: {
    width: '100%',
    padding: '0.9rem 1.2rem',
    marginBottom: '1.2rem',
    borderRadius: '0.75rem',
    border: '1px solid rgba(203, 213, 225, 0.5)',
    fontSize: '1rem',
    backgroundColor: 'rgba(241, 245, 249, 0.5)',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
    color: 'white',
    fontWeight: '600',
    border: 'none',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(58, 123, 213, 0.2)',
  },
  link: {
    marginTop: '1.5rem',
    textAlign: 'center',
    fontSize: '0.95rem',
    color: '#4a5568',
  },
  linkAnchor: {
    color: '#3a7bd5',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
};
