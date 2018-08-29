import { connect } from 'react-redux';
import Header from '../components/header';

function mapStateToProps(state) {
  const { signedIn, username } = state.authentication;

  return {
    signedIn,
    username,
  };
}

export default connect(mapStateToProps)(Header);
