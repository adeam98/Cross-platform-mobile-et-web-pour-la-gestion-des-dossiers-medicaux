'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Calendar, Clock } from 'lucide-react';
import { getconsultation } from '../services/medcinservice';

export default function RapportConsultationPage() {
  const [rapports, setRapports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getconsultation(localStorage.getItem('patientId'));
        if (res.status === 200) {
          const sorted = res.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setRapports(sorted);
        }
      } catch (err) {
        console.error('Erreur récupération rapports :', err);
      }
    })();
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Rapports de Consultation</h1>
        <button style={styles.addButton} onClick={() => navigate('/add/consultation')}>
          + Ajouter
        </button>
      </header>
      <div style={styles.grid}>
        {rapports.length ? (
          rapports.map((r) => (
            <div key={r.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <Calendar size={20} style={styles.iconMain} />
                <span style={styles.dateText}>{new Date(r.date).toLocaleDateString()}</span>
                <Clock size={20} style={styles.iconSpacing} />
                <span style={styles.dateText}>{r.heure}</span>
              </div>
              <div style={styles.cardBody}>
                <FileText size={18} style={styles.iconMain} />
                <p style={styles.bodyText}>{r.rapport}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.emptyText}>Aucun rapport disponible.</p>
        )}
      </div>
      <style>{`
        .rc-card:hover { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(0,0,0,0.15); }
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
    color: '#de6800',
  },
  addButton: {
    padding: '0.8rem 1.6rem',
    background: 'linear-gradient(135deg, #de6800, #f99f45)',
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
    color: '#4b5563',
    fontSize: '1rem',
  },
  iconMain: {
    color: '#de6800',
  },
  iconSpacing: {
    marginLeft: '0.5rem',
  },
  dateText: {
    fontWeight: '500',
    color: '#de6800',
  },
  cardBody: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
  },
  bodyText: {
    fontSize: '1rem',
    color: '#374151',
  },
  emptyText: {
    gridColumn: '1/-1',
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '1.2rem',
  },
};
