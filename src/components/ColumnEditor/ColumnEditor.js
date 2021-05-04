import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import TextAreaInput from '../TextAreaInput';
import { TrelloAppContext } from '../TrelloApp';
import Button from '../Button';
import { UPDATE_COLUMN } from '../../AppConstants';
import './ColumnEditor.scss';

const propTypes = {
  columnName: PropTypes.string.isRequired,
  columnIndex: PropTypes.number.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
};

const ColumnEditor = ({
  columnIndex,
  columnName,
  toggleEditMode,
}) => {
  const [value, setstate] = useState(columnName || '');
  const dispatch = useContext(TrelloAppContext);

  const handleValueChange = (evt) => {
    const { target: { value } } = evt;
    setstate(value);
  }


  const onKeyPress = (evt) => {
    const { key } = evt;
    if (key === 'Enter') {
      dispatch({
        type: UPDATE_COLUMN,
        payload: {
          value,
          columnIndex,
        }
      });
      toggleEditMode();
    }
  }

  return (
    <div className="ColumnEditor">
      <TextAreaInput
        value={value}
        onValueChange={handleValueChange}
        onKeyPress={onKeyPress}
        rows={2}
      />
      <div>
        <Button
          buttonText="Cancel"
          onButtonClick={toggleEditMode}
          className="Btn__cancel"
        />
      </div>
    </div>
  );
}

ColumnEditor.propTypes = propTypes;
export default ColumnEditor;
