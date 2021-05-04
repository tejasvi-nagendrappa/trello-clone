import React from 'react';
import AddNewItem from '../AddNewItem';
import './AddNewColumn.scss';

const AddNewColumn = () => {
  return (
    <AddNewItem
      addItemText={`+ Add New Column`}
      placeholder="Enter the name of new column"
      className="AddNewColumn"
    />
  );
}

export default AddNewColumn;
