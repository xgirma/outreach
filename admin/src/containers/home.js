import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/home';
import {navigateTo} from "../actions";

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
)(Home);
