import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";



// Skills
export const getSkills = () => axios.get(`${BASE_URL}skills/`);
export const addSkill = (data) => axios.post(`${BASE_URL}skills/`, data);
export const updateSkill = (id, data) => axios.put(`${BASE_URL}skills/${id}/`, data);
export const deleteSkill = (id) => axios.delete(`${BASE_URL}skills/${id}/`);

// Weekly Plans
export const getPlans = () => axios.get(`${BASE_URL}plans/`);
export const addPlan = (data) => axios.post(`${BASE_URL}plans/`, data);

// Certificates
export const getCertificates = () => axios.get(`${BASE_URL}certificates/`);
export const addCertificate = (data) => axios.post(`${BASE_URL}certificates/`, data, {
  headers: {
    "Content-Type": "multipart/form-data"
  }
});
