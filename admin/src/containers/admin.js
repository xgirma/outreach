import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AdminForm } from '../forms';
import { changePassword, getAdmin } from '../actions';

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
  {
    changePassword,
    getAdmin,
  },
  dispatch,
);

export default connect(
  null,
  mapDispatchToProps,
)(AdminForm);
