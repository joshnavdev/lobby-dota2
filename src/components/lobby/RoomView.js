import React from 'react';
import { parseTime } from '../../utils'

const RoomView = props => {

  return (
    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">Room ID: {props.room.id}</h5>
        <small>{new Date(props.room.createDate).toLocaleString()}</small>
      </div>
      <h1 className="mb-1 mt-1 text-center">{parseTime(props.room.time)}</h1>
      <div className="d-flex w-100 justify-content-between">
        <small>MMR Average: {props.room.mmrAverage}</small>
        <small>Status: {props.room.status}</small>
      </div>
    </a>
  );
};

export default RoomView;
