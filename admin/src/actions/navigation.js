import { History } from '../helper';

const navigate = (path) => ({ type: 'NAVIGATE_TO', path });

export const navigateTo = (path) => (dispatch) => {
  History.push(`/${path}`);
  dispatch(navigate(`${path}`));
};
