import { cloneDeep, includes } from 'lodash';
import { RIGHT, LEFT, UP, APP_DATA_KEY} from './AppConstants';

const getDataFromLocalStorage = () => {
  let defaultData = {
    data: [],
  };
  let appData;
  if (localStorage) {
    appData = JSON.parse(localStorage.getItem(APP_DATA_KEY)) || defaultData;
  }
  return appData;
}

const setDataToLocalStorage = (data) => {
  try {
    const appDataAsString = JSON.stringify(data);
    localStorage.setItem(APP_DATA_KEY, appDataAsString);
  }
  catch(e) {
    console.error("Error while saving to local storage");
  }
}

const reOrderElements = (listOfItems = [], startIndex, endIndex) => {
  const reOrderedItems = [...listOfItems];
  const [removed] = reOrderedItems.splice(startIndex, 1);
  reOrderedItems.splice(
    endIndex,
    0,
    {
      ...removed,
    },
  );
  return reOrderedItems;
};

const addCard = (state, {
  columnIndex,
  value,
}) => {

  const { data } = state;
  const affectedColumn = data[columnIndex];
  let { cards } = affectedColumn;
  const newCardItem = {
    cardText: value,
  };
  cards = [...cards, newCardItem];
  affectedColumn.cards = cards;
  data[columnIndex] = affectedColumn;

  return { ...state, data };
};

const removeCard = (state, {
  columnIndex,
  cardIndex,
}) => {
  const clonedState = cloneDeep(state);
  const { data } = clonedState;
  const affectedColumn = { ...data[columnIndex] };
  const { cards } = affectedColumn;
  const clonedCards = cloneDeep(cards);
  clonedCards.splice(cardIndex, 1);
  affectedColumn.cards = [...clonedCards];
  data[columnIndex] = affectedColumn;

  return { ...clonedState, data};
};

const updateCard = (state, {
  value,
  columnIndex,
  cardIndex,
}) => {
  const { data } = state;
  const affectedColumn = data[columnIndex];
  const { cards } = affectedColumn;
  const clonedCards = [...cards];
  clonedCards[cardIndex].cardText = value;

  affectedColumn.cards = clonedCards;
  data[columnIndex] = affectedColumn;
  return { ...state, data };
};

const moveCardInSameColumn = (state, {
  cardIndex,
  columnIndex,
  direction,
}) => {
  const { data } = state;
  const clonedData = cloneDeep(data);
  const affectedColumn = clonedData[columnIndex];
  const { cards } = affectedColumn;

  const targetIndex = direction === UP ? cardIndex - 1 : cardIndex + 1;
  const reOrderedCards = reOrderElements(cards, cardIndex, targetIndex);

  clonedData[columnIndex].cards = reOrderedCards;

  return { ...state, data: clonedData };
};

const moveCardToNewColumn = (state, {
  direction,
  columnIndex: sourceColumnIndex,
  cardIndex,
}) => {
  const { data } = state;
  const clonedData = cloneDeep(data);
  const targetColumnIndex = (direction === RIGHT)
    ? sourceColumnIndex + 1 : sourceColumnIndex - 1;

  const sourceColumn = clonedData[sourceColumnIndex];
  const targetColumn = clonedData[targetColumnIndex];

  const { cards: sourceCards } = sourceColumn;
  let { cards: targetCards } = targetColumn;

  const removedCards = sourceCards.splice(cardIndex, 1);
  targetCards = [...targetCards,  ...removedCards ];

  clonedData[sourceColumnIndex].cards = sourceCards;
  clonedData[targetColumnIndex].cards = targetCards;

  return { ...state, data: clonedData };
}

const moveCard = (state, payload) => {
  const { direction } = payload;

  if (includes([LEFT, RIGHT], direction)) {
    return moveCardToNewColumn(state, payload);
  }

  return moveCardInSameColumn(state, payload);
};

const addColumn = (state, {
  value
}) => {
  const newColumn = {
    columnName: value,
    cards: [],
  };
  let { data } = state;
  data = [...data, newColumn];
  return { ...state, data };
};

const updateColumn = (
  state,
  { value, columnIndex },
) => {
  const { data } = state;
  const affectedColumn = { ...data[columnIndex] };

  affectedColumn.columnName = value;
  data[columnIndex] = affectedColumn;

  return { ...state, data}
}

const removeColumn = (state, {
  columnIndex,
}) => {
  const { data } = state;
  data.splice(columnIndex, 1);
  return { ...state, data };
};

const moveColumn = (state, {
  columnIndex,
  direction
}) => {
  const targetIndex = (direction === RIGHT)
    ? columnIndex + 1 : columnIndex - 1;

  const { data } = state;
  const clonedData = cloneDeep(data);
  const reOrderedColumns = reOrderElements(clonedData, columnIndex, targetIndex);

  return { ...state, data: reOrderedColumns };
}


export {
  getDataFromLocalStorage,
  setDataToLocalStorage,
  reOrderElements,
  updateCard,
  updateColumn,
  removeCard,
  removeColumn,
  addColumn,
  addCard,
  moveCard,
  moveColumn,
}
