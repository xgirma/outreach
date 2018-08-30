import { header, BASE_URL } from '../helper';

const headers = { ...header };

export const signinService = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
