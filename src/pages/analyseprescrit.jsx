'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, PlusCircle } from 'lucide-react';
import { getanalysep } from '../services/medcinservice';

export default function AnalysePrescritePage() {
  const [analyses, setAnalyses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getanalysep(localStorage.getItem('patientId'), 0);
        if (res.status === 200) {
          const sorted = res.data.sort((a, b) => a.nom.localeCompare(b.nom));
          setAnalyses(sorted);
        }
      } catch (err) {
        console.error('Erreur récupération analyses prescrites :', err);
      }
    })();
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Analyses Prescrites</h1>
        <button style={styles.addButton} onClick={() => navigate('/add/analyse')}>
          <PlusCircle size={20} />
          <span>Ajouter</span>
        </button>
      </header>

      <div style={styles.grid}>
        {analyses.length ? (
          analyses.map((item) => (
            <div key={item.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <ClipboardList size={24} style={styles.iconMain} />
                <h2 style={styles.cardName}>{item.nom}</h2>
              </div>
              <p style={styles.cardDesc}>{item.description}</p>
            </div>
          ))
        ) : (
          <p style={styles.emptyText}>Aucune analyse prescrite disponible.</p>
        )}
      </div>

      {/* Hover effects */}
      <style>{`
        .card:hover { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(0,0,0,0.15); }
        button:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.1); }
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
    color: '#3a7bd5',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.8rem 1.6rem',
    background: 'linear-gradient(135deg, #3a7bd5, #00d2ff)',
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
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  iconMain: {
    color: '#3a7bd5',
  },
  cardName: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  cardDesc: {
    fontSize: '1rem',
    color: '#4b5563',
    flex: 1,
  },
  emptyText: {
    gridColumn: '1/-1',
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '1.2rem',
  },
};
