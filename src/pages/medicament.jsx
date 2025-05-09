'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pill, Clock, Info, PlusCircle } from 'lucide-react';
import { getmedicament } from '../services/medcinservice';

export default function MedicamentsPage() {
  const [medicaments, setMedicaments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getmedicament(localStorage.getItem('patientId'));
        if (res.status === 200) {
          const sorted = res.data.sort((a, b) => a.nom.localeCompare(b.nom));
          setMedicaments(sorted);
        }
      } catch (err) {
        console.error('Erreur récupération médicaments :', err);
      }
    })();
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Médicaments Prescrits</h1>
        <button style={styles.addButton} onClick={() => navigate('/add/medicament')}>
          <PlusCircle size={20} />
          <span>Ajouter</span>
        </button>
      </header>
      <div style={styles.grid}>
        {medicaments.length ? medicaments.map(med => (
          <div key={med.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <Pill size={24} style={styles.iconMain} />
              <h2 style={styles.cardName}>{med.nom}</h2>
            </div>
            <div style={styles.cardInfo}>
              <Clock size={16} style={styles.iconSmall} />
              <span style={styles.infoText}>{med.frequence} fois/jour</span>
            </div>
            <p style={styles.cardDesc}>
              <Info size={16} style={styles.iconSmall} />
              <span style={styles.infoText}>{med.description}</span>
            </p>
          </div>
        )) : (
          <p style={styles.emptyText}>Aucun médicament disponible.</p>
        )}
      </div>
      <style>{`
        div[style*="cursor: pointer"]:hover { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(0,0,0,0.15); }
        button:hover { transform: translateY(-2px); }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
    minHeight: '100vh',
    padding: '3rem 2rem',
    fontFamily: "'Segoe UI', sans-serif",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.4rem',
    fontWeight: '700',
    color: '#035d6b',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.8rem 1.6rem',
    background: 'linear-gradient(135deg, #035d6b, #45a4b8)',
    color: '#fff',
    border: 'none',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: '#fff',
    borderRadius: '1rem',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  iconMain: {
    color: '#035d6b',
  },
  cardName: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  cardInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    color: '#4b5563',
  },
  iconSmall: {
    color: '#035d6b',
  },
  infoText: {
    fontWeight: '500',
  },
  cardDesc: {
    fontSize: '1rem',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  emptyText: {
    gridColumn: '1/-1',
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '1.2rem',
  },
};
