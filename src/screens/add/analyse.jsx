import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAnalyse } from '../services/centreservice'; // Make sure the service is correct
import { motion } from 'framer-motion';
import { AiOutlineCloudUpload } from 'react-icons/ai';

export default function AddAnalyseCentre() {
  const [analyseId, setAnalyseId] = useState('');
  const [cin, setCin] = useState('');
  const [dateExamen, setDateExamen] = useState('');
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const navigate = useNavigate();

  const onDragOver = useCallback(e => { e.preventDefault(); setDragging(true); }, []);
  const onDragLeave = useCallback(e => { e.preventDefault(); setDragging(false); }, []);
  const onDrop = useCallback(e => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length) setFile(e.dataTransfer.files[0]);
  }, []);

  const handleFileSelect = e => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['application/pdf', 'image/png', 'image/jpeg'];
      if (!validTypes.includes(selectedFile.type)) {
        alert('❌ Invalid file type. Only PDF and image files are allowed.');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!analyseId.trim() || !cin.trim() || !dateExamen || !file) {
      alert('❌ Please fill in all fields.');
      return;
    }

    const id_user = localStorage.getItem('userId');
    const formData = new FormData();
    formData.append('id_analyse', analyseId);
    formData.append('cin', cin);
    formData.append('date_exam', dateExamen);
    formData.append('result', file); // Make sure this matches what the backend expects

    try {
      const response = await addAnalyse({ id_user, formData });

      if (response.message === 'Analyse added successfully!') {
        alert(' Analysis added successfully');
        navigate('/acceuil');
      } else {
        alert(' Error while adding the analysis');
      }
    } catch (err) {
      console.error('Error:', err);
      alert(' Server error, please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <motion.form style={styles.form} onSubmit={handleSubmit} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <motion.h2 style={styles.title} initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
          Ajouter un Résultat d'Analyse
        </motion.h2>

        <motion.input
          type="number"
          name="analyseId"
          placeholder="ID de l'analyse"
          value={analyseId}
          onChange={e => setAnalyseId(e.target.value)}
          style={styles.input}
          required
        />

        <motion.input
          type="text"
          name="cin"
          placeholder="CIN du patient"
          value={cin}
          onChange={e => setCin(e.target.value)}
          style={styles.input}
          required
        />

        <motion.input
          type="date"
          name="dateExamen"
          value={dateExamen}
          onChange={e => setDateExamen(e.target.value)}
          style={styles.input}
          required
        />

        <motion.div
          style={{ ...styles.dropZone, borderColor: dragging ? '#0077cc' : '#ccc', background: dragging ? '#e6f7ff' : '#f9fafe' }}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => document.getElementById('fileInput').click()}
        >
          {file ? (
            <p style={styles.fileName}>{file.name}</p>
          ) : (
            <>
              <AiOutlineCloudUpload size={48} color={dragging ? '#0077cc' : '#888'} />
              <p style={styles.dropText}>{dragging ? 'Release to drop' : 'Drag and drop file here'}</p>
              <p style={styles.dropSubtext}>(or click to select)</p>
              <input type="file" id="fileInput" style={styles.fileInput} onChange={handleFileSelect} accept="application/pdf,image/*" />
            </>
          )}
        </motion.div>

        <motion.button type="submit" style={styles.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 400, damping: 12 }}>
          Ajouter
        </motion.button>
      </motion.form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #eef2f5, #d6e4f0)',
    fontFamily: "'Segoe UI', sans-serif",
    padding: '2rem',
  },
  form: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '1rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  title: {
    fontSize: '2rem',
    textAlign: 'center',
    color: '#102a43',
    marginBottom: '0.5rem',
  },
  input: {
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
  },
  dropZone: {
    position: 'relative',
    border: '2px dashed #ccc',
    borderRadius: '0.5rem',
    padding: '2rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  dropText: {
    margin: '0.5rem 0 0',
    fontSize: '1rem',
    color: '#555',
  },
  dropSubtext: {
    fontSize: '0.85rem',
    color: '#888',
  },
  fileInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  },
  fileName: {
    fontSize: '1rem',
    color: '#102a43',
  },
  button: {
    padding: '1rem',
    background: 'linear-gradient(135deg, #00aaff, #0077cc)',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
  },
};
