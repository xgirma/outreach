import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IntroductionForm } from '../forms';
import {
  getIntroduction,
  deleteIntroduction,
  updateIntroduction,
  addIntroduction,
  clearIntroForm,
} from '../actions';

const mapStateToProps = (state) => {
  const { introduction } = state;
  return {
    introduction,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getIntroduction,
      deleteIntroduction,
      updateIntroduction,
      addIntroduction,
      clearIntroForm,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IntroductionForm);
