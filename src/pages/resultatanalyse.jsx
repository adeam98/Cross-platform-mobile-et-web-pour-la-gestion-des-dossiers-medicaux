'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Calendar, Archive } from 'lucide-react';
import { getanalyser } from '../services/medcinservice';

export default function ResultatsAnalysePage() {
  const [resultats, setResultats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getanalyser(localStorage.getItem('patientId'), 1);
        if (res.status === 200) {
          const sorted = res.data.sort(
            (a, b) => new Date(b.date_examen) - new Date(a.date_examen)
          );
          setResultats(sorted);
        }
      } catch (err) {
        console.error('Erreur récupération résultats :', err);
      }
    })();
  }, []);

  const handleView = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Résultats d'Analyses</h1>
      </header>
      <div style={styles.grid}>
        {resultats.length ? resultats.map((resu) => (
          <div key={resu.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <FileText size={24} style={styles.iconMain} />
              <h2 style={styles.cardName}>{resu.nom}</h2>
            </div>
            <div style={styles.cardInfo}>
              <Calendar size={16} style={styles.iconSmall} />
              <span style={styles.infoText}>{new Date(resu.date_examen).toLocaleDateString()}</span>
            </div>
            <div style={styles.cardInfo}>
              <Archive size={16} style={styles.iconSmall} />
              <span style={styles.infoText}>{resu.nom_centre_analyse}</span>
            </div>
            <button
              type="button"
              style={styles.viewButton}
              onClick={() => handleView(resu.pdfUrl)}
            >
              Voir le fichier
            </button>
          </div>
        )) : (
          <p style={styles.emptyText}>Aucun résultat disponible.</p>
        )}
      </div>
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
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.4rem',
    fontWeight: '700',
    color: '#3a7bd5',
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
    color: '#0aa33a',
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
    color: '#0aa33a',
  },
  infoText: {
    fontWeight: '500',
  },
  viewButton: {
    marginTop: 'auto',
    padding: '0.8rem 1.2rem',
    background: 'linear-gradient(135deg, #0aa33a, #17ff60)',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  emptyText: {
    gridColumn: '1/-1',
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '1.2rem',
  },
};

// Hover effect
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    div[style*="transition: transform"]:hover { 
      transform: translateY(-6px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.15);
    }
    button[style*="background"]:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.1);
    }
  `;
  document.head.appendChild(styleEl);
}
