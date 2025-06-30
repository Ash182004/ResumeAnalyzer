import axios from 'axios';

const API_BASE_URL = '/api';


const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          window.dispatchEvent(new Event('unauthorized'));
          break;
        case 403:
          error.message = 'You are not authorized to perform this action';
          break;
        case 404:
          error.message = 'The requested resource was not found';
          break;
        case 500:
          error.message = 'Internal server error occurred';
          break;
        default:
          error.message = error.response.data?.message || 'An error occurred';
      }
    } else if (error.request) {
      error.message = 'Network error - please check your connection';
    } else {
      error.message = 'Request setup error';
    }

    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);

    if (!response.data.token) {
      throw new Error('No authentication token received');
    }

    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};


export const getProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error) {
    console.error('Profile fetch error:', error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.post('/auth/refresh');
    const newToken = response.data.token;
    localStorage.setItem('token', newToken);
    return newToken;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
};

export const analyzeResume = async (formData, config) => {
  try {
    const response = await api.post('/resume/analyze', formData, config);
    return response.data; 
  } catch (error) {
    console.error('Resume analysis error:', error);
    throw error;
  }
};


export default api;
