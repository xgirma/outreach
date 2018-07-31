import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Signin from '../components/signin';
import { signinUser } from '../actions';

const mapStateToProps = ({ credential }) => ({ credential });

const mapDispatchToProps = dispatch => bindActionCreators({ signinUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
