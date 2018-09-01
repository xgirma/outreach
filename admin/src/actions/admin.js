import { addService } from '../services';

const resource = 'admins';

const changePasswordSuccess = () => ({
  type: 'CHANGE_PASSWORD_SUCCESS',
});

const changePasswordFailure = () => ({
  type: 'CHANGE_PASSWORD_FAILURE',
});

export const changePassword = (body) => async (dispatch) => {
  const result = await addService(resource, body);
  const { status } = result;
  
  if (status === 'success') {
    dispatch(changePasswordSuccess());
  }
  
  if (status === 'fail') {
    dispatch(changePasswordFailure());
  }
  
  return result;
};