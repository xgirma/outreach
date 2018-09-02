export default function admin(state = {}, action) {
  if (action.type === 'CHANGE_PASSWORD_SUCCESS') {
    return {};
  }

  if (action.type === 'CHANGE_PASSWORD_FAILURE') {
    return {};
  }

  if (action.type === 'GET_ADMIN_SUCCESS') {
    return {};
  }

  if (action.type === 'GET_ADMIN_FAILURE') {
    return {};
  }

  return state;
}
