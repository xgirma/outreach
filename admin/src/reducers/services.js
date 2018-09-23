import { SERVICES } from '../helper';

export default function services(
  state = {
    getFailed: false,
    deleteFailed: false,
    updateFailed: false,
    addFailed: false,
    error: {},
  },
  action,
) {
  if (action.type === SERVICES.LOADING) {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  }

  if (action.type === SERVICES.GET_SUCCESS) {
    return {
      ...state,
      items: action.items,
      error: action.error,
    };
  }

  if (action.type === SERVICES.GET_FAILURE) {
    return {
      ...state,
      getFailed: action.getFailed,
    };
  }

  if (action.type === SERVICES.DELETE_SUCCESS) {
    return {
      ...state,
      error: action.error,
    };
  }

  if (action.type === SERVICES.DELETE_FAILURE) {
    return {
      ...state,
      deleteFailed: action.deleteFailed,
    };
  }

  if (action.type === SERVICES.UPDATE_SUCCESS) {
    return {
      ...state,
      error: action.error,
    };
  }

  if (action.type === SERVICES.UPDATE_FAILURE) {
    return {
      ...state,
      updateFailed: action.updateFailed,
    };
  }

  if (action.type === SERVICES.ADD_SUCCESS) {
    return {
      ...state,
      error: action.error,
    };
  }

  if (action.type === SERVICES.ADD_FAILURE) {
    return {
      ...state,
      addFailed: action.addFailed,
    };
  }

  if (action.type === SERVICES.CLEAR) {
    return {
      ...state,
      error: action.error,
    };
  }

  return state;
}
