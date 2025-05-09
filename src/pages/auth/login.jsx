'use client';

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { loginUser } from '../../services/authservice';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [greeting, setGreeting] = useState('Bienvenue');
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bonjour');
    else if (hour < 18) setGreeting('Bon après-midi');
    else setGreeting('Bonsoir');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      if (res.status !== 200) {
        alert('Identifiants invalides');
        return;
      }
      const data = res.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id_user);
      localStorage.setItem('userRole', data.user.role);
      navigate('/acceuil');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message || 'Identifiants invalides');
      } else {
        alert('Erreur de connexion');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Left pane with dynamic greeting */}
        <div style={styles.leftPane}>
          <h1 style={styles.brandTitle}>{greeting} 👋</h1>
          <p style={styles.brandSubtitle}>
            Accédez à votre tableau de bord médical.<br />Sûr. Rapide. Efficace.
          </p>
          <img
            src="https://cdn.dribbble.com/users/720825/screenshots/14128843/media/9e18a7a865d1a3b13cf3c63e21f5ee83.png?resize=800x600&vertical=center"
            alt="Medical Illustration"
            style={styles.image}
          />
        </div>

        {/* Right pane login form */}
        <div style={styles.rightPane}>
          <h2 style={styles.formTitle}>Connexion</h2>
          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
                placeholder="docteur@example.com"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
                placeholder="Mot de passe"
              />
            </div>

            <button type="submit" style={styles.button}>
              Se connecter
            </button>
          </form>

          <div style={styles.links}>
            <Link to="/forgot-password" style={styles.link}>
              Mot de passe oublié ?
            </Link>
            <Link to="/register" style={styles.link}>
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    background: 'linear-gradient(to right, #a8edea, #fed6e3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', sans-serif",
    margin: 0,
    padding: 0,
  },
  card: {
    display: 'flex',
    width: '100%',
    maxWidth: '1200px',
    height: '80vh',
    background: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '1.5rem',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(10px)',
  },
  leftPane: {
    flex: 1,
    background: 'linear-gradient(to bottom right, #3a7bd5, #00d2ff)',
    color: 'white',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  brandSubtitle: {
    fontSize: '1.1rem',
    textAlign: 'center',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    maxWidth: '300px',
  },
  image: {
    width: '80%',
    maxWidth: '280px',
    borderRadius: '1rem',
  },
  rightPane: {
    flex: 1,
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#3a7bd5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '360px',
    gap: '1.25rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.95rem',
    fontWeight: '500',
    color: '#2d3748',
  },
  input: {
    padding: '0.85rem 1rem',
    borderRadius: '0.75rem',
    border: '1px solid #cbd5e0',
    fontSize: '1rem',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '1rem',
    background: 'linear-gradient(to right, #3a7bd5, #00d2ff)',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    width: '100%',
  },
  links: {
    textAlign: 'center',
    marginTop: '1.5rem',
  },
  link: {
    display: 'block',
    marginTop: '0.5rem',
    color: '#3a7bd5',
    textDecoration: 'none',
    fontWeight: '500',
  },
};
