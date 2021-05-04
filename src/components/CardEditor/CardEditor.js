import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import TextAreaInput from '../TextAreaInput';
import Button from '../Button';
import './CardEditor.scss';
import { TrelloAppContext } from '../TrelloApp';
import { UPDATE_CARD } from '../../AppConstants';
import './CardEditor.scss';

const propTypes = {
  cardText: PropTypes.string.isRequired,
  cardIndex: PropTypes.number.isRequired,
  columnIndex: PropTypes.number.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
};

const CardEditor = ({
  cardText,
  cardIndex,
  columnIndex,
  toggleEditMode,
}) => {
  const [value, setstate] = useState(cardText);
  const dispatch = useContext(TrelloAppContext);

  const handleChange = (evt) => {
    const { target: { value } = '' } = evt;
    setstate(value);
  };

  const updateCardText = () => {
    toggleEditMode();
    dispatch({
      type: UPDATE_CARD,
      payload: {
        cardIndex,
        columnIndex,
        value,
      },
    });
  };

  const onKeyPress = (evt) => {
    const { key } = evt;
    if (key === 'Enter') {
      updateCardText();
    }
  }

  return (
    <div className="CardEditor">
      <TextAreaInput
        value={value}
        onValueChange={handleChange}
        onKeyPress={onKeyPress}
        rows={6}
      />
      <div className="CardEditor__btnGroup">
        <Button
          className="Btn__add"
          onButtonClick={updateCardText}
          buttonText="Save"
        />
        <Button
          className="Btn__cancel"
          onButtonClick={toggleEditMode}
          buttonText="Cancel"
        />
      </div>
    </div>
  )
}

CardEditor.propTypes = propTypes;
export default CardEditor;
