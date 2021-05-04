import React from 'react';

const Button = ({ buttonText, onButtonClick, ...restProps }) => {
  return (
    <button
      onClick={onButtonClick}
      {...restProps}
    >
      { buttonText }
    </button>
  );
}

export default Button;
