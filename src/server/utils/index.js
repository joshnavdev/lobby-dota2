const sillyname = require('sillyname');
const lodash = require('lodash');
const mongoose = require('mongoose');

const createRandomUser = () => {
  const username = sillyname();
  const status = Math.trunc(Math.random() * 100) < 80 ? 'online' : 'offline';
  const rol = Math.trunc(Math.random() * 5 + 1);
  const mmr = Math.trunc(Math.random() * 6000)
  return {
    username,
    status,
    rol,
    mmr
  }
};

const changePlayerStatus = (player, status) => {
  player.status = status;
  return player;
};

const randomOf = (options) => {
  return lodash.sample(options);
}

const randomStatus = (status) => {
  if (status === 'playing') {
    return status;
  }
  switch (status) {
    case 'offline':
      return 'online';
    case 'online':
      return randomOf(['offline', 'searching']);
    case 'searching':
      return randomOf(['offline', 'online'])
    case 'playing':{
      console.log('asdasdasdasdadsads')
      return randomOf(['offline', 'online']);
    }
    default:
      return status;
  }

}

exports.randomChangePlayerStatus = (players, callback) => {
  const playersFiltered = players.filter(player => (player.status !== 'playing' || player.status !== 'waiting'));
  const randomPlayer = lodash.sample(playersFiltered);
  const playerChanged = changePlayerStatus(randomPlayer, randomStatus(randomPlayer.status));
  const newPlayers = lodash.unionBy([randomPlayer], players, '_id');


  callback(newPlayers, playerChanged);
}

exports.changePlayerArrayStatus = (players, status) => {
  return players.map(player => changePlayerStatus(player, status));
}

exports.increaseTime = (lobby = [], seconds) => {
  if (lobby == []) return [];
  return lobby.map(room => {
    if (room.status === 'searching') return room;
    return ({
      ...room,
      time: room.time + seconds
    });
  });
};

exports.createRandomUsers = (number) => {
  const players = [];
  for (i = 0; i < number; i++) {
    players.push(createRandomUser());
  }
  return players;
};

