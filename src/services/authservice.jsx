import axios from 'axios';

const AUTH_API_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (userData) => {
  return await axios.post(`${AUTH_API_URL}/register`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(`${AUTH_API_URL}/login`, credentials);
};
