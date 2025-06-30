import axios from 'axios';

const AUTH_API_URL = 'http://localhost:5000/api/medcin';

export const Searchpatient = async (cin) =>{ 
    return await axios.post(`${AUTH_API_URL}/rechercher`, {cin}); 
}
export const getmaladie = async (id) => {
    return await axios.get(`${AUTH_API_URL}/all/${id}`);
}
export const addmaladie = async ({ nom, description, id_user }) => {
    return await axios.post(`${AUTH_API_URL}/add/maladie/${id_user}`,{
       nom,
       description
    }); 
}
export const deletemaladie = async (id_user, id_maladie) => {
    return await axios.delete(`${AUTH_API_URL}/maladie/delete/${id_user}/${id_maladie}`);
}
export const getrdv = async (id_user) => {
    return await axios.get(`${AUTH_API_URL}/RDV/${id_user}/all`);
}
export const addrdv = async ({ date, hopitale, heure, motif, id_user}) => {
    return await axios.post(`${AUTH_API_URL}/RDV/add/${id_user}`,{ 
       date,
       hopitale,
         heure,
       motif
    }); 
}

export const getmedicament = async (id_user) => {
    return await axios.get(`${AUTH_API_URL}/medicament/${id_user}`);
}
export const addmedicament = async ({ nom, frequence, description, id_user }) => {
    return await axios.post(`${AUTH_API_URL}/add/medicament/${id_user}`,{
       nom,
       frequence,
       description
    }); 
}

export const getconsultation = async (id_user) => {
    return await axios.get(`${AUTH_API_URL}/consultation/${id_user}`);
}
export const addconsultation = async ({ date,heure, rapport, id_user }) => {
    return await axios.post(`${AUTH_API_URL}/add/consultation/${id_user}`,{
       date,
       heure,
       rapport 
    }); 
}
export const getanalysep = async (id_user,etat) => {
    return await axios.get(`${AUTH_API_URL}/analysep/${id_user}/${etat}`);
}
export const getanalyser = async (id_user,etat) => {
    return await axios.get(`${AUTH_API_URL}/analyser/${id_user}/${etat}`);
}
export const addanalyse = async ({ nom, description,id_user }) => {
    return await axios.post(`${AUTH_API_URL}/add/analyse/${id_user}`,{
        nom,
        description
    }); 
}
export const getanalysepdf =async(filename) => {
   return  `${AUTH_API_URL}${filename}`;
}
