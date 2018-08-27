import { headers } from '../helper';
const SIGNIN_URL = 'http://localhost:3005/api/v1/signin';

export const signinService = async (username, password) => {
  try {
    const response = await fetch(`${SIGNIN_URL}`, {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers,
    });
    
    const result = await response.json();
    return result;
  } catch(error){
    throw error;
  }
};

export const signoutService = () => {};
