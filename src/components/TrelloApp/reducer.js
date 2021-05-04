import {
  ADD_CARD, DELETE_CARD, MOVE_CARD, UPDATE_CARD,
  ADD_COLUMN, DELETE_COLUMN, MOVE_COLUMN, UPDATE_COLUMN
} from '../../AppConstants';
import {
  addCard, removeCard, moveCard, updateCard,
  addColumn, removeColumn, moveColumn, updateColumn,
} from '../../Helpers';

const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case UPDATE_CARD:
      return updateCard(state, payload);
    case UPDATE_COLUMN:
      return updateColumn(state, payload);
    case DELETE_CARD:
      return removeCard(state, payload);
    case DELETE_COLUMN:
      return removeColumn(state, payload);
    case MOVE_CARD:
      return moveCard(state, payload);
    case MOVE_COLUMN:
      return moveColumn(state, payload);
    case ADD_CARD:
      return addCard(state, payload);
    case ADD_COLUMN:
      return addColumn(state, payload);
    default:
      return state;
  }
}

export default reducer;
