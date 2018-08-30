import { header, BASE_URL, token } from '../helper';

const headers = { ...header, ...token};

export const getInformationService = async () => {
  try {
    const response = await fetch(`${BASE_URL}/info`, {
      method: 'GET',
      headers
    });
    
    const result = await response.json();
    
    console.log(result);
    return result;
  }
  catch(error) {
    throw error;
  }
};
