import {
  getEventService,
  deleteEventService,
  updateEventService,
  addEventService,
} from '../services';

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
  const result = await getEventService();
  const { status } = result;

  if (status === 'success') {
    dispatch(getEventSuccess());
  }

  if (status === 'fail') {
    dispatch(getEventFailure());
  }

  return result;
};

export const deleteEvent = (id) => async (dispatch) => {
  const result = await deleteEventService(id);
  const { status } = result;

  if (status === 'success') {
    dispatch(deleteEventSuccess());
  }

  if (status === 'fail') {
    dispatch(deleteEventFailure());
  }

  return result;
};

export const updateEvent = (body) => async (dispatch) => {
  const result = await updateEventService(body);
  const { status } = result;

  if (status === 'success') {
    dispatch(updateEventSuccess());
  }

  if (status === 'fail') {
    dispatch(updateEventFailure());
  }

  return result;
};

export const addEvent = (body) => async (dispatch) => {
  const result = await addEventService(body);
  const { status } = result;

  if (status === 'success') {
    dispatch(addEventSuccess());
  }

  if (status === 'fail') {
    dispatch(addEventFailure());
  }

  return result;
};
