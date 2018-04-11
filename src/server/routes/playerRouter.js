const mongoose = require('mongoose');
const Player = mongoose.model('player');
const createRandomUsers = require('../utils');

module.exports = (app) => {
  app.get('/api/players', async (req, res) => {
    const players = await Player.find({});
    res.send(players);
  });

  // app.get('/api/players/reset', async (req, res) => {
  //   await Player.deleteMany({});
  //   const players = createRandomUsers(100);
  //   const newPlayers = await Player.create(players);
  //   res.send(newPlayers);
  // });
}
