import { getService, deleteService, updateService, addService } from '../services';
import { BLOG } from '../helper';

const resource = 'blog';

const blogIsLoading = (loading) => ({
  type: BLOG.LOADING,
  isLoading: loading,
});

const getBlogSuccess = (items, error) => ({
  type: BLOG.GET_SUCCESS,
  items,
  error,
});

const getBlogFailure = (failed) => ({
  type: BLOG.GET_FAILURE,
  getFailed: failed,
});

const deleteBlogSuccess = (error) => ({
  type: BLOG.DELETE_SUCCESS,
  error,
});

const deleteBlogFailure = (failed) => ({
  type: BLOG.DELETE_FAILURE,
  deleteFailed: failed,
});

const updateBlogSuccess = (error) => ({
  type: BLOG.UPDATE_SUCCESS,
  error,
});

const updateBlogFailure = (failed) => ({
  type: BLOG.UPDATE_FAILURE,
  updateFailed: failed,
});

const addBlogSuccess = (error) => ({
  type: BLOG.ADD_SUCCESS,
  error,
});

const addBlogFailure = (failed) => ({
  type: BLOG.ADD_FAILURE,
  addFailed: failed,
});

export const clearBlogForm = () => ({
  type: BLOG.CLEAR,
  error: {},
});

export const getBlog = () => async (dispatch) => {
  let result;

  try {
    result = await getService(resource);
    if (result) {
      const { data, status } = result;
      const items = status === 'success' ? data : [];
      const error = status !== 'success' ? data : {};
      dispatch(getBlogSuccess(items, error));
      dispatch(blogIsLoading(false));
    }
  } catch (error) {
    dispatch(getBlogFailure(true));
    dispatch(blogIsLoading(false));
  }

  return result;
};

export const deleteBlog = (id) => async (dispatch) => {
  let result;

  try {
    result = await deleteService(resource, id);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(deleteBlogSuccess(error));
      return result;
    }
  } catch (error) {
    dispatch(deleteBlogFailure(true));
  }

  return result;
};

export const updateBlog = (body) => async (dispatch) => {
  let result;

  try {
    result = await updateService(resource, body);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(updateBlogSuccess(error));
      return result;
    }
  } catch (error) {
    dispatch(updateBlogFailure(true));
  }

  return result;
};

export const addBlog = (body) => async (dispatch) => {
  let result;

  try {
    result = await addService(resource, body);
    if (result) {
      const { status, data } = result;
      const error = status !== 'success' ? data : {};
      dispatch(addBlogSuccess(error));
      return result;
    }
  } catch (error) {
    dispatch(addBlogFailure(true));
  }

  return result;
};
