import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AdminForm from '../forms/admin';
import { changePassword } from '../actions';

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changePassword,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(AdminForm);
