const express = require('express');
const mongoose = require('mongoose');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8000;

// Setting up the models
require('./models/Player');

//CONNECTIN TO MONGO
const mongoURI = "mongodb://joshua:password@ds241039.mlab.com:41039/dota2-lobby-prod-mdb";
mongoose.connect(mongoURI)
  .then(resp => {
    console.log('Connected to mongoDB');
  });
//

io.sockets.lobby = [{
  id: '123123',
  createDate: Date.now(),
  time: 0, //solo ram
  mmrAverage: 3300, //3 300
  status: 'playing', // finding, playing, ended solo ram
  dire: ['1','2','3','4','5'],
  radiant: ['6','7','8','9','10'],
  winner: null //dire, radian || 0,1
}];

require('./socket')(io);

require('./routes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../build')));

  app.get('*', (req, res) => {
    res.sendFile(__dirname + './index.html');
  });
}

server.listen(port);
