import axios from 'axios';

const PATIENT_API_URL = 'http://192.168.0.29:5000/api/patient';

export const getALLMaladie = async (id_user) => {
  return await axios.get(`${PATIENT_API_URL}/maladie/${id_user}`);
};
export const getALLRdv = async (id_user) => {
  return await axios.get(`${PATIENT_API_URL}/rdv/${id_user}`);
};
export const getAllMedicament = async (id_user) => {
  return await axios.get(`${PATIENT_API_URL}/medicament/${id_user}`);
};

export const getALLconsultation = async (id_user) => {
  return await axios.get(`${PATIENT_API_URL}/consultation/${id_user}`);
};
export const getAnalyse = async (id_user, etat) => {
  return await axios.get(`${PATIENT_API_URL}/analyse/${id_user}/${etat}`);
};
