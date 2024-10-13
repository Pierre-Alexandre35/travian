import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  withCredentials: true  // Important to include cookies
});

export const login = async (username: string, password: string) => {
  const response = await apiClient.post('/token', 
    new URLSearchParams({
      username: username,
      password: password
    }), 
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response.data;
};

export const getAllVillages = async () => {
  const response = await apiClient.get('/all_villages');
  return response.data;
};

export const getUserInfo = async () => {
  const response = await apiClient.get('/me');
  return response.data;
};

export default apiClient;
