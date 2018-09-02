import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ServicesForm } from '../forms';
import { getServices, deleteServices, updateServices, addServices } from '../actions';

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getServices,
      deleteServices,
      updateServices,
      addServices,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(ServicesForm);
