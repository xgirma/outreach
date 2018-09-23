import jwtDecode from 'jwt-decode';

const TOKEN = 'ortoken';
const USERNAME = 'orusername';
const ID = 'orid';
const ROLE = 'orrole';

export const setUser = async ({ id, role, token }, username) => {
  await localStorage.setItem(TOKEN, token);
  await localStorage.setItem(USERNAME, username);
  await localStorage.setItem(ID, id);
  await localStorage.setItem(ROLE, role);
};

export const removeUser = async () => {
  await localStorage.removeItem(TOKEN);
  await localStorage.removeItem(USERNAME);
  await localStorage.removeItem(ID);
  await localStorage.removeItem(ROLE);
};

export const isTokenAlive = () => {
  const token = localStorage.getItem(TOKEN);

  if (token) {
    const decoded = jwtDecode(token);
    const now = Date.now().valueOf() / 1000;
    return typeof decoded.exp !== 'undefined' && decoded.exp > now;
  }

  return false;
};

export const getToken = () => (isTokenAlive() ? localStorage.getItem(TOKEN) : null);
export const getId = () => (isTokenAlive() ? localStorage.getItem(ID) : null);
export const getRole = () => (isTokenAlive() ? localStorage.getItem(ROLE) : null);
