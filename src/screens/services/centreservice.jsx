import axios from 'axios';

const AUTH_API_URL = 'http://localhost:5000/api/auth';
const CENTRE_API_URL = 'http://localhost:5000/api/centre';

export const loginUser = async (userdata) => { 
    return await axios.post(`${AUTH_API_URL}/login`, userdata); 
}
export const registerUser = async (userdata) => { 
    return await axios.post(`${AUTH_API_URL}/createcentre`, userdata); 
}
export const Searchpatient= async(cin) => {  
    return await axios.post(`${CENTRE_API_URL}/rechercher`,{cin});   
}
export const addAnalyse = async ({ id_user, formData }) => {
  try {
    const response = await axios.post(
      `${CENTRE_API_URL}/addAnalyse/${id_user}`,
      formData, // Send FormData containing the file and other data
    );
    return response.data;
  } catch (err) {
    console.error("Error uploading analysis:", err);
    throw err;
  }
};


