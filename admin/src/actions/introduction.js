import { getService, deleteService, updateService, addService } from '../services';
import { INTRODUCTION } from '../helper';

const resource = 'intro';

const introductionIsLoading = (bool) => ({ type: INTRODUCTION.LOADING, isLoading: bool });

const getIntroSuccess = (items, error) => ({ type: INTRODUCTION.GET_SUCCESS, items, error });

const getIntroFailure = (bool) => ({ type: INTRODUCTION.GET_FAILURE, getFailed: bool });

const deleteIntroSuccess = (error) => ({ type: INTRODUCTION.DELETE_SUCCESS, error });

const deleteIntroFailure = (bool) => ({ type: INTRODUCTION.DELETE_FAILURE, deleteFailed: bool });

const updateIntroSuccess = (error) => ({ type: INTRODUCTION.UPDATE_SUCCESS, error });

const updateIntroFailure = (bool) => ({ type: INTRODUCTION.UPDATE_FAILURE, updateFailed: bool });

const addIntroSuccess = (error) => ({ type: INTRODUCTION.ADD_SUCCESS, error });

const addIntroFailure = (bool) => ({ type: INTRODUCTION.ADD_FAILURE, addFailed: bool });

export const clearIntroForm = () => ({ type: INTRODUCTION.CLEAR, error: {} });

export const getIntroduction = () => async (dispatch) => {
  dispatch(introductionIsLoading(true));

  try {
    const result = await getService(resource);
    if (result) {
      const { data, status } = result;
      const items = status === 'success' ? data : [];
      const error = status !== 'success' ? data : {};

      dispatch(getIntroSuccess(items, error));
      dispatch(introductionIsLoading(false));
      return result;
    }
  } catch (error) {
    dispatch(getIntroFailure(true));
    dispatch(introductionIsLoading(false));
  }
  return {};
};

export const deleteIntroduction = (id) => async (dispatch) => {
  try {
    const result = await deleteService(resource, id);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(deleteIntroSuccess(error));
      return result;
    }
  } catch (error) {
    dispatch(deleteIntroFailure(true));
  }

  return {};
};

export const updateIntroduction = (body) => async (dispatch) => {
  try {
    const result = await updateService(resource, body);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(updateIntroSuccess(error));
      return result;
    }
  } catch (error) {
    dispatch(updateIntroFailure(true));
  }

  return {};
};

export const addIntroduction = (body) => async (dispatch) => {
  try {
    const result = await addService(resource, body);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(addIntroSuccess(error));
      return result;
    }
  } catch (error) {
    dispatch(addIntroFailure(true));
  }

  return {};
};
