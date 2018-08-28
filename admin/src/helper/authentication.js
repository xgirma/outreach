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
