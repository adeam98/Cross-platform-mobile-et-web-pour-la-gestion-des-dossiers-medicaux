'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, FileText, ClipboardList, Heart, Pill, FileCheck } from 'lucide-react';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const cards = [
    { title: 'Rendez‑vous', icon: <Calendar size={32} />, path: '/rdv', colors: ['#7caff5', '#e4f0fb'] },
    { title: 'Résultats', icon: <FileText size={32} />, path: '/resultatanalyse', colors: ['#aef5cc', '#e4f6ec'] },
    { title: 'Prescriptions', icon: <ClipboardList size={32} />, path: '/analyseprescrit', colors: ['#ec8c82', '#fbe4e4'] },
    { title: 'Maladies', icon: <Heart size={32} />, path: '/maladie', colors: ['#cc78ef', '#f1e4fb'] },
    { title: 'Médicaments', icon: <Pill size={32} />, path: '/medicament', colors: ['#49a2b0', '#e4f3fb'] },
    { title: 'Consultations', icon: <FileCheck size={32} />, path: '/consultation', colors: ['#efaa6c', '#fbf0e4'] },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Dossier Médical du Patient</h1>
        <p style={styles.subtitle}>Accédez aux données médicales</p>
      </header>
      <div style={styles.grid}>
        {cards.map((card, idx) => (
          <div
            key={idx}
            style={{
              ...styles.card,
              background: `linear-gradient(135deg, ${card.colors[0]} 0%, ${card.colors[1]} 100%)`,
              transform: hovered === idx ? 'translateY(-6px) scale(1.03)' : 'none',
              boxShadow: hovered === idx ? '0 12px 32px rgba(0,0,0,0.15)' : '0 6px 18px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => navigate(card.path)}
          >
            <div style={styles.icon}>{card.icon}</div>
            <h2 style={styles.cardTitle}>{card.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '4rem 2rem',
    background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
    fontFamily: "'Segoe UI', sans-serif",
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: '700',
    color: '#1f2937',  // darker title
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#4b5563',
    marginTop: '0.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    height: '220px',
    borderRadius: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  icon: {
    marginBottom: '1rem',
    color: '#1f2937',  // dark icon color
  },
  cardTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1f2937',  // dark text
  },
};
