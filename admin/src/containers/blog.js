import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BlogForm } from '../forms';
import { getBlog, deleteBlog, updateBlog, addBlog, clearBlogForm } from '../actions';

const mapStateToProps = (state) => {
  const { blog } = state;
  return {
    blog,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getBlog,
      deleteBlog,
      updateBlog,
      addBlog,
      clearBlogForm,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlogForm);
