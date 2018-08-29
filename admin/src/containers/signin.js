import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SigninForm from '../forms/signin';
import { signin, signout, alertClear } from '../actions';

function mapStateToProps(state) {
  const { signingIn } = state.authentication;
  const { type, message } = state.alert;
  return {
    signingIn,
    type,
    message
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
