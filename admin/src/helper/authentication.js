import jwtDecode from 'jwt-decode';

export const setUser = ({ id, role, token }, username) => {
  localStorage.setItem('ortoken', token);
  localStorage.setItem('orusername', username);
  localStorage.setItem('orid', id);
  localStorage.setItem('orrole', role);
};

export const removeUser = () => {
  localStorage.removeItem('ortoken');
  localStorage.removeItem('orusername');
  localStorage.removeItem('orid');
  localStorage.removeItem('orrole');
};

export const isTokenAlive = () => {
  const token = localStorage.getItem('ortoken');

  if (token) {
    const decoded = jwtDecode(token);
    const now = Date.now().valueOf() / 1000;
    return typeof decoded.exp !== 'undefined' && decoded.exp > now;
  }

  return false;
};
