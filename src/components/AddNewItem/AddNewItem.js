import React, { useState, useContext } from 'react';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import TextAreaInput from '../TextAreaInput';
import Button from '../Button';
import { COLUMN, ADD_CARD, ADD_COLUMN } from '../../AppConstants';
import { TrelloAppContext } from '../TrelloApp';
import './AddNewItem.scss';

const propTypes = {
  addItemText: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  columnIndex: PropTypes.number,
};

const defaultProps = {
  placeholder: '',
  className: '',
  type: COLUMN,
  columnIndex: 0,
};

const initialState = {
  isEditMode: false,
  text: '',
};

const AddNewItem = ({
  placeholder,
  className,
  type,
  addItemText,
  columnIndex,
}) => {
  const [addNewItemState, setstate] = useState(initialState);
  const dispatch = useContext(TrelloAppContext)

  const { isEditMode, text } = addNewItemState;
  const isColumn = type === COLUMN;

  const toggleEditMode = () => {
    setstate({
      ...addNewItemState,
      isEditMode: !isEditMode,
      text: '',
    });
  }

  const onValueChange = (evt) => {
    const { target: { value } } = evt;
    setstate({
      ...addNewItemState,
      text: value,
    });
  };

  const handleAddItem = () => {
    setstate({
      isEditMode: !isEditMode,
      text: '',
    });
    dispatch({
      type: isColumn ? ADD_COLUMN : ADD_CARD,
      payload: {
        columnIndex,
        value: text,
      },
    });
  }

  const onKeyPress = (evt) => {
    const { key } = evt;
    if (key === 'Enter') {
      handleAddItem();
    }
  }

  const getEditor = () => {
    return (
      <div className={isColumn ? 'Column' : ''}>
        <TextAreaInput
          onChange={onValueChange}
          value={text}
          placeholder={placeholder}
          rows={isColumn ? 2 : 4}
          onKeyPress={onKeyPress}
        />
        <div className="AddNewItem__btnGroup">
          <Button
            buttonText="Add"
            className="Btn__add"
            onButtonClick={handleAddItem}
          />
          <Button
            buttonText="Cancel"
            className="Btn__cancel"
            onButtonClick={toggleEditMode}
          />
        </div>
      </div>
    );
  }

  const getAddItemButton = () => {
    return (
      <Button
        className={`${className}__btn`}
        buttonText={addItemText}
        onButtonClick={toggleEditMode}
      />
    );
  };

  return (
    <div
      className={isEditMode ? 'AddNewItem' : className}
      onClick={isEditMode ? noop : toggleEditMode }
    >
      {
        isEditMode
        ? getEditor()
        : getAddItemButton()
      }
    </div>
  );
}

AddNewItem.propTypes = propTypes;
AddNewItem.defaultProps = defaultProps;
export default AddNewItem;
