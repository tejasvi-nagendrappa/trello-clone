import React, { useReducer } from 'react';
import { getDataFromLocalStorage, setDataToLocalStorage } from '../../Helpers';
import Column from '../Column';
import reducer from './reducer';
import './TrelloApp.scss';
import AddNewColumn from '../AddNewColumn';
import Header from '../Header';

const TrelloAppContext = React.createContext(null);
const initialState = getDataFromLocalStorage();

const TrelloApp = () => {
  const [appState, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const renderColumns = () => {
    setDataToLocalStorage(appState);
    const { data } = appState;
    const totalColumns = data.length;
    const columns = data.map((currItem, index) => {
      const { columnName, cards = [] } = currItem;
      const uniqKey = `Column-${index}`;
      return (
        <Column
          columnName={columnName}
          cards={cards}
          columnIndex={index}
          totalColumnsCount={totalColumns}
          key={uniqKey}
        />
      )
    });
    return columns;
  };

  return (

    <TrelloAppContext.Provider value={dispatch}>
      <div className="TrelloApp">
        <Header
          headerText="Simple Trello"
        />
        <div className="TrelloApp__columns">
        {renderColumns()}
          <AddNewColumn />
        </div>
      </div>
    </TrelloAppContext.Provider>
  );
}

export {
  TrelloAppContext,
  TrelloApp,
}
