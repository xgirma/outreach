import { MEDIA } from '../helper';

export default function media(
  state = {
    getFailed: false,
    deleteFailed: false,
    updateFailed: false,
    addFailed: false,
    error: {},
  },
  action,
) {
  if (action.type === MEDIA.LOADING) {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  }

  if (action.type === MEDIA.GET_SUCCESS) {
    return {
      ...state,
      items: action.items,
      error: action.error,
    };
  }

  if (action.type === MEDIA.GET_FAILURE) {
    return {
      ...state,
      getFailed: action.getFailed,
    };
  }

  if (action.type === MEDIA.DELETE_SUCCESS) {
    return {
      ...state,
      error: action.error,
    };
  }

  if (action.type === MEDIA.DELETE_FAILURE) {
    return {
      ...state,
      deleteFailed: action.deleteFailed,
    };
  }

  if (action.type === MEDIA.UPDATE_SUCCESS) {
    return {
      ...state,
      error: action.error,
    };
  }

  if (action.type === MEDIA.UPDATE_FAILURE) {
    return {
      ...state,
      updateFailed: action.updateFailed,
    };
  }

  if (action.type === MEDIA.ADD_SUCCESS) {
    return {
      ...state,
      error: action.error,
    };
  }

  if (action.type === MEDIA.ADD_FAILURE) {
    return {
      ...state,
      addFailed: action.addFailed,
    };
  }

  if (action.type === MEDIA.CLEAR) {
    return {
      ...state,
      error: action.error,
    };
  }

  return state;
}
