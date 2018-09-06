import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IntroductionForm } from '../forms';
import {
  getIntroduction,
  deleteIntroduction,
  updateIntroduction,
  addIntroduction,
} from '../actions';

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getIntroduction,
      deleteIntroduction,
      updateIntroduction,
      addIntroduction,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(IntroductionForm);
