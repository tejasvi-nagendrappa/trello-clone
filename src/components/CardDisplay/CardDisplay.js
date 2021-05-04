import React, { useContext} from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { BUTTON_CONFIG, DELETE_CARD, MOVE_CARD } from '../../AppConstants';
import { TrelloAppContext } from '../TrelloApp';
import './CardDisplay.scss';

const propTypes = {
  cardText: PropTypes.string.isRequired,
  cardIndex: PropTypes.number.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  totalNoOfCards: PropTypes.number.isRequired,
};

const {
  DELETE, MOVE_DOWN, MOVE_UP, MOVE_LEFT, MOVE_RIGHT,
} = BUTTON_CONFIG;


const CardDisplay = ({
  cardIndex,
  cardText,
  toggleEditMode,
  totalNoOfCards,
  columnIndex,
  totalColumnsCount,
}) => {
  const dispatch = useContext(TrelloAppContext)
  const isRightEnabled = columnIndex < totalColumnsCount - 1;
  const isLeftEnabled = columnIndex > 0;
  const isMoveUpEnabled = cardIndex > 0;
  const isMoveDownEnabled = cardIndex < totalNoOfCards - 1;

  const getButtons = () => {
    const buttons = [];

    if (isLeftEnabled) {
      buttons.push(MOVE_LEFT);
    }

    if (isRightEnabled) {
      buttons.push(MOVE_RIGHT);
    }

    if (isMoveUpEnabled) {
      buttons.push(MOVE_UP)
    }

    if (isMoveDownEnabled) {
      buttons.push(MOVE_DOWN);
    }

    buttons.push(DELETE);
    return buttons;
  };

  const handleButtonClick = (evt) => {
    const { target: { value } } = evt;
    evt.stopPropagation();
    evt.preventDefault();
   if(value === DELETE.value) {
      dispatch({
        type: DELETE_CARD,
        payload: {
          columnIndex,
          cardIndex,
        }
      })
    } else {
      dispatch({
        type: MOVE_CARD,
        payload: {
          direction: value,
          cardIndex,
          columnIndex,
        },
      })
    }
  };

  const renderActionButtons = () => {
    const actionButtons = getButtons();
    return actionButtons.map((buttonItem) => {
      const { value, label } = buttonItem;
      return (
        <Button
          onButtonClick={handleButtonClick}
          buttonText={label}
          value={value}
          key={`${label}-${value}`}
          className="CardDisplay__btn"
        />
      );
    })
  }

  return (
    <div className="CardDisplay" onClick={toggleEditMode}>
      <div className="CardDisplay__text">
        {cardText}
      </div>
      <div className="CardDisplay__btnGroup">
        {renderActionButtons()}
      </div>
    </div>
  );
}

CardDisplay.propTypes = propTypes;
export default CardDisplay;
