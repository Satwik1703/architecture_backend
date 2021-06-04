const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  vehicleId: String,
  deviceId: String,
  vehicleLocation: String,
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
