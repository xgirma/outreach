import { getService, updateService, addService, deleteService } from '../services';
import { ADMIN } from '../helper';

const resource = 'admins';

const adminIsLoading = (loading) => ({
  type: ADMIN.LOADING,
  isLoading: loading,
});

const getAdminSuccess = (admins, error) => ({
  type: ADMIN.GET_SUCCESS,
  admins,
  fetchError: error,
});

const getAdminFailure = (failed) => ({
  type: ADMIN.GET_FAILURE,
  getFailed: failed,
});

const changePasswordSuccess = (error) => ({
  type: ADMIN.CHANGE_PASSWORD_SUCCESS,
  error,
});

const changePasswordFailure = (failure) => ({
  type: ADMIN.CHANGE_PASSWORD_FAILURE,
  updateFailed: failure,
});

const createAdminSuccess = (error, newUsername, temporaryPassword) => ({
  type: ADMIN.ADD_SUCCESS,
  error,
  newUsername,
  temporaryPassword,
});

const createAdminFailure = (failure) => ({
  type: ADMIN.ADD_FAILURE,
  addFailed: failure,
});

const deleteAdminSuccess = (error) => ({
  type: ADMIN.DELETE_SUCCESS,
  error,
});

const deleteAdminFailure = (failure) => ({
  type: ADMIN.DELETE_FAILURE,
  deleteFailed: failure,
});

const resetPasswordSuccess = (error, id, temporaryPassword) => ({
  type: ADMIN.RESET_PASSWORD_SUCCESS,
  error,
  id,
  temporaryPassword,
});

const resetPasswordFailure = (failure) => ({
  type: ADMIN.RESET_PASSWORD_FAILURE,
  resetFailed: failure,
});

export const getAdmin = () => async (dispatch) => {
  dispatch(adminIsLoading(true));
  let result;

  try {
    result = await getService(resource);
    if (result) {
      const { status, data } = result;
      const admins = status === 'success' ? data.admins : [];
      const error = status !== 'success' ? data : {};

      dispatch(getAdminSuccess(admins, error));
      dispatch(adminIsLoading(false));
    }
  } catch (error) {
    dispatch(getAdminFailure(true));
    dispatch(adminIsLoading(false));
  }

  return result;
};

export const changePassword = (body) => async (dispatch) => {
  let result;

  try {
    result = await updateService(resource, body);
    if (body._id) {
      const id = body._id;
      if (result) {
        const { status, data } = result;
        const error = status !== 'success' ? data : {};
        const temporaryPassword = data.temporaryPassword ? data.temporaryPassword : '';
        dispatch(resetPasswordSuccess(error, id, temporaryPassword));
      }
    } else if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(changePasswordSuccess(error));
    }
  } catch (error) {
    if (body._id) {
      dispatch(resetPasswordFailure(true));
    } else {
      dispatch(changePasswordFailure(true));
    }
  }

  return result;
};

export const addNewAdmin = (body) => async (dispatch) => {
  let result;
  const newUsername = body.username;
  try {
    result = await addService(resource, body);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      const temporaryPassword = data.temporaryPassword ? data.temporaryPassword : '';
      dispatch(createAdminSuccess(error, newUsername, temporaryPassword));
    }
  } catch (error) {
    dispatch(createAdminFailure(true));
  }

  return result;
};

export const deleteAdmin = (id) => async (dispatch) => {
  let result;

  try {
    result = await deleteService(resource, id);
    const { status, data } = result;
    const error = status !== 'success' ? data : {};
    dispatch(deleteAdminSuccess(error));
  } catch (error) {
    dispatch(deleteAdminFailure(true));
  }

  return result;
};
