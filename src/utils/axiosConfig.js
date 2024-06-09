import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Add common headers or params here if needed
    // const token = localStorage.getItem('token'); // Example of getting a token from local storage
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjA1ODY0NTRjY2YxM2RhMDgxYmZhYyIsImlhdCI6MTcxNzU5MDE3NywiZXhwIjoxNzIwMTgyMTc3fQ.SvS-k1mYW0Xji7Ce697G11tSQhsGS0nv2A1kphkKUsQ'
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
