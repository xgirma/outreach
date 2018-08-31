import {
  getService,
  deleteService,
  updateService,
  addService,
} from '../services';

const resource = 'service';

const getServiceSuccess = () => ({
  type: 'GET_SERVICES_SUCCESS',
});

const getServiceFailure = () => ({
  type: 'GET_SERVICES_FAILURE',
});

const deleteServiceSuccess = () => ({
  type: 'DELETE_SERVICES_SUCCESS',
});

const deleteServiceFailure = () => ({
  type: 'DELETE_SERVICES_FAILURE',
});

const updateServiceSuccess = () => ({
  type: 'UPDATE_SERVICES_SUCCESS',
});

const updateServiceFailure = () => ({
  type: 'UPDATE_SERVICES_FAILURE',
});

const addServiceSuccess = () => ({
  type: 'ADD_SERVICES_SUCCESS',
});

const addServiceFailure = () => ({
  type: 'ADD_SERVICES_FAILURE',
});

export const getServices = () => async (dispatch) => {
  const result = await getService(resource);
  const { status } = result;
  
  if (status === 'success') {
    dispatch(getServiceSuccess());
  }
  
  if (status === 'fail') {
    dispatch(getServiceFailure());
  }
  
  return result;
};

export const deleteServices = (id) => async (dispatch) => {
  const result = await deleteService(resource, id);
  const { status } = result;
  
  if (status === 'success') {
    dispatch(deleteServiceSuccess());
  }
  
  if (status === 'fail') {
    dispatch(deleteServiceFailure());
  }
  
  return result;
};

export const updateServices = (body) => async (dispatch) => {
  const result = await updateService(resource, body);
  const { status } = result;
  
  if (status === 'success') {
    dispatch(updateServiceSuccess());
  }
  
  if (status === 'fail') {
    dispatch(updateServiceFailure());
  }
  
  return result;
};

export const addServices = (body) => async (dispatch) => {
  const result = await addService(resource, body);
  const { status } = result;
  
  if (status === 'success') {
    dispatch(addServiceSuccess());
  }
  
  if (status === 'fail') {
    dispatch(addServiceFailure());
  }
  
  return result;
};
