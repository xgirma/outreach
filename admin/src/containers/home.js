import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/home';

function mapStateToProps(state) {
  const { username } = state.authentication;
  return {
    username,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
