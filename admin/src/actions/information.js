import { getInformationService } from '../services';

const getInfoSuccess = () => ({
  type: 'GET_INFORMATION_SUCCESS',
});

const getInfoFailure = () => ({
  type: 'GET_INFORMATION_SUCCESS',
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
