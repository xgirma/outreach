import { getService, deleteService, updateService, addService } from '../services';

const resource = 'media';

const getMediaSuccess = () => ({
  type: 'GET_MEDIA_SUCCESS',
});

const getMediaFailure = () => ({
  type: 'GET_MEDIA_FAILURE',
});

const deleteMediaSuccess = () => ({
  type: 'DELETE_MEDIA_SUCCESS',
});

const deleteMediaFailure = () => ({
  type: 'DELETE_MEDIA_FAILURE',
});

const updateMediaSuccess = () => ({
  type: 'UPDATE_MEDIA_SUCCESS',
});

const updateMediaFailure = () => ({
  type: 'UPDATE_MEDIA_FAILURE',
});

const addMediaSuccess = () => ({
  type: 'ADD_MEDIA_SUCCESS',
});

const addMediaFailure = () => ({
  type: 'ADD_MEDIA_FAILURE',
});

export const getMedia = () => async (dispatch) => {
  const result = await getService(resource);
  const { status } = result;

  if (status === 'success') {
    dispatch(getMediaSuccess());
  }

  if (status === 'fail') {
    dispatch(getMediaFailure());
  }

  return result;
};

export const deleteMedia = (id) => async (dispatch) => {
  const result = await deleteService(resource, id);
  const { status } = result;

  if (status === 'success') {
    dispatch(deleteMediaSuccess());
  }

  if (status === 'fail') {
    dispatch(deleteMediaFailure());
  }

  return result;
};

export const updateMedia = (body) => async (dispatch) => {
  const result = await updateService(resource, body);
  const { status } = result;

  if (status === 'success') {
    dispatch(updateMediaSuccess());
  }

  if (status === 'fail') {
    dispatch(updateMediaFailure());
  }

  return result;
};

export const addMedia = (body) => async (dispatch) => {
  const result = await addService(resource, body);
  const { status } = result;

  if (status === 'success') {
    dispatch(addMediaSuccess());
  }

  if (status === 'fail') {
    dispatch(addMediaFailure());
  }

  return result;
};
