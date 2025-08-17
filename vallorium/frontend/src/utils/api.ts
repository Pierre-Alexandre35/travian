import { BACKEND_URL } from '../config';

export const getMessage = async () => {
  const response = await fetch(BACKEND_URL);

  const data = await response.json();

  if (data.message) {
    return data.message;
  }

  return Promise.reject('Failed to get message from backend');
};

export const fetchTribes = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/tribes`); // Adjust endpoint if needed
    if (!response.ok) {
      throw new Error('Failed to fetch tribes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tribes:', error);
    return [];
  }
};