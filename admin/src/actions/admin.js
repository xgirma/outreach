import { getService, updateService } from '../services';

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
