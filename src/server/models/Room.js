const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomSchema = new Schema({
  dateCreated: Date,
  dateFinish: Date,
  mmrAverage: Number,
  status: { type: String, default: 'finished' },
  dire: [{ type: Schema.Types.ObjectId, ref: 'player' }],
  radiant: [{ type: Schema.Types.ObjectId, ref: 'player' }],
  winner: String
});

mongoose.model('room', RoomSchema);
