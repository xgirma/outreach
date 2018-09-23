import { getService, updateService, addService, deleteService } from '../services';

const resource = 'admins';

const changePasswordSuccess = () => ({
  type: 'CHANGE_PASSWORD_SUCCESS',
});

const changePasswordFailure = () => ({
  type: 'CHANGE_PASSWORD_FAILURE',
});

const getAdminSuccess = () => ({
  type: 'GET_ADMIN_SUCCESS',
});

const getAdminFailure = () => ({
  type: 'GET_ADMIN_FAILURE',
});

const createAdminSuccess = () => ({
  type: 'CREATE_ADMIN_SUCCESS',
});

const createAdminFailure = () => ({
  type: 'CREATE_ADMIN_FAILURE',
});

const deleteAdminSuccess = () => ({
  type: 'DELETE_ADMIN_SUCCESS',
});

const deleteAdminFailure = () => ({
  type: 'DELETE_ADMIN_FAILURE',
});

export const changePassword = (body) => async (dispatch) => {
  const result = await updateService(resource, body);
  const { status } = result;

  if (status === 'success') {
    dispatch(changePasswordSuccess());
  }

  if (status === 'fail') {
    dispatch(changePasswordFailure());
  }

  return result;
};

export const addNewAdmin = (body) => async (dispatch) => {
  const result = await addService(resource, body);

  const { status } = result;

  if (status === 'success') {
    dispatch(createAdminSuccess());
  }

  if (status === 'fail') {
    dispatch(createAdminFailure());
  }

  return result;
};

export const getAdmin = () => async (dispatch) => {
  const result = await getService(resource);
  const { status } = result;

  if (status === 'success') {
    dispatch(getAdminSuccess());
  }

  if (status === 'fail') {
    dispatch(getAdminFailure());
  }

  return result;
};

export const deleteAdmin = (id) => async (dispatch) => {
  const result = await deleteService(resource, id);
  const { status } = result;

  if (status === 'success') {
    dispatch(deleteAdminSuccess());
  }

  if (status === 'fail') {
    dispatch(deleteAdminFailure());
  }

  return result;
};
