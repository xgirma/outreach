const BASE_URL = process.env.REACT_APP_BACKEND;

export const requester = async (path, method, headers) => {
  try {
    const response = await fetch(`${BASE_URL}/${path}`, { method, headers });

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
