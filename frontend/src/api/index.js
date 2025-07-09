import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', // or your deployed Django API
});

// Skills
export const getSkills = () => API.get('/skills/');
export const addSkill = (data) => API.post('/skills/', data);
export const deleteSkill = (id) => API.delete(`/skills/${id}/`);

// Daily Tasks
export const getTasks = () => API.get('/tasks/');
export const addTask = (data) => API.post('/tasks/', data);

// Certificates
export const getCertificates = () => API.get('/certificates/');

// Quotes
export const getQuotes = () => API.get('/quotes/');

// Projects
export const getProjects = () => API.get('/projects/');
