import axios from 'axios';

// Automatically uses the Vercel env variable in production, 
// or falls back to localhost during local development.
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://skillsfusion.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
