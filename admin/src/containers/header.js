import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/header';
import { navigateTo } from '../actions';

function mapStateToProps(state) {
  const { signedIn, username } = state.authentication;
  const { path } = state.navigation;

  return {
    signedIn,
    username,
    path,
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
