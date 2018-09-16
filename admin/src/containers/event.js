import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { EventForm } from '../forms';
import { getEvent, deleteEvent, updateEvent, addEvent, clearEventForm } from '../actions';

const mapStateToProps = (state) => {
  const { event } = state;
  return {
    event,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEvent,
      deleteEvent,
      updateEvent,
      addEvent,
      clearEventForm,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventForm);
