const sillyname = require('sillyname');

const createRandomUser = () => {
  const username = sillyname();
  const status = Math.trunc(Math.random()*100) < 80 ? 'waiting' : 'offline';
  const rol = Math.trunc(Math.random() * 5 + 1);
  const mmr = Math.trunc(Math.random()*6000)
  return {
    username,
    status,
    rol,
    mmr
  }
}; 

module.exports = (number) => {
  const players = [];
  for (i = 0; i < number; i++) {
    players.push(createRandomUser());
  }
  return players;
}

