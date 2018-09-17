const generateCommonActions = (NAME) => ({
  LOADING: `${NAME}_IS_LOADING`,
  GET_SUCCESS: `FETCHING_${NAME}_SUCCESS`,
  GET_FAILURE: `FETCHING_${NAME}_FAILURE`,
  DELETE_SUCCESS: `DELETING_${NAME}_SUCCESS`,
  DELETE_FAILURE: `DELETING_${NAME}_FAILURE`,
  UPDATE_SUCCESS: `UPDATING_${NAME}_SUCCESS`,
  UPDATE_FAILURE: `UPDATING_${NAME}_FAILURE`,
  ADD_SUCCESS: `ADDING_${NAME}_SUCCESS`,
  ADD_FAILURE: `ADDING_${NAME}_FAILURE`,
  CLEAR: `CLEAR_${NAME}_FORM`,
});

export const INTRODUCTION = generateCommonActions('INTRODUCTION');
export const SERVICES = generateCommonActions('SERVICES');
export const EVENT = generateCommonActions('EVENT');
export const BLOG = generateCommonActions('BLOG');
export const MEDIA = generateCommonActions('MEDIA');
export const INFORMATION = generateCommonActions('INFORMATION');
