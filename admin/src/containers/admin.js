import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AdminForm } from '../forms';
import { changePassword, getAdmin, addNewAdmin, deleteAdmin } from '../actions';

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changePassword,
      getAdmin,
      addNewAdmin,
      deleteAdmin,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(AdminForm);
