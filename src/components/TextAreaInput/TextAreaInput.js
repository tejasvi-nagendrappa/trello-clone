import React from 'react';
import PropTypes from 'prop-types';
import './TextAreaInput.scss';

const onFocus = (evt) => {
  let { target: { value } } = evt;
  const savedVal = value;
  evt.target.value = '';
  evt.target.value = savedVal;
};

const propTypes = {
  onValueChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onFocus: PropTypes.func,
};

const defaultProps = {
  onValueChange: () => null,
  placeholder: '',
  value: '',
  onFocus: onFocus,
};


const TextAreaInput = ({
  value,
  onValueChange,
  placeholder,
  ...restProps
}) => {

  return (
    <textarea
      type="text"
      className="TextAreaInput"
      wrap="off"
      onChange={onValueChange}
      value={value}
      placeholder={placeholder}
      autoFocus
      {...restProps}
    />
  )
}

TextAreaInput.propTypes = propTypes;
TextAreaInput.defaultProps = defaultProps;

export default TextAreaInput;
