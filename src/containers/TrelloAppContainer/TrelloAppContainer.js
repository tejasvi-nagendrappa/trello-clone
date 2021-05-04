import React from 'react';
import { TrelloApp } from '../../components/TrelloApp';

class TrelloAppContainer extends React.Component {
  componentDidCatch() {

  }

  render() {
    return(
      <div className="TrelloAppContainer">
        <TrelloApp />
      </div>
    );
  }
}

export default TrelloAppContainer;
