import { bindActionCreators } from 'redux';
import SigninForm from '../forms/signin';
import {connect} from "react-redux";
import { signin }  from '../actions/signin';

function mapStateToProps(state) {
  const { signingIn } = state.authentication;
  return {
    signingIn
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signin
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);