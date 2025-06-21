import axios from 'axios';

const API_URL = '/api/resume/analyze'; // Your Express route

export const analyzeResume = async (file, userType, experienceLevel) => {
  try {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('userType', userType);
    formData.append('experienceLevel', experienceLevel);

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Resume analysis error:', error.message);
    throw new Error(
      error.response?.data?.error || 'Internal server error occurred'
    );
  }
};