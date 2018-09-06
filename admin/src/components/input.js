import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ name, title, type, value, onChange, placeholder }) => (
  <div className="form-group">
    <label htmlFor={name} className="form-label">
      {title}
    </label>
    <input
      className="form-control"
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
