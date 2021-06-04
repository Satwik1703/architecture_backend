const mongoose = require('mongoose');

const RideCache = new mongoose.Schema({
  userId: String,
  vehicleId: String,
  startLocation: String,
});

module.exports = mongoose.model('Cache', RideCache);
