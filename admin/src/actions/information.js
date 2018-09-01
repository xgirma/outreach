import {
  getService, deleteService, updateService, addService
} from '../services';

const resource = 'info';

const getInfoSuccess = () => ({
  type: 'GET_INFORMATION_SUCCESS',
});

const getInfoFailure = () => ({
  type: 'GET_INFORMATION_FAILURE',
});

const deleteInfoSuccess = () => ({
  type: 'DELETE_INFORMATION_SUCCESS',
});

const deleteInfoFailure = () => ({
  type: 'DELETE_INFORMATION_FAILURE',
});

const updateInfoSuccess = () => ({
  type: 'UPDATE_INFORMATION_SUCCESS',
});

const updateInfoFailure = () => ({
  type: 'UPDATE_INFORMATION_FAILURE',
});

const addInfoSuccess = () => ({
  type: 'ADD_INFORMATION_SUCCESS',
});

const addInfoFailure = () => ({
  type: 'ADD_INFORMATION_FAILURE',
});

export const getInformation = () => async (dispatch) => {
  const result = await getService(resource);
  const { status } = result;

  if (status === 'success') {
    dispatch(getInfoSuccess());
  }

  if (status === 'fail') {
    dispatch(getInfoFailure());
  }

  return result;
};

export const deleteInformation = (id) => async (dispatch) => {
  const result = await deleteService(resource, id);
  const { status } = result;

  if (status === 'success') {
    dispatch(deleteInfoSuccess());
  }

  if (status === 'fail') {
    dispatch(deleteInfoFailure());
  }

  return result;
};

export const updateInformation = (body) => async (dispatch) => {
  const result = await updateService(resource, body);
  const { status } = result;

  if (status === 'success') {
    dispatch(updateInfoSuccess());
  }

  if (status === 'fail') {
    dispatch(updateInfoFailure());
  }

  return result;
};

export const addInformation = (body) => async (dispatch) => {
  const result = await addService(resource, body);
  const { status } = result;

  if (status === 'success') {
    dispatch(addInfoSuccess());
  }

  if (status === 'fail') {
    dispatch(addInfoFailure());
  }

  return result;
};
