import React from 'react';
import PropTypes from 'prop-types';
import AddNewItem from '../AddNewItem';
import { CARD } from '../../AppConstants';
import './AddNewCard.scss';

const propTypes = {
  columnIndex: PropTypes.number.isRequired,
};

const AddNewCard = ({ columnIndex }) => {
  return (
    <AddNewItem
      addItemText={`+ Add New Card`}
      type={CARD}
      placeholder="Enter Card Info"
      columnIndex={columnIndex}
      className="AddNewCard"
    />
  );
}

AddNewCard.propTypes = propTypes;

export default AddNewCard;
