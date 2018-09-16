import { BLOG } from '../helper';

export default function blog(
  state = {
    getFailed: false,
    deleteFailed: false,
    updateFailed: false,
    addFailed: false,
    error: {},
  },
  action,
) {
  if (action.type === BLOG.LOADING) {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  }

  if (action.type === BLOG.GET_SUCCESS) {
    return {
      ...state,
      items: action.items,
      error: action.error,
    };
  }

  if (action.type === BLOG.GET_FAILURE) {
    return {
      ...state,
      getFailed: action.getFailed,
    };
  }

  if (action.type === BLOG.DELETE_SUCCESS) {
    return {
      ...state,
      error: action.error,
    };
  }

  if (action.type === BLOG.DELETE_FAILURE) {
    return {
      ...state,
      deleteFailed: action.deleteFailed,
    };
  }

  if (action.type === BLOG.UPDATE_SUCCESS) {
    return {
      ...state,
      error: action.error,
    };
  }

  if (action.type === BLOG.UPDATE_FAILURE) {
    return {
      ...state,
      updateFailed: action.updateFailed,
    };
  }

  if (action.type === BLOG.ADD_SUCCESS) {
    return {
      ...state,
      error: action.error,
    };
  }

  if (action.type === BLOG.ADD_FAILURE) {
    return {
      ...state,
      addFailed: action.addFailed,
    };
  }

  if (action.type === BLOG.CLEAR) {
    return {
      ...state,
      error: action.error,
    };
  }

  return state;
}
