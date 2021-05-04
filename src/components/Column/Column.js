import React, { useState } from 'react';
import PropTypes from "prop-types";
import ColumnEditor from '../ColumnEditor';
import ColumnDisplay from '../ColumnDisplay';
import Card from '../Card';
import './Column.scss';
import AddNewCard from '../AddNewCard';

const propTypes = {
  columnName: PropTypes.string,
  columnIndex: PropTypes.number.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({})),
  totalColumnsCount: PropTypes.number.isRequired,
};

const defaultProps = {
  columnName: '',
  cards: [],
};

const Column = ({
  columnName,
  columnIndex,
  cards,
  totalColumnsCount,
}) => {
  const [isEditMode, setstate] = useState(false)

  const toggleEditMode = () => {
    setstate(!isEditMode);
  }

  const renderCards = () => {
    const totalNoOfCards = cards.length;

    return cards.map((card, index) => {
      const { cardText = '' } = card;
      const uniqKey = `Card-${columnIndex}-${index}`;
      return (
        <Card
          cardText={cardText}
          columnIndex={columnIndex}
          cardIndex={index}
          totalColumnsCount={totalColumnsCount}
          totalNoOfCards={totalNoOfCards}
          key={uniqKey}
        />
      );
    });
  }

  const getColumnTextInEditMode = () => {
    return (
      <ColumnEditor
        columnName={columnName}
        columnIndex={columnIndex}
        toggleEditMode={toggleEditMode}
      />
    )
  }

  const getColumnTextInViewMode = () => {
    return (
      <ColumnDisplay
        columnName={columnName}
        columnIndex={columnIndex}
        totalColumnsCount={totalColumnsCount}
        toggleEditMode={toggleEditMode}
      />
    );
  };

  return (
    <div className="Column">
      {
        isEditMode
          ? getColumnTextInEditMode()
          : getColumnTextInViewMode()
      }
      {renderCards()}
      <AddNewCard
        columnIndex={columnIndex}
      />
    </div>
  );
}

Column.propTypes = propTypes;
Column.defaultProps = defaultProps;

export default Column;
