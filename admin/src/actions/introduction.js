import {
  getIntroductionService,
  deleteIntroductionService,
  updateIntroductionService,
  addIntroductionService,
} from '../services';

const getIntroSuccess = () => ({
  type: 'GET_INTRODUCTION_SUCCESS',
});

const getIntroFailure = () => ({
  type: 'GET_INTRODUCTION_FAILURE',
});

const deleteIntroSuccess = () => ({
  type: 'DELETE_INTRODUCTION_SUCCESS',
});

const deleteIntroFailure = () => ({
  type: 'DELETE_INTRODUCTION_FAILURE',
});

const updateIntroSuccess = () => ({
  type: 'UPDATE_INTRODUCTION_SUCCESS',
});

const updateIntroFailure = () => ({
  type: 'UPDATE_INTRODUCTION_FAILURE',
});

const addIntroSuccess = () => ({
  type: 'ADD_INTRODUCTION_SUCCESS',
});

const addIntroFailure = () => ({
  type: 'ADD_INTRODUCTION_FAILURE',
});

export const getIntroduction = () => async (dispatch) => {
  const result = await getIntroductionService();
  const { status } = result;

  if (status === 'success') {
    dispatch(getIntroSuccess());
  }

  if (status === 'fail') {
    dispatch(getIntroFailure());
  }

  return result;
};

export const deleteIntroduction = (id) => async (dispatch) => {
  const result = await deleteIntroductionService(id);
  const { status } = result;

  if (status === 'success') {
    dispatch(deleteIntroSuccess());
  }

  if (status === 'fail') {
    dispatch(deleteIntroFailure());
  }

  return result;
};

export const updateIntroduction = (body) => async (dispatch) => {
  const result = await updateIntroductionService(body);
  const { status } = result;

  if (status === 'success') {
    dispatch(updateIntroSuccess());
  }

  if (status === 'fail') {
    dispatch(updateIntroFailure());
  }

  return result;
};

export const addIntroduction = (body) => async (dispatch) => {
  const result = await addIntroductionService(body);
  const { status } = result;

  if (status === 'success') {
    dispatch(addIntroSuccess());
  }

  if (status === 'fail') {
    dispatch(addIntroFailure());
  }

  return result;
};
