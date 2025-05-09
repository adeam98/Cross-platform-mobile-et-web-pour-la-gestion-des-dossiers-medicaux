'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ClipboardList, Trash2 } from 'lucide-react';
import { getmaladie, deletemaladie } from '../services/medcinservice';

export default function MaladiesPage() {
  const [maladies, setMaladies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getmaladie(localStorage.getItem('patientId'));
        if (res.status === 200) {
          const sorted = res.data.sort((a, b) => a.nom.localeCompare(b.nom));
          setMaladies(sorted);
        }
      } catch (err) {
        console.error('Erreur récupération maladies :', err);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette maladie ?')) return;
    try {
      const res = await deletemaladie(localStorage.getItem('patientId'), id);
      if (res.status === 200) {
        setMaladies(maladies.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error('Erreur suppression maladie :', err);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Maladies Diagnostiquées</h1>
        <button style={styles.addButton} onClick={() => navigate('/add/maladie')}>
          + Ajouter
        </button>
      </header>
      <div style={styles.grid}>
        {maladies.length ? (
          maladies.map((mal) => (
            <div key={mal.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <Heart size={24} style={styles.iconMain} />
                <h2 style={styles.cardName}>{mal.nom}</h2>
              </div>
              <p style={styles.cardDesc}>{mal.description}</p>
              <button
                style={styles.deleteButton}
                onClick={() => handleDelete(mal.id)}
              >
                <Trash2 size={16} style={styles.iconSmall} /> Supprimer
              </button>
            </div>
          ))
        ) : (
          <p style={styles.emptyText}>Aucune maladie disponible.</p>
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
    background: '#fff',
    borderRadius: '1rem',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  iconMain: {
    color: '#e53e3e',
  },
  cardName: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  cardDesc: {
    flex: 1,
    fontSize: '1rem',
    color: '#4a5568',
    marginBottom: '1rem',
  },
  deleteButton: {
    alignSelf: 'flex-start',
    padding: '0.6rem 1.2rem',
    background: '#e53e3e',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
  },
  iconSmall: {
    color: '#fff',
  },
  emptyText: {
    gridColumn: '1/-1',
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '1.2rem',
  },
};

// Hover effect for cards
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    div[style*="transform: translateY"]:hover { 
      transform: translateY(-6px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.15);
    }
  `;
  document.head.appendChild(styleEl);
}
