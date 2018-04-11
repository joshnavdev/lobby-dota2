import React, { Component } from 'react';
import { connect } from 'react-redux';

import RoomList from './RoomList'
import {
  // fetchRooms,
  agregateRooms,
  updateRoomsFilter,
  // updateCurrentCount,
  // increaseTime
} from '../../actions/lobbyActions';

class Lobby extends Component {

  constructor(props) {
    super(props);

    this.props.socket.on('LOBBY_SENT', lobby => {
      this.props.dispatch(agregateRooms(lobby));
    });

    this.props.socket.on('INCREASE_TIME', () => {
      // this.props.dispatch(increaseTime());
      // Tengo que se incremente desde el server y por aqui solo recibir la data enter
      // crear un action creator que fucione la data traido con la que tengo en el store
    })
  }

  componentDidMount() {
    this.props.socket.emit('SEND_LOBBY');
  }

  onHandleClick = (type) => {
    this.props.dispatch(updateRoomsFilter(type))
  }

  getRoomsFiltered = (rooms, filter) => {
    if (filter === 'all') {
      return rooms;
    }

    return rooms.filter(room => room.status === filter);
  }
  
  render() {
    const { rooms, filter, loading, currentCount } = this.props.lobby;
    this.roomsFiltered = this.getRoomsFiltered(rooms, filter);
    return (
      <div className="col-md-8 mb-4">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">Lobby</span>
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className="btn btn-secondary active" onClick={this.onHandleClick.bind(null, 'playing')} >
              <input type="radio" />Playing
            </label>
            <label className="btn btn-secondary" onClick={this.onHandleClick.bind(null, 'ended')}>
              <input type="radio" />Ended
            </label>
            <label className="btn btn-secondary" onClick={this.onHandleClick.bind(null, 'all')}>
              <input type="radio" />All
            </label>
          </div>
          <div>
            <span className="badge badge-secondary badge-pill">{currentCount}</span>
          </div>
        </h4>
        {
         loading ? <div>Loading...</div> : 
         <RoomList rooms={this.roomsFiltered} dispatch={this.props.dispatch} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  lobby: state.lobby
})

export default connect(mapStateToProps)(Lobby);
