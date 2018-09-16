import { INTRODUCTION } from '../helper';

export default function introduction(
  state = {
    getFailed: false,
    deleteFailed: false,
    updateFailed: false,
    addFailed: false,
    error: {},
  },
  action,
) {
  if (action.type === INTRODUCTION.LOADING) {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  }

  if (action.type === INTRODUCTION.GET_SUCCESS) {
    return {
      ...state,
      items: action.items,
      error: action.error,
    };
  }

  if (action.type === INTRODUCTION.GET_FAILURE) {
    return {
      ...state,
      getFailed: action.getFailed,
    };
  }

  if (action.type === INTRODUCTION.DELETE_SUCCESS) {
    return { ...state, error: action.error };
  }

  if (action.type === INTRODUCTION.DELETE_FAILURE) {
    return {
      ...state,
      deleteFailed: action.deleteFailed,
    };
  }

  if (action.type === INTRODUCTION.UPDATE_SUCCESS) {
    return { ...state, error: action.error };
  }

  if (action.type === INTRODUCTION.UPDATE_FAILURE) {
    return { ...state, updateFailed: action.updateFailed };
  }

  if (action.type === INTRODUCTION.ADD_SUCCESS) {
    return { ...state, error: action.error };
  }

  if (action.type === INTRODUCTION.ADD_FAILURE) {
    return { ...state, addFailed: action.addFailed };
  }

  if (action.type === INTRODUCTION.CLEAR) {
    return { ...state, error: action.error };
  }

  return state;
}
