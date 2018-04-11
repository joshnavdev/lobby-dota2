import React from 'react';
import PlayerList from './PlayerList';
import { connect } from 'react-redux';

const PlayerBox = ({online, playing, offline, ...props}) => {
  return (
    <div className="col-md-4">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Players</span>
        <div className="d-flex">
          <span className="badge badge-success badge-pill mr-3">{online < 10 ? '0' + online: online}</span>
          <span className="badge badge-warning badge-pill ">{playing < 10 ? '0' + playing : playing}</span>
          <span className="badge badge-secondary badge-pill ml-3">{offline < 10 ? '0' + offline :  offline}</span>
        </div>
      </h4>
      <PlayerList />
      <button type="button" className="btn btn-block btn-danger mt-3 mb-3">Reset</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  online: state.players.waitingCounts,
  playing: state.players.playingCounts,
  offline: state.players.offlineCounts
});


export default connect(mapStateToProps)(PlayerBox);
