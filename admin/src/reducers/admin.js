export default function admin(state = {}, action) {
  if (action.type === 'CHANGE_PASSWORD_SUCCESS') {
    return {}
  }

  if (action.type === 'CHANGE_PASSWORD_FAILURE') {
    return {};
  }

  return state;
}
