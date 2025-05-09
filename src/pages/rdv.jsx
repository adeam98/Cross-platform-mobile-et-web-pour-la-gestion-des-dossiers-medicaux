'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ClipboardList } from 'lucide-react';
import { getrdv } from '../services/medcinservice';

export default function RendezVousPage() {
  const [rdvs, setRdvs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getrdv(localStorage.getItem('patientId'));
        if (res.status === 200) {
          const sorted = res.data.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          setRdvs(sorted);
        }
      } catch (err) {
        console.error('Erreur récupération RDVs:', err);
      }
    })();
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Rendez‑vous Médicaux</h1>
        <button
          style={styles.addButton}
          onClick={() => navigate('/add/rdv')}
        >
          + Ajouter
        </button>
      </header>
      <div style={styles.grid}>
        {rdvs.length ? (
          rdvs.map((rdv) => (
            <div
              key={rdv.id}
              style={styles.card}
              onClick={() => navigate(`/rdv/${rdv.id}`)}
            >
              <div style={styles.cardHeader}>
                <Calendar size={24} />
                <span style={styles.cardDate}>
                  {new Date(rdv.date).toLocaleDateString()}
                </span>
                <Clock size={24} style={styles.iconSpacing} />
                <span style={styles.cardTime}>{rdv.heure}</span>
              </div>
              <div style={styles.cardBody}>
                <ClipboardList size={20} style={styles.iconSpacing} />
                <span style={styles.cardMotif}>{rdv.motif}</span>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.emptyText}>Aucun rendez‑vous disponible.</p>
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
    background: '#ffffff',
    borderRadius: '1rem',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
    color: '#1f2937',
    fontSize: '1rem',
  },
  cardDate: {
    fontWeight: '600',
    color: '#3a7bd5',
  },
  iconSpacing: {
    marginLeft: '0.75rem',
  },
  cardTime: {
    fontWeight: '600',
    color: '#3a7bd5',
  },
  cardBody: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#374151',
    fontSize: '1.1rem',
  },
  cardMotif: {
    flex: 1,
    fontWeight: '500',
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
    div[style*="cursor: pointer"]:hover { 
      transform: translateY(-6px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.15);
    }
  `;
  document.head.appendChild(styleEl);
}
