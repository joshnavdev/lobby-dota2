import React, { Component } from 'react';
import Lobby from './Lobby';

class LobbiesList extends Component {

  renderCounters = () => {
    return this.props.lobbies.map((lobby, idx) => {
      return (<Lobby key={idx} lobby={lobby} />);
    });
  }

  render() {
    return (
      <div className="list-group">
        <div>{this.props.count} Lobbies</div>
        {this.renderCounters()}
      </div>
    );
  }
}

export default LobbiesList;
