import axios from 'axios';

const API_URL = 'http://192.168.1.11:5000/api/auth';

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/create`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/login`, credentials);
};
