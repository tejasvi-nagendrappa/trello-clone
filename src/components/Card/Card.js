import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CardEditor from '../CardEditor'
import CardDisplay from '../CardDisplay';
import './Card.scss';

const propTypes = {
  cardText: PropTypes.string.isRequired,
  cardIndex: PropTypes.number.isRequired,
  columnIndex: PropTypes.number.isRequired,
  totalNoOfCards: PropTypes.number.isRequired,
  totalColumnsCount: PropTypes.number.isRequired,
};

const Card = ({
  cardIndex,
  cardText,
  columnIndex,
  totalColumnsCount,
  totalNoOfCards,
}) => {
  const [isEditMode, setState] = useState(false);

  const getCardInEditMode = () => {
    return (
      <CardEditor
        cardText={cardText}
        columnIndex={columnIndex}
        cardIndex={cardIndex}
        toggleEditMode={toggleEditMode}
      />
    );
  }

  const getCardInViewMode = () => {
    const uniqKey = `CardDisplay-${columnIndex}-${cardIndex}`;
    return (
      <CardDisplay
        key={uniqKey}
        cardIndex={cardIndex}
        cardText={cardText}
        columnIndex={columnIndex}
        toggleEditMode={toggleEditMode}
        totalColumnsCount={totalColumnsCount}
        totalNoOfCards={totalNoOfCards}
      />
    )
  }

  const toggleEditMode = () => {
    setState(!isEditMode);
  }

  return (
    <div className="Card">
      {
        isEditMode
        ? getCardInEditMode()
        : getCardInViewMode ()
      }
    </div>
  )
}

Card.propTypes = propTypes;

export default Card;
