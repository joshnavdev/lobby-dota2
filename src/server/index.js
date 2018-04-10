const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8000;

io.sockets.lobbies = []

io.on('connection', (socket) => {
  console.log(`${socket.id} has entered`);
  clearInterval(io.sockets.timerID);
  io.sockets.timerID = setInterval(() => {
    const updatedLobbies = io.sockets.lobbies.map(({ time, date }) => ({ time: time + 1, date }));
    io.sockets.lobbies = updatedLobbies;
    io.sockets.emit('LOBBY_OPENED', updatedLobbies);
  }, 1000)

  socket.on('SEND_LOBBY', () => {
    socket.emit('LOBBY_OPENED', io.sockets.lobbies);
  });

  socket.on('OPEN_LOBBY', lobby => {
    // send just one lobby instead of all the lobbies
    io.sockets.lobbies.push(lobby);
    console.log(`${socket.id} has ${io.sockets.lobbies.length} lobbies`)
    io.sockets.emit('LOBBY_OPENED', io.sockets.lobbies);
  });

  
  // socket.on('INCREASE_TIME', () => {
  //   const updatedLobbies = io.sockets.lobbies.map(({ time, date }) => ({ time: time + 1, date }));
  //   io.sockets.lobbies = updatedLobbies;
  //   io.sockets.emit('LOBBY_OPENED', updatedLobbies);
  // })

  socket.on('disconnect', () => {
    console.log(`${socket.id} has left`);
  });
});

server.listen(port);
