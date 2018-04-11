import React from 'react';
import { parseTime } from '../../utils'

const RoomView = ({ room, ...props }) => {
  const { id, createDate, time, mmrAverage, status } = room;
  return (
    <a href={`/api/rooms/${id}`} className="list-group-item list-group-item-action flex-column align-items-start">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">Room ID: {id}</h5>
        <small>{new Date(createDate).toLocaleString()}</small>
      </div>
      <h1 className="mb-1 mt-1 text-center">{parseTime(time)}</h1>
      <div className="d-flex w-100 justify-content-between">
        <small>MMR Average: {mmrAverage}</small>
        <small>Status: {status}</small>
      </div>
    </a>
  );
};

export default RoomView;
