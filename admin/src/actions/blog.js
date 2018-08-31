import {
  getService,
  deleteService,
  updateService,
  addService,
} from '../services';

const resource = 'blog';

const getBlogSuccess = () => ({
  type: 'GET_BLOG_SUCCESS',
});

const getBlogFailure = () => ({
  type: 'GET_BLOG_FAILURE',
});

const deleteBlogSuccess = () => ({
  type: 'DELETE_BLOG_SUCCESS',
});

const deleteBlogFailure = () => ({
  type: 'DELETE_BLOG_FAILURE',
});

const updateBlogSuccess = () => ({
  type: 'UPDATE_BLOG_SUCCESS',
});

const updateBlogFailure = () => ({
  type: 'UPDATE_BLOG_FAILURE',
});

const addBlogSuccess = () => ({
  type: 'ADD_BLOG_SUCCESS',
});

const addBlogFailure = () => ({
  type: 'ADD_BLOG_FAILURE',
});

export const getBlog = () => async (dispatch) => {
  const result = await getService(resource);
  const { status } = result;
  
  if (status === 'success') {
    dispatch(getBlogSuccess());
  }
  
  if (status === 'fail') {
    dispatch(getBlogFailure());
  }
  
  return result;
};

export const deleteBlog = (id) => async (dispatch) => {
  const result = await deleteService(resource, id);
  const { status } = result;
  
  if (status === 'success') {
    dispatch(deleteBlogSuccess());
  }
  
  if (status === 'fail') {
    dispatch(deleteBlogFailure());
  }
  
  return result;
};

export const updateBlog = (body) => async (dispatch) => {
  const result = await updateService(resource, body);
  const { status } = result;
  
  if (status === 'success') {
    dispatch(updateBlogSuccess());
  }
  
  if (status === 'fail') {
    dispatch(updateBlogFailure());
  }
  
  return result;
};

export const addBlog = (body) => async (dispatch) => {
  const result = await addService(resource, body);
  const { status } = result;
  
  if (status === 'success') {
    dispatch(addBlogSuccess());
  }
  
  if (status === 'fail') {
    dispatch(addBlogFailure());
  }
  
  return result;
};
