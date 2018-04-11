import React, { Component } from 'react';
import RoomReview from './RoomView';

class RoomList extends Component {
  renderRooms = (rooms) => {
    if (rooms.length === 0) {
      return <div>No hay nada</div>
    }
    return rooms.map(room => (<RoomReview key={room._id} room={room} />));
  }

  render() {
    const { rooms=[] } = this.props;
    return (
      <div className="list-group">
        {this.renderRooms(rooms)}
      </div>
    );
  }
};

export default RoomList;
