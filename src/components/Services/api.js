 // src/components/Services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://flickfusion-backend-zn4d.onrender.com/api', // Base path for all your routes
});

export default api;
