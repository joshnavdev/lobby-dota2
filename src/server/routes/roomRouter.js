const mongoose = require('mongoose');
const Room = mongoose.model('room');

module.exports = (app) => {
  app.get('/api/rooms', async (req, res) => {
    const rooms = await Room.find({}).populate(['radiant', 'dire']);
    res.send(rooms);
  });

  app.post('/api/rooms', async (req, res) => {
    const { mmrAverage, dire, radiant, winner } = req.body;
    
    const room = new Room({
      dateCreated: Date.now(),
      mmrAverage,
      dire,
      radiant,
      winner
    });

    const newRoom = await room.save();
    res.send(newRoom);
  });
  
}
