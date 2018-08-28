export const setUser = ({ id, role, token }, username) => {
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
  localStorage.setItem('id', id);
  localStorage.setItem('role', role);
};

export const removeUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('id');
  localStorage.removeItem('role');
};
