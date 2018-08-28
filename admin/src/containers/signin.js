import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SigninForm from '../forms/signin';
import { signin } from '../actions';

function mapStateToProps(state) {
  const { signingIn } = state.authentication;
  return {
    signingIn,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    signin,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SigninForm);
