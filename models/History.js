const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  userId: String,
  startLocation: String,
  endLocation: String,
  username: String,
  duration: Number,
  price: Number,
  date: String,
});

module.exports = mongoose.model('History', HistorySchema);
