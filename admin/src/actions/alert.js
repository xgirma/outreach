export const alertSuccess = (message) => ({
  type: 'ALERT_SUCCESS',
  message,
});

export const alertError = (message) => ({
  type: 'ALERT_ERROR',
  message,
});

export const alertClear = () => ({
  type: 'ALERT_CLEAR',
});
