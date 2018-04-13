import React from 'react';
import PlayerList from './PlayerList';
import { connect } from 'react-redux';

const PlayerBox = ({ offline, online, searching, waiting, playing, ...props }) => {
  return (
    <div className="col-md-4">
      <h6 className="d-flex justify-content-between mb-3">
        <div className="w-100 d-flex justify-content-between">
          <span className="badge badge-success badge-pill mx-1 text-capitalize">online</span>
          <span className="badge badge-info badge-pill mx-1 text-capitalize">searching</span>
          <span className="badge badge-warning badge-pill mx-1 text-capitalize">waiting</span>
          <span className="badge badge-danger badge-pill mx-1 text-capitalize">playing</span>
          <span className="badge badge-secondary badge-pill mx-1 text-capitalize">offline</span>
        </div>
      </h6>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Players</span>
        <div className="d-flex">
          <span className="badge badge-success badge-pill mx-1">{online < 10 ? '0' + online : online}</span>
          <span className="badge badge-info badge-pill mx-1">{searching < 10 ? '0' + searching : searching}</span>
          <span className="badge badge-warning badge-pill mx-1">{waiting < 10 ? '0' + waiting : waiting}</span>
          <span className="badge badge-danger badge-pill mx-1">{playing < 10 ? '0' + playing : playing}</span>
          <span className="badge badge-secondary badge-pill mx-1">{offline < 10 ? '0' + offline : offline}</span>
        </div>
      </h4>
      <PlayerList socket={props.socket} />
      <button type="button" className="btn btn-block btn-danger mt-3 mb-3">Reset</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  offline: state.players.offlineCount,
  online: state.players.onlineCount,
  searching: state.players.searchingCount,
  waiting: state.players.waitingCount,
  playing: state.players.playingCount
});


export default connect(mapStateToProps)(PlayerBox);
