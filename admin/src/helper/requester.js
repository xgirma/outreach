const BASE_URL = process.env.REACT_APP_BACKEND;

// GET and DELETE
export const requester = async (path, method, headers) => {
  try {
    const response = await fetch(`${BASE_URL}/${path}`, { method, headers });

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

// POST and PUT
export const poster = async (path, method, headers, item) => {
  const body = JSON.stringify(item);
  try {
    const response = await fetch(`${BASE_URL}/${path}`, { method, body, headers });

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
