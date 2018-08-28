import { isTokenAlive } from '../helper/authentication';
const item = localStorage.getItem('orusername');
const username = item ? username : 'guest';

const initialState = isTokenAlive() ? { authentication: { signedIn: true, username } } : {};

export default initialState;
