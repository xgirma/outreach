import { getService, deleteService, updateService, addService } from '../services';
import { EVENT } from '../helper';

const resource = 'event';

const eventIsLoading = (loading) => ({
  type: EVENT.LOADING,
  isLoading: loading,
});

const getEventSuccess = (items, error) => ({
  type: EVENT.GET_SUCCESS,
  items,
  error,
});

const getEventFailure = (failed) => ({
  type: EVENT.GET_FAILURE,
  getFailed: failed,
});

const deleteEventSuccess = (error) => ({
  type: EVENT.DELETE_SUCCESS,
  error,
});

const deleteEventFailure = (failed) => ({
  type: EVENT.DELETE_FAILURE,
  deleteFailed: failed,
});

const updateEventSuccess = (error) => ({
  type: EVENT.UPDATE_SUCCESS,
  error,
});

const updateEventFailure = (failed) => ({
  type: EVENT.UPDATE_FAILURE,
  updateFailed: failed,
});

const addEventSuccess = (error) => ({
  type: EVENT.ADD_SUCCESS,
  error,
});

const addEventFailure = (failed) => ({
  type: EVENT.ADD_FAILURE,
  addFailed: failed,
});

export const clearEventForm = () => ({
  type: EVENT.CLEAR,
  error: {},
});

export const getEvent = () => async (dispatch) => {
  let result;

  try {
    result = await getService(resource);
    if (result) {
      const { data, status } = result;
      const items = status === 'success' ? data : [];
      const error = status !== 'success' ? data : {};
      dispatch(getEventSuccess(items, error));
      dispatch(eventIsLoading(false));
    }
  } catch (error) {
    dispatch(getEventFailure(true));
    dispatch(eventIsLoading(false));
  }

  return result;
};

export const deleteEvent = (id) => async (dispatch) => {
  let result;

  try {
    result = await deleteService(resource, id);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(deleteEventSuccess(error));
    }
  } catch (error) {
    dispatch(deleteEventFailure(true));
  }

  return result;
};

export const updateEvent = (body) => async (dispatch) => {
  let result;

  try {
    result = await updateService(resource, body);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(updateEventSuccess(error));
    }
  } catch (error) {
    dispatch(updateEventFailure(true));
  }

  return result;
};

export const addEvent = (body) => async (dispatch) => {
  let result;

  try {
    result = await addService(resource, body);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(addEventSuccess(error));
      return result;
    }
  } catch (error) {
    dispatch(addEventFailure(true));
  }

  return result;
};
