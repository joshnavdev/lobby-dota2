import React, { Component } from 'react';
// import io from 'socket.io-client';
// import Lobby from './lobby';
import PlayerBox from './playerBox';
import Header from './header';

class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       count: 0,
//       lobbies: []
//     }

//     this.socket = process.env.NODE_ENV === 'production' ? io() : io('http://localhost:8000');

//     this.socket.on('LOBBY_OPENED', (lobbies) => {
//       this.setState({
//         count: lobbies.length,
//         lobbies
//       });
//     });

  
//   }

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
          <div className="col-md-8 mb-4">
            Hola
          </div>
          <PlayerBox />
        </div>
      </div>
    );
  }
}

export default App;
