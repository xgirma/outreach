import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ action, title }) => (
  <button onClick={action} type="submit">
    {title}
  </button>
);

Button.propTypes = {
  action: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
