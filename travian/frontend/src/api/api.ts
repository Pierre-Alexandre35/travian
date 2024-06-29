// api.ts

import axios, { AxiosInstance } from 'axios';  // Correct import

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  withCredentials: true
});

export const getAllVillages = async () => {
  const response = await apiClient.get('/all_villages');
  return response.data;
};

export default apiClient;
