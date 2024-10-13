import apiClient from '@/api/api';

export const fetchVillages = async () => {
  const response = await apiClient.get('/all_villages');
  return response.data;
};
