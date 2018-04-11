import React from 'react';
import RoomReview from './RoomView';

const RoomList = ({ rooms=[], filter, ...props}) => {
  const statusCount = {
    playing: 0,
    finding: 0,
    ended: 0
  };
  const renderRooms = (roomsData) => {
    return roomsData.map(room => {
      statusCount[room.status] = statusCount[room.status] + 1;
      if (room.status === filter || filter === 'all') {
        return (<RoomReview key={room.id} room={room} />)
      }
    });
  }

  if (props.loading) {
    return (<div>Loading...</div>)
  }

  return (
    <div className="list-group">
      {renderRooms(rooms)}
    </div>
  );
};

export default RoomList;
