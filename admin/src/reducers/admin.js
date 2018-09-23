import { ADMIN } from '../helper';

export default function admin(
  state = {
    getFailed: false,
    deleteFailed: false,
    updateFailed: false,
    addFailed: false,
    error: {},
    newUsername: '',
    temporaryPassword: '',
    fetchError: {},
    id: '',
    resetFailed: false,
  },
  action,
) {
  if (action.type === ADMIN.LOADING) {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  }

  if (action.type === ADMIN.GET_SUCCESS) {
    return {
      ...state,
      admins: action.admins,
      fetchError: action.fetchError,
    };
  }

  if (action.type === ADMIN.GET_FAILURE) {
    return {
      ...state,
      getFailed: action.getFailed,
    };
  }

  if (action.type === ADMIN.CHANGE_PASSWORD_SUCCESS) {
    return {
      ...state,
      error: action.error,
      newUsername: '',
      id: '',
      temporaryPassword: '',
    };
  }

  if (action.type === ADMIN.CHANGE_PASSWORD_FAILURE) {
    return {
      ...state,
      updateFailed: action.updateFailed,
      newUsername: '',
      id: '',
      temporaryPassword: '',
    };
  }

  if (action.type === ADMIN.ADD_SUCCESS) {
    return {
      ...state,
      error: action.error,
      newUsername: action.newUsername,
      id: '',
      temporaryPassword: action.temporaryPassword,
    };
  }

  if (action.type === ADMIN.ADD_FAILURE) {
    return {
      ...state,
      addFailed: action.addFailed,
      newUsername: '',
      id: '',
      temporaryPassword: '',
    };
  }

  if (action.type === ADMIN.DELETE_SUCCESS) {
    return {
      ...state,
      error: action.error,
      newUsername: '',
      id: '',
      temporaryPassword: '',
    };
  }

  if (action.type === ADMIN.DELETE_FAILURE) {
    return {
      ...state,
      deleteFailed: action.deleteFailed,
      newUsername: '',
      id: '',
      temporaryPassword: '',
    };
  }

  if (action.type === ADMIN.RESET_PASSWORD_SUCCESS) {
    return {
      ...state,
      error: action.error,
      id: action.id,
      newUsername: '',
      temporaryPassword: action.temporaryPassword,
    };
  }

  if (action.type === ADMIN.RESET_PASSWORD_FAILURE) {
    return {
      ...state,
      resetFailed: action.resetFailed,
      id: '',
      newUsername: '',
      temporaryPassword: '',
    };
  }

  return state;
}
