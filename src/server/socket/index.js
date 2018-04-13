const { increaseTime, randomChangePlayerStatus } = require('../utils');
const { simulateGame } = require('../utils/emparejamiento');

module.exports = io => {

  io.on('connection', (socket) => {
    console.log(`${socket.id} has entered`);

    clearInterval(io.sockets.timerIncreaseTime);
    io.sockets.timerIncreaseTime = setInterval(() => {
      io.sockets.lobby = increaseTime(io.sockets.lobby, 1);
      io.sockets.emit('INCREASE_TIME', io.sockets.lobby);
    }, 100)

    clearInterval(io.sockets.timerChangePlayerStatus);
    io.sockets.timerChangePlayerStatus = setInterval(() => {
      randomChangePlayerStatus(io.sockets.players, (players, player) => {
        io.sockets.players = players;
        io.sockets.emit('UPDATE_PLAYERS', [player]);
      });
    }, 300);

    simulateGame(io);

    socket.on('SEND_PLAYERS', () => {
      socket.emit('RECEIVE_PLAYERS', io.sockets.players);
    });

    socket.on('SEND_LOBBY', () => {
      socket.emit('LOBBY_SENT', io.sockets.lobby);
    });

    socket.on('OPEN_LOBBY', lobby => {
      // send just one lobby instead of all the lobbies
      io.sockets.lobby.push(lobby);
      console.log(`${socket.id} has ${io.sockets.lobby.length} lobbies`)
      io.sockets.emit('LOBBY_SENT', io.sockets.lobby);
    });


    // socket.on('INCREASE_TIME', () => {
    //   const updatedLobbies = io.sockets.lobby.map(({ time, date }) => ({ time: time + 1, date }));
    //   io.sockets.lobby = updatedLobbies;
    //   io.sockets.emit('LOBBY_SENT', updatedLobbies);
    // })

    socket.on('disconnect', () => {
      console.log(`${socket.id} has left`);
    });
  });

}
