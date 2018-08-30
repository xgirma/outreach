import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InformationForm from '../forms/information';
import { getInformation } from '../actions';

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInformation,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(InformationForm);
