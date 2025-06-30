import api from './api';

const PATIENT_API_URL = 'http://192.168.1.2:5000/api/patient';

export const getALLMaladie = async (id_user) => {
  return await api.get(`${PATIENT_API_URL}/maladie/${id_user}`);
};
export const getALLRdv = async (id_user) => {
  return await api.get(`${PATIENT_API_URL}/rdv/${id_user}`);
};
export const getAllMedicament = async (id_user) => {
  return await api.get(`${PATIENT_API_URL}/medicament/${id_user}`);
};

export const getALLconsultation = async (id_user) => {
  return await api.get(`${PATIENT_API_URL}/consultation/${id_user}`);
};
export const getAnalyse = async (id_user, etat) => {
  return await api.get(`${PATIENT_API_URL}/analyse/${id_user}/${etat}`);
};
export const getPdfUrl = (filename) => {
  return `http://192.168.1.8:5000/api/patient/uploads/${filename.replace('/uploads/', '')}`;
};
