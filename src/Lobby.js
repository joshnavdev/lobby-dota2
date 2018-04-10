import React, { Component } from 'react';

class Lobby extends Component {
  
  parseTime = (number) => {
    const minutes = Math.trunc(number / 60);
    const seconds = number % 60;
    return `${this.formatTime(minutes)}:${this.formatTime(seconds)}`
  }

  formatTime = (number) => {
    return `${number < 10 ? 0 : ''}${number}` 
  }

  render() {
    const { time, date } = this.props.lobby;
    return (
      <div className="list-group-item list-group-item-action d-flex w-100 justify-content-between">
        <h5 className="mb-1">{this.parseTime(time)}</h5>
        <small>{new Date(date).toLocaleString()}</small>
      </div>
    );
  }
}

export default Lobby;
