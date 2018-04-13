const lodash = require('lodash');
const mongoose = require('mongoose');
const { changePlayerArrayStatus } = require('../utils');

const getPlayersNumberRoom = (room) => {
  return room.dire.length + room.radiant.length;
};

const changePlayerRoomStatus = (players, room, status, cb) => {
  // 1. Tener un array de todos los jugadores
  const copyRoom = Object.assign({}, room);
  const { dire, radiant } = copyRoom;
  // 2. Cambiar sus estados
  const updatedDire = changePlayerArrayStatus(dire, status);
  const updatedRadiant = changePlayerArrayStatus(radiant, status);
  copyRoom.dire = updatedDire;
  copyRoom.radiant = updatedRadiant;
  const roomUpdatedPlayers = [...updatedDire, ...updatedRadiant];
  // 3. Modificar players
  const updatedPlayers = lodash.unionBy(roomUpdatedPlayers, players, '_id');
  // 4. Mandar por cb
  cb(updatedPlayers, roomUpdatedPlayers);
  return copyRoom;
};

const changeRoomStatus1 = (room, status) => {
  room.status = status;
  return room;
}

const changeRoomStatus = (lobby, room, status, cb) => {
  // 1. Cambiar status del room
  const updatedRoom = changeRoomStatus1(room, status);
  // 2. Modificar el lobby
  const updatedLobby = lodash.unionBy([updatedRoom], lobby, '_id');
  // 3. Mandar por cb
  cb(updatedLobby, updatedRoom);
};

const getBestPlayer = (players, cb) => {
  // 0. conseguir solo los jugadores que tengan status = 'searching'
  const filteredPlayers = players.filter(player => player.status === 'searching');
  // 1. conseguir el mejor jugador para el room
  const bestPlayer = lodash.sample(players);
  // 2. cambiar su estado
  const updatedBestPlayer = changePlayerArrayStatus([bestPlayer], 'waiting')[0];
  // 3. actualizar los jugadores
  const updatedPlayers = lodash.unionBy([updatedBestPlayer], players, '_id');
  // 4. mandar cb
  cb(updatedPlayers, updatedBestPlayer);
  // 5. regresar el mejor jugador
  return updatedBestPlayer;
}

const pushPlayerRoom = (room, player) => {
  let team = lodash.sample([1, 2]) === 1 ? 'dire' : 'radiant';
  if (room[team].length == 5) {
    team = team === 'dire' ? 'radiant' : 'dire';
  }
  room[team].push(player);
  return room;
}

const putPlayerRoom = (lobby, room, player, cb) => {
  // 1. insertar player en room
  const updatedRoom = pushPlayerRoom(room, player);
  // 2. actualizar lobby
  const updatedLobby = lodash.unionBy([updatedRoom], lobby, '_id');
  // 3. cb
  cb(updatedLobby, updatedRoom);
}

const createRoom = () => {
  return {
    _id: mongoose.Types.ObjectId(),
    dateCreated: Date.now(),
    time: 0,
    mmrAverage: null,
    status: 'searching',
    dire: [],
    radiant: [],
    winner: '',
  }
}

const createRooms = (number) => {
  const rooms = [];
  for (i = 0; i < number; i++) {
    rooms.push(createRoom());
  }
  return rooms;
}

const isThereSearchingPlayers = (players) => {
  const filteredPlayers = players.filter(player => player.status === 'searching');
  return filteredPlayers.length !== 0;
};

exports.simulateGame = (io) => {
  const room = createRooms(1)[0];
  const roomID = room._id.toHexString();
  console.log(roomID);

  io.sockets.lobby.push(room); //hacer un emit para el fronted
  io.sockets.emit('UPDATE_LOBBY', [room]);


  io.sockets.timers[roomID] = setInterval(() => {
    if (!isThereSearchingPlayers(io.sockets.players)) {
      console.log('no hay jugadpres')
      return;
    }

    if (getPlayersNumberRoom(room) === 10) {
      const updatedRoom = changePlayerRoomStatus(io.sockets.players, room, 'playing', (updatedPlayers, roomUpdatedPlayers) => {
        io.sockets.players = updatedPlayers;
        io.sockets.emit('UPDATE_PLAYERS', roomUpdatedPlayers);
      })

      changeRoomStatus(io.sockets.lobby, updatedRoom, 'playing', (updatedLobby, updatedRoom) => {
        // CAMBIA EL ESTADO DEL ROOM, LO MODIGICA EN EL LOBY Y LO DEVUELVE EN CB
        io.sockets.lobby = updatedLobby;
        io.sockets.emit('UPDATE_LOBBY', [updatedRoom]);
      });
      clearInterval(io.sockets.timers[roomID]);
    } else {
      const selectedPlayer = getBestPlayer(io.sockets.players, (updatedPlayers, updatedPlayer) => {
        // CONSIGUE AL MEJOR JUGADOR PARA EL ROOM, ACTUALIZA SU ESTADO, ACTUALIZA LOS PLAYERS Y LOS DEVUELVE EN CB
        io.sockets.players = updatedPlayers;
        io.sockets.emit('UPDATE_PLAYERS', [updatedPlayer])
      });
      putPlayerRoom(io.sockets.lobby, room, selectedPlayer, (updatedLobby, updatedRoom) => {
        io.sockets.lobby = updatedLobby;
        io.sockets.emit('UPDATE_LOBBY', [updatedRoom]);
      });
    }
  }, 300);
}
