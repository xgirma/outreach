import { getService, deleteService, updateService, addService } from '../services';
import { INFORMATION } from '../helper';

const resource = 'info';

const infoIsLoading = (loading) => ({
  type: INFORMATION.LOADING,
  isLoading: loading,
});

const getInfoSuccess = (items, error) => ({
  type: INFORMATION.GET_SUCCESS,
  items,
  error,
});

const getInfoFailure = (failed) => ({
  type: INFORMATION.GET_FAILURE,
  getFailed: failed,
});

const deleteInfoSuccess = (error) => ({
  type: INFORMATION.DELETE_SUCCESS,
  error,
});

const deleteInfoFailure = (failed) => ({
  type: INFORMATION.DELETE_FAILURE,
  deleteFailed: failed,
});

const updateInfoSuccess = (error) => ({
  type: INFORMATION.UPDATE_SUCCESS,
  error,
});

const updateInfoFailure = (failed) => ({
  type: INFORMATION.UPDATE_FAILURE,
  updateFailed: failed,
});

const addInfoSuccess = (error) => ({
  type: INFORMATION.ADD_SUCCESS,
  error,
});

const addInfoFailure = (failed) => ({
  type: INFORMATION.ADD_FAILURE,
  addFailed: failed,
});

export const clearInfoForm = () => ({
  type: INFORMATION.CLEAR,
  error: {},
});

export const getInformation = () => async (dispatch) => {
  dispatch(infoIsLoading(true));

  try {
    const result = await getService(resource);
    if (result) {
      const { data, status } = result;
      const items = status === 'success' ? data : [];
      const error = status !== 'success' ? data : {};

      dispatch(getInfoSuccess(items, error));
      dispatch(infoIsLoading(false));
      return result;
    }
  } catch (error) {
    dispatch(getInfoFailure(true));
    dispatch(infoIsLoading(false));
  }
  return {};
};

export const deleteInformation = (id) => async (dispatch) => {
  try {
    const result = await deleteService(resource, id);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(deleteInfoSuccess(error));
      return result;
    }
  } catch (error) {
    dispatch(deleteInfoFailure(true));
  }

  return {};
};

export const updateInformation = (body) => async (dispatch) => {
  try {
    const result = await updateService(resource, body);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(updateInfoSuccess(error));
      return result;
    }
  } catch (error) {
    dispatch(updateInfoFailure(true));
  }

  return {};
};

export const addInformation = (body) => async (dispatch) => {
  try {
    const result = await addService(resource, body);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(addInfoSuccess(error));
      return result;
    }
  } catch (error) {
    dispatch(addInfoFailure(true));
  }

  return {};
};
