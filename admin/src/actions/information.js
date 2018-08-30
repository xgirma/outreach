import { getInformationService, deleteInformationService } from '../services';

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

export const getInformation = () => async (dispatch) => {
  const result = await getInformationService();
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
  const result = await deleteInformationService(id);
  const { status } = result;

  if (status === 'success') {
    dispatch(deleteInfoSuccess());
  }

  if (status === 'fail') {
    dispatch(deleteInfoFailure());
  }

  return result;
};
