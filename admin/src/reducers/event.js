import { EVENT } from '../helper';

export default function event(
  state = {
    getFailed: false,
    deleteFailed: false,
    updateFailed: false,
    addFailed: false,
    error: {},
  },
  action,
) {
  if (action.type === EVENT.LOADING) {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  }

  if (action.type === EVENT.GET_SUCCESS) {
    return {
      ...state,
      items: action.items,
      error: action.error,
    };
  }

  if (action.type === EVENT.GET_FAILURE) {
    return {
      ...state,
      getFailed: action.getFailed,
    };
  }

  if (action.type === EVENT.DELETE_SUCCESS) {
    return {
      ...state,
      error: action.error,
    };
  }

  if (action.type === EVENT.DELETE_FAILURE) {
    return {
      ...state,
      deleteFailed: action.deleteFailed,
    };
  }

  if (action.type === EVENT.UPDATE_SUCCESS) {
    return {
      ...state,
      error: action.error,
    };
  }

  if (action.type === EVENT.UPDATE_FAILURE) {
    return {
      ...state,
      updateFailed: action.updateFailed,
    };
  }

  if (action.type === EVENT.ADD_SUCCESS) {
    return {
      ...state,
      error: action.error,
    };
  }

  if (action.type === EVENT.ADD_FAILURE) {
    return {
      ...state,
      addFailed: action.addFailed,
    };
  }

  if (action.type === EVENT.CLEAR) {
    return {
      ...state,
      error: action.error,
    };
  }

  return state;
}
