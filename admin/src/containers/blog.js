import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BlogForm from '../forms/blog';
import { getBlog, deleteBlog, updateBlog, addBlog } from '../actions';

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getBlog,
      deleteBlog,
      updateBlog,
      addBlog,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(BlogForm);
