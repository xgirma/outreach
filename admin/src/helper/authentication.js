import jwtDecode from 'jwt-decode';

const TOKEN = 'ortoken';
const USERNAME = 'orusername';
const ID = 'orid';
const ROLE = 'orrole';

export const setUser = ({ id, role, token }, username) => {
  localStorage.setItem(TOKEN, token);
  localStorage.setItem(USERNAME, username);
  localStorage.setItem(ID, id);
  localStorage.setItem(ROLE, role);
};

export const removeUser = () => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USERNAME);
  localStorage.removeItem(ID);
  localStorage.removeItem(ROLE);
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

export const getToken = () => {
  return isTokenAlive() ? localStorage.getItem(TOKEN) : null;
};
