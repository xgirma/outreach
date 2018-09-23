import { INFORMATION } from '../helper';

export default function information(
  state = {
    getFailed: false,
    deleteFailed: false,
    updateFailed: false,
    addFailed: false,
    error: {},
  },
  action,
) {
  if (action.type === INFORMATION.LOADING) {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  }

  if (action.type === INFORMATION.GET_SUCCESS) {
    return {
      ...state,
      items: action.items,
      error: action.error,
    };
  }

  if (action.type === INFORMATION.GET_FAILURE) {
    return {
      ...state,
      getFailed: action.getFailed,
    };
  }

  if (action.type === INFORMATION.DELETE_SUCCESS) {
    return {
      ...state,
      error: action.error,
    };
  }

  if (action.type === INFORMATION.DELETE_FAILURE) {
    return {
      ...state,
      deleteFailed: action.deleteFailed,
    };
  }

  if (action.type === INFORMATION.UPDATE_SUCCESS) {
    return {
      ...state,
      error: action.error,
    };
  }

  if (action.type === INFORMATION.UPDATE_FAILURE) {
    return {
      ...state,
      updateFailed: action.updateFailed,
    };
  }

  if (action.type === INFORMATION.ADD_SUCCESS) {
    return {
      ...state,
      error: action.error,
    };
  }

  if (action.type === INFORMATION.ADD_FAILURE) {
    return {
      ...state,
      addFailed: action.addFailed,
    };
  }

  if (action.type === INFORMATION.CLEAR) {
    return {
      ...state,
      error: action.error,
    };
  }

  return state;
}
