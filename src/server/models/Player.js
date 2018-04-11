const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlayerSchema = new Schema({
  username: String,
  status: String,
  rol: Number,
  mmr: Number,
  create_date: Date
});

mongoose.model('player', PlayerSchema);
