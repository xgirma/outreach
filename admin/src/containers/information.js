import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { InformationForm } from '../forms';
import {
  getInformation, deleteInformation, updateInformation, addInformation,
} from '../actions';

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getInformation,
    deleteInformation,
    updateInformation,
    addInformation,
  },
  dispatch,
);

export default connect(
  null,
  mapDispatchToProps,
)(InformationForm);
