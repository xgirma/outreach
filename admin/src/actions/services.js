import { getService, deleteService, updateService, addService } from '../services';
import { SERVICES } from '../helper';

const resource = 'service';

const servicesIsLoading = (loading) => ({
  type: SERVICES.LOADING,
  isLoading: loading,
});

const getServiceSuccess = (items, error) => ({
  type: SERVICES.GET_SUCCESS,
  items,
  error,
});

const getServiceFailure = (failed) => ({
  type: SERVICES.GET_FAILURE,
  getFailed: failed,
});

const deleteServiceSuccess = (error) => ({
  type: SERVICES.DELETE_SUCCESS,
  error,
});

const deleteServiceFailure = (failed) => ({
  type: SERVICES.DELETE_FAILURE,
  deleteFailed: failed,
});

const updateServiceSuccess = (error) => ({
  type: SERVICES.UPDATE_SUCCESS,
  error,
});

const updateServiceFailure = (failed) => ({
  type: SERVICES.UPDATE_FAILURE,
  updateFailed: failed,
});

const addServiceSuccess = (error) => ({
  type: SERVICES.ADD_SUCCESS,
  error,
});

const addServiceFailure = (failed) => ({
  type: SERVICES.ADD_FAILURE,
  addFailed: failed,
});

export const clearServiceForm = () => ({
  type: SERVICES.CLEAR,
  error: {},
});

export const getServices = () => async (dispatch) => {
  let result;

  try {
    result = await getService(resource);
    if (result) {
      const { data, status } = result;
      const items = status === 'success' ? data : [];
      const error = status !== 'success' ? data : {};
      dispatch(getServiceSuccess(items, error));
      dispatch(servicesIsLoading(false));
    }
  } catch (error) {
    dispatch(getServiceFailure(true));
    dispatch(servicesIsLoading(false));
  }

  return result;
};

export const deleteServices = (id) => async (dispatch) => {
  let result;

  try {
    result = await deleteService(resource, id);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(deleteServiceSuccess(error));
      return result;
    }
  } catch (error) {
    dispatch(deleteServiceFailure(true));
  }

  return result;
};

export const updateServices = (body) => async (dispatch) => {
  let result;

  try {
    result = await updateService(resource, body);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(updateServiceSuccess(error));
      return result;
    }
  } catch (error) {
    dispatch(updateServiceFailure(true));
  }

  return result;
};

export const addServices = (body) => async (dispatch) => {
  let result;

  try {
    result = await addService(resource, body);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(addServiceSuccess(error));
      return result;
    }
  } catch (error) {
    dispatch(addServiceFailure(true));
  }

  return result;
};
