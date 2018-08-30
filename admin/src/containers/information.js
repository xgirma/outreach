import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InformationForm from '../forms/information';
import { getInformation, deleteInformation } from '../actions';

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInformation,
      deleteInformation,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(InformationForm);
