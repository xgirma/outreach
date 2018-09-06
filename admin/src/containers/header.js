import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/header';
import { navigateTo } from '../actions';

function mapStateToProps(state) {
  const { signedIn, username } = state.authentication;

  return {
    signedIn,
    username,
  };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
  {
    navigateTo,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
