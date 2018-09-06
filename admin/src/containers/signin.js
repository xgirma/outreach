import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SigninForm } from '../forms';
import { signin, signout, alertClear } from '../actions';

function mapStateToProps(state) {
  const { type, message } = state.alert;
  return {
    type,
    message,
  };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      signin,
      signout,
      alertClear,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SigninForm);
