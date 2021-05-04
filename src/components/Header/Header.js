import React from 'react';
import Proptypes from 'prop-types';
import './Header.scss';

const propTypes = {
  headerText: Proptypes.string.isRequired,
};

const Header = ({ headerText }) => {
  return (<div className="Header">{headerText}</div>);
};

Header.propTypes = propTypes;

export default Header;
