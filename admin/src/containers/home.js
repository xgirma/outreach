import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Home } from '../components';

function mapStateToProps(state) {
  return { state };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
