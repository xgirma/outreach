const item = localStorage.getItem('orusername');
const initialState = item ? { authentication: { signedIn: true, username: item } } : {};

export default initialState;
