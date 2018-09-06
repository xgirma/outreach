import { isTokenAlive } from '../helper/authentication';

const item = localStorage.getItem('orusername');
const username = item || 'guest';

const initialState = isTokenAlive()
  ? {
    authentication: { signedIn: true, username },
    navigation: { path: '/' },
  }
  : { navigation: { path: '/' } };

export default initialState;
