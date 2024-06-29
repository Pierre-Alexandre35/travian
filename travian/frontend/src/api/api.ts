// api.ts

import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  withCredentials: true  // Include credentials if cookies are needed
});

// Function to set the Authorization header
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAllVillages = async () => {
  const response = await apiClient.get('/all_villages');
  return response.data;
};

export default apiClient;
