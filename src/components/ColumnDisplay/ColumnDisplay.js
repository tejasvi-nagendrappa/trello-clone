import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { BUTTON_CONFIG, DELETE_COLUMN, MOVE_COLUMN } from '../../AppConstants';
import Button from '../Button';
import { TrelloAppContext } from '../TrelloApp';
import './ColumnDisplay.scss';

const propTypes = {
  columnName: PropTypes.string.isRequired,
  columnIndex: PropTypes.number.isRequired,
  totalColumnsCount: PropTypes.number.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
}

const {
  DELETE, MOVE_RIGHT, MOVE_LEFT,
} = BUTTON_CONFIG;

const ColumnDisplay = ({
  columnName,
  columnIndex,
  totalColumnsCount,
  toggleEditMode,
}) => {
  const dispatch = useContext(TrelloAppContext)
  const isFirstColumn = columnIndex === 0;
  const isLastColumn = (columnIndex === totalColumnsCount - 1);
  const isFirstAndLast = isFirstColumn && isLastColumn;

  const getButtons = () => {
    if (isFirstAndLast) {
      return [DELETE];
    }

    if (isFirstColumn) {
      return [MOVE_RIGHT, DELETE]
    }

    if (isLastColumn) {
      return [MOVE_LEFT, DELETE]
    }

    return [MOVE_LEFT, MOVE_RIGHT, DELETE]
  };

  const handleButtonClick = (evt) => {
    const { target: { value } } = evt;
    evt.stopPropagation();
    evt.preventDefault();
    if (value === DELETE.value) {
      dispatch({
        type: DELETE_COLUMN,
        payload: {
          columnIndex,
        },
      })
    } else {
      dispatch({
        type: MOVE_COLUMN,
        payload: {
          direction: value,
          columnIndex,
        }
      })
    }
  }

  const renderButtons = () => {
    const actionButtons = getButtons();
    return actionButtons.map((buttonItem) => {
      const { label, value } = buttonItem;
      return (
        <Button
          onButtonClick={handleButtonClick}
          buttonText={label}
          value={value}
          className="ColumnDisplay__btn"
          key={`ColumnDisplay-${columnIndex}-${label}-${value}`}
        />
      );
    })
  }

  return (
    <div className="ColumnDisplay" onClick={toggleEditMode}>
      <div className="ColumnDisplay__text">
        {columnName}
      </div>
      <div className="ColumnDisplay--btnContainer">
        {renderButtons()}
      </div>
    </div>
  )
}

ColumnDisplay.propTypes = propTypes;
export default ColumnDisplay;
