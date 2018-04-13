import React from 'react';
import { parseTime } from '../../utils'

const RoomView = ({ room, ...props }) => {
  const { _id, dateCreated, time, mmrAverage, status, winner } = room;

  const style = status === 'playing' ? {
    pointerEvents: 'none'
  } : {};

  const renderPlayers = (players = [], type) => {
    // if (players.length === 0) return <span>there no players yet</span>
    const playerTagArray = players.map(player => (
      <button key={player._id} type="button" disabled className={`badge badge-${type === 'dire' ? 'danger' : 'success'} badge-pill`} >
        {player.rol}
      </button>
    ));
    let i = 10;
    while(playerTagArray.length < 5) {
      playerTagArray.push(<button key={i} type="button" disabled className={`badge badge-secondary badge-pill`}>?</button>)
      i = i + 1;
    }
    return playerTagArray;
  }

  return (
    <a href={`/api/rooms/${_id}`} style={style} target="_blank" className="list-group-item list-group-item-action flex-column align-items-start">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">ID: {_id}</h5>
        <small>{new Date(dateCreated).toLocaleString()}</small>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          {renderPlayers(room.radiant, 'radiant')}
        </div>
        <h1 className="mb-1 mt-1 text-center">{time === undefined ? winner.replace(/\b\w/g, l => l.toUpperCase()) : parseTime(time)}</h1>
        <div>
          {renderPlayers(room.dire, 'dire')}
        </div>
      </div>
      <div className="d-flex w-100 justify-content-between">
        <small>MMR Average: {mmrAverage}</small>
        <small>Status: {status}</small>
      </div>
    </a>
  );
};

export default RoomView;
