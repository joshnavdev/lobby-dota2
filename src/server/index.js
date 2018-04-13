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
const mongoURI = 'mongodb://localhost:27017/dota2-lobby-dev-mdb';
if (process.env.NODE_ENV === 'production') {
  mongoURI = "mongodb://joshua:password@ds241039.mlab.com:41039/dota2-lobby-prod-mdb";
}

mongoose.connect(mongoURI)
  .then(resp => {
    console.log('Connected to mongoDB');
  });
//

app.use(bodyParser.json());

mongoose.model('player').find({}).then(players => {
  io.sockets.players = players;
  require('./socket')(io);  
});

io.sockets.timers = {};
io.sockets.lobby = [];

require('./routes')(app);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../build')));

  app.get('*', (req, res) => {
    res.sendFile(__dirname + './index.html');
  });
}

server.listen(port);
