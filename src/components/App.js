import React, { Component } from 'react';
import io from 'socket.io-client';
// import Lobby from './lobby';
import PlayerBox from './playerBox';
import Header from './header';
import Lobby from './lobby';

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = process.env.NODE_ENV === 'production' ? io() : io('http://localhost:8000');
  }

  //   componentDidMount = () => {
  //     this.socket.emit('SEND_LOBBY');
  //   }

  //   componentDidUpdate

  //   componentWillUnmount = () => {
  //     clearInterval(this.timerID);
  //   }

  //   openLobby = (ev) => {
  //     this.socket.emit('OPEN_LOBBY', {time: 0, date: Date.now()});
  //   }

  //   render() {
  //     return (
  //       <div className="container">
  //         <div className="row justify-content-center">
  //           <div className="col-sm-10 col-md-8 col-lg-6">
  //             <Lobby lobbies={this.state.lobbies} count={this.state.count}/>
  //           </div>          
  //         </div>
  //         <br />
  //         <div className="row justify-content-center">
  //           <div className="col-sm-3 col-md-2 col-lg-2">
  //             <button onClick={this.openLobby} type="button" className="btn btn-primary btn-lg">Add counter</button>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }
  render() {
    return (
      <div className="container">
        <Header />
        <div className="row justify-content-center">
          <Lobby socket={this.socket}/>
          <PlayerBox socket={this.socket}/>
        </div>
      </div>
    );
  }
}

export default App;
