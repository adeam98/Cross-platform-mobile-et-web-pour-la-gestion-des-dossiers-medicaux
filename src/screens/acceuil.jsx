'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Searchpatient } from './services/centreservice';

export default function AccueilCentre() {
  const [cin, setCin] = useState('');
  const [greeting, setGreeting] = useState("Bienvenue au Centre d'analyse");
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Bonjour Centre d'analyse");
    else if (hour < 18) setGreeting("Bon après-midi Centre d'analyse");
    else setGreeting("Bonsoir Centre d'analyse");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cin.trim()) {
      alert('❌ Veuillez entrer un CIN valide.');
      return;
    }
    try {
      const response = await Searchpatient(cin);
      if (response.status === 200) {
        const patient = response.data;
        localStorage.setItem('patientId', patient.id_user);
        localStorage.setItem('patientData', JSON.stringify(patient));
        navigate('/add/analyse');
      } else {
        alert('CIN invalide ou patient non trouvé');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la recherche du patient');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.leftPane}>
          <h1 style={styles.greeting}>{greeting} 👋</h1>
          <p style={styles.intro}>
            Entrez le CIN du patient pour ajouter une analyse.
          </p>
          <img
            src="https://cdn.dribbble.com/users/240029/screenshots/14282926/media/c6158397ce0ee23d99f091c4e6d0f45b.png"
            alt="Ajouter analyse"
            style={styles.image}
          />
        </div>

        <div style={styles.rightPane}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="CIN du patient"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Rechercher
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #a8edea, #fed6e3)',
    fontFamily: "'Segoe UI', sans-serif",
    margin: 0,
    padding: 0,
  },
  card: {
    display: 'flex',
    width: '90%',
    maxWidth: '1000px',
    height: '70vh',
    background: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '1.5rem',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(8px)',
  },
  leftPane: {
    flex: 1,
    background: 'linear-gradient(to bottom right, #3a7bd5, #00d2ff)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    textAlign: 'center',
  },
  greeting: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
  },
  intro: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    maxWidth: '280px',
    marginBottom: '1.5rem',
  },
  image: {
    width: '70%',
    maxWidth: '250px',
    borderRadius: '1rem',
  },
  rightPane: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  form: {
    width: '100%',
    maxWidth: '360px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  input: {
    padding: '1rem',
    fontSize: '1rem',
    borderRadius: '0.75rem',
    border: '1px solid #cbd5e0',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
  },
  button: {
    padding: '1rem',
    background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    width: '100%',
  },
};
