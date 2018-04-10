import React from 'react';
import PlayerList from './PlayerList';

const PlayerBox = props => {
  return (
    <div className="col-md-4">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Players</span>
        <span className="badge badge-secondary badge-pill">3</span>
      </h4>
      <PlayerList />
      <button type="button" className="btn btn-block btn-danger ">Reset</button>
    </div>
  );
};

export default PlayerBox;
