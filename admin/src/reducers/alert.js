export default function alert(state = {}, action) {
  if (action.type === 'ALERT_SUCCESS') {
    return {
      type: 'alert-success',
      message: action.message,
    };
  }

  if (action.type === 'ALERT_ERROR') {
    return {
      type: 'alert-danger',
      message: action.message,
    };
  }

  if (action.type === 'ALERT_CLEAR') {
    return {};
  }

  return state;
}
