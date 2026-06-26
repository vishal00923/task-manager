import axios from 'axios';

import { BASE_URL } from './apiPaths';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors globally
    if (error.res) {
      if (error.res.status === 401) {
        // Redierct to login page
        window.location.href = '/login';
      } else if (error.res.status === 500) {
        console.error('Server error, please try again later.');
      }
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout, please try again.');
    }
    return Promise.reject(error);
  },
);
