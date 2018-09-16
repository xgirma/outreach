import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ServicesForm } from '../forms';
import {
  getServices,
  deleteServices,
  updateServices,
  addServices,
  clearServiceForm,
} from '../actions';

const mapStateToProps = (state) => {
  const { services } = state;
  return {
    services,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getServices,
      deleteServices,
      updateServices,
      addServices,
      clearServiceForm,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServicesForm);
