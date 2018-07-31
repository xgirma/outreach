const BASE_URL = 'http://localhost:3005/api/v1/';

export const signin = async (credential) => {
  const {username, password} = credential;
  try {
    const result = await fetch(`${BASE_URL}signin`, {
      method: 'POST',
      body: `username=${username}&password=${password}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return result.json();
  } catch (error) {
    throw Error(error);
  }
};

export const register = async (credential) => {
  const {username, password} = credential;
  try {
    const result = await fetch(`${BASE_URL}register`, {
      method: 'POST',
      body: `username=${username}&password=${password}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return result.json();
  } catch (error) {
    throw Error(error);
  }
};
