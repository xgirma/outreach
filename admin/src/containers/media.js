import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MediaForm } from '../forms';
import { getMedia, deleteMedia, updateMedia, addMedia } from '../actions';

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
  {
    getMedia,
    deleteMedia,
    updateMedia,
    addMedia,
  },
  dispatch,
);

export default connect(
  null,
  mapDispatchToProps,
)(MediaForm);
