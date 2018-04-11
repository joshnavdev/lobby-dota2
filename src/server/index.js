const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8000;

// Setting up the models
require('./models/Player');
require('./models/Room');

//CONNECTIN TO MONGO
const mongoURI = "mongodb://joshua:password@ds241039.mlab.com:41039/dota2-lobby-prod-mdb";
mongoose.connect(mongoURI)
  .then(resp => {
    console.log('Connected to mongoDB');
  });
//

app.use(bodyParser.json());

io.sockets.lobby = [{
  _id: mongoose.Types.ObjectId(),
  dateCreated: Date.now(),
  time: 0, //solo ram
  mmrAverage: 3300, //3 300
  status: 'playing', // finding, playing, ended solo ram
  dire: [{ _id: '1', rol: 1 }, { _id: '2', rol: 2 }, { _id: '3', rol: 3 }, { _id: '4', rol: 4 }, { _id: '5', rol: 5 }],
  radiant: [{ _id: '1', rol: 1 }, { _id: '2', rol: 2 }, { _id: '3', rol: 3 }, { _id: '4', rol: 4 }, { _id: '5', rol: 5 }],
  winner: null //dire, radian || 0,1
},{
  _id: mongoose.Types.ObjectId(),
  dateCreated: Date.now(),
  time: 0,
  mmrAverage: 4500,
  status: 'searching', // finding, playing, ended solo ram
    dire: [{ _id: '1', rol: 1 }, { _id: '2', rol: 2 }, { _id: '5', rol: 5 }],
    radiant: [{ _id: '1', rol: 1 }],
  winner: null
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
