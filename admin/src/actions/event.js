import {
  getService, deleteService, updateService, addService,
} from '../services';

const resource = 'event';

const getEventSuccess = () => ({
  type: 'GET_EVENT_SUCCESS',
});

const getEventFailure = () => ({
  type: 'GET_EVENT_FAILURE',
});

const deleteEventSuccess = () => ({
  type: 'DELETE_EVENT_SUCCESS',
});

const deleteEventFailure = () => ({
  type: 'DELETE_EVENT_FAILURE',
});

const updateEventSuccess = () => ({
  type: 'UPDATE_EVENT_SUCCESS',
});

const updateEventFailure = () => ({
  type: 'UPDATE_EVENT_FAILURE',
});

const addEventSuccess = () => ({
  type: 'ADD_EVENT_SUCCESS',
});

const addEventFailure = () => ({
  type: 'ADD_EVENT_FAILURE',
});

export const getEvent = () => async (dispatch) => {
  const result = await getService(resource);
  const { status } = result;

  if (status === 'success') {
    dispatch(getEventSuccess());
  }

  if (status === 'fail') {
    dispatch(getEventFailure());
  }

  return result;
};

export const deleteEvent = id => async (dispatch) => {
  const result = await deleteService(resource, id);
  const { status } = result;

  if (status === 'success') {
    dispatch(deleteEventSuccess());
  }

  if (status === 'fail') {
    dispatch(deleteEventFailure());
  }

  return result;
};

export const updateEvent = body => async (dispatch) => {
  const result = await updateService(resource, body);
  const { status } = result;

  if (status === 'success') {
    dispatch(updateEventSuccess());
  }

  if (status === 'fail') {
    dispatch(updateEventFailure());
  }

  return result;
};

export const addEvent = body => async (dispatch) => {
  const result = await addService(resource, body);
  const { status } = result;

  if (status === 'success') {
    dispatch(addEventSuccess());
  }

  if (status === 'fail') {
    dispatch(addEventFailure());
  }

  return result;
};
