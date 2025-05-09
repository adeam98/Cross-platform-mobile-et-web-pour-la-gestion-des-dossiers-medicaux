
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';        
import axios from 'axios'; 
import { registerUser } from '../../services/authservice';  
export default function RegisterMedcin() {
  const [form, setForm] = useState({
  email: '',
  password: '',
    nom: '',
    prenom: '',
    cin: '',
    telephone: '',
    adresse: '',
    specialite: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("❌ Les mots de passe ne correspondent pas !");
      return;
    }
    try {
      const userData = {
        email: form.email,
        password: form.password, // Use 'password' instead of 'motDePasse'
        role: 'medcin',
        nom: form.nom,
        prenom: form.prenom,
        cin: form.cin,
        telephone: form.telephone,
        adresse: form.adresse,
        specialite: form.specialite
      };
     const res = await registerUser(userData);
     if (res.status !== 200) {
       alert(res.data.message);
       return;
     }
     alert(res.data.message);
     navigate('/login');
    } catch (err) {
      console.log(err); // 👈 add this to inspect the actual error
  if (err.response && err.response.data && err.response.data.message) {
    alert(err.response.data.message); // expected to be "Email already in use" or similar
  } else {
    alert("Une erreur est survenue lors de l'inscription.");
  }
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Créer un compte <br></br> "Médecin"</h2>

        <div style={styles.inputGroup}>
          <input type="text" name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} style={styles.input} required />
          <input type="text" name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} style={styles.input} required />
        </div>

        <input type="text" name="cin" placeholder="CIN" value={form.cin} onChange={handleChange} style={styles.input} required />
        <input type="text" name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} style={styles.input} required />
        <input type="text" name="adresse" placeholder="Adresse" value={form.adresse} onChange={handleChange} style={styles.input} required />
        <input type="text" name="specialite" placeholder="Spécialité" value={form.specialite} onChange={handleChange} style={styles.input} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} required />
        <input type="password" name="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} style={styles.input} required />
        <input type="password" name="confirmPassword" placeholder="Confirmer le mot de passe" value={form.confirmPassword} onChange={handleChange} style={styles.input} required />

        <button type="submit" style={styles.button}>S'inscrire</button>
        <p style={styles.link}>Déjà inscrit ? 
          <Link to="/login" style={styles.linkAnchor}>Se connecter</Link>
          </p>
      </form>

      {/* 👇 Style pour le focus sur les inputs */}
      <style jsx>{`
        input:focus {
          border: 20px solid rgb(145, 207, 243);
          outline: none;
          box-shadow: 0.1 0 0.1 3px rgb(124, 184, 233);
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
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
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
    transition: 'all 0.3s ease'
  },
  title: {
    textAlign: 'center',
    background: 'linear-gradient(to right, #3a7bd5, #00d2ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '2.5rem',
    fontSize: '2rem',
    fontWeight: '700',
    letterSpacing: '-0.5px'
  },
  inputGroup: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
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
    /*':focus': {         les champ CSS qui sont en commentaire genere des erreur ne les touche pas a5ay adam 
      borderColor: '#3a7bd5',
      boxShadow: '0 0 0 3px rgba(58, 123, 213, 0.1)',
      backgroundColor: '#fff'
    }*/
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
    /*':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 7px 14px rgba(58, 123, 213, 0.3)'
    },*/
    /*':active': {
      transform: 'translateY(0)'
    }*/
  },
  link: {
    marginTop: '1.5rem',
    textAlign: 'center',
    fontSize: '0.95rem',
    color: '#4a5568'
  },
  linkAnchor: {
    color: '#3a7bd5',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
   /* ':hover': {
      color: '#2c5282',
      textDecoration: 'underline'
    }*/
  }
};