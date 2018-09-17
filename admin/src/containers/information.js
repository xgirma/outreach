import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { InformationForm } from '../forms';
import {
  getInformation,
  deleteInformation,
  updateInformation,
  addInformation,
  clearInfoForm,
} from '../actions';

const mapStateToProps = (state) => {
  const { information } = state;
  return {
    information,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInformation,
      deleteInformation,
      updateInformation,
      addInformation,
      clearInfoForm,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InformationForm);
