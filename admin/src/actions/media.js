import { getService, deleteService, updateService, addService } from '../services';
import { MEDIA } from '../helper';

const resource = 'media';

const mediaIsLoading = (loading) => ({
  type: MEDIA.LOADING,
  isLoading: loading,
});

const getMediaSuccess = (items, error) => ({
  type: MEDIA.GET_SUCCESS,
  items,
  error,
});

const getMediaFailure = (failed) => ({
  type: MEDIA.GET_FAILURE,
  getFailed: failed,
});

const deleteMediaSuccess = (error) => ({
  type: MEDIA.DELETE_SUCCESS,
  error,
});

const deleteMediaFailure = (failed) => ({
  type: MEDIA.DELETE_FAILURE,
  deleteFailed: failed,
});

const updateMediaSuccess = (error) => ({
  type: MEDIA.UPDATE_SUCCESS,
  error,
});

const updateMediaFailure = (failed) => ({
  type: MEDIA.UPDATE_FAILURE,
  updateFailed: failed,
});

const addMediaSuccess = (error) => ({
  type: MEDIA.ADD_SUCCESS,
  error,
});

const addMediaFailure = (failed) => ({
  type: MEDIA.ADD_FAILURE,
  addFailed: failed,
});

export const clearMediaForm = () => ({
  type: MEDIA.CLEAR,
  error: {},
});

export const getMedia = () => async (dispatch) => {
  let result;

  try {
    result = await getService(resource);
    if (result) {
      const { data, status } = result;
      const items = status === 'success' ? data : [];
      const error = status !== 'success' ? data : {};
      dispatch(getMediaSuccess(items, error));
      dispatch(mediaIsLoading(false));
    }
  } catch (error) {
    dispatch(getMediaFailure(true));
    dispatch(mediaIsLoading(false));
  }

  return result;
};

export const deleteMedia = (id) => async (dispatch) => {
  let result;

  try {
    result = await deleteService(resource, id);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(deleteMediaSuccess(error));
      return result;
    }
  } catch (error) {
    dispatch(deleteMediaFailure(true));
  }

  return result;
};

export const updateMedia = (body) => async (dispatch) => {
  let result;

  try {
    result = await updateService(resource, body);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(updateMediaSuccess(error));
      return result;
    }
  } catch (error) {
    dispatch(updateMediaFailure(true));
  }

  return result;
};

export const addMedia = (body) => async (dispatch) => {
  let result;

  try {
    result = await addService(resource, body);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(addMediaSuccess(error));
      return result;
    }
  } catch (error) {
    dispatch(addMediaFailure(true));
  }

  return result;
};
