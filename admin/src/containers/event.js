import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { EventForm } from '../forms';
import { getEvent, deleteEvent, updateEvent, addEvent } from '../actions';

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
  {
    getEvent,
    deleteEvent,
    updateEvent,
    addEvent,
  },
  dispatch,
);

export default connect(
  null,
  mapDispatchToProps,
)(EventForm);
