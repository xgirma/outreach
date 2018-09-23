import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MediaForm } from '../forms';
import { getMedia, deleteMedia, updateMedia, addMedia, clearMediaForm } from '../actions';

const mapStateToProps = (state) => {
  const { media } = state;
  return {
    media,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMedia,
      deleteMedia,
      updateMedia,
      addMedia,
      clearMediaForm,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MediaForm);
