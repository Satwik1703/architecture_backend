const express = require('express');
const router = express.Router();
const geolib = require('geolib');
const User = require('../models/User.js');
const History = require('../models/History.js');
const Wallet = require('../models/Wallet.js');
const Vehicle = require('../models/Vehicles');

const vehiclesInLocations = [
  ['Habsiguda', []], // Habsiguda
  ['Secunderabad', []], // Secunderabad
  ['Ameerpet', []], // Ameerpet
  ['Kukatpally', []], // Kukatpally
  ['Gachibowli', []], // Gachibowli
  ['Miyapur', []], // Miyapur
  ['BHEL', []], //BHEL
  ['Bachupally', []], // Bachupally
  ['Gandimaisamma', []], // Gandimaisamma
  ['Jeedimetla', []],
];

router.get('/add', async (req, res) => {
  await Vehicle.deleteMany();
  const vehicleNos = [];
  for (var i = 0; i < 100; i++) {
    vehicleNos.push(i + 1);
  }

  for (var i = 0; i < vehiclesInLocations.length; i++) {
    for (var j = 0; j < 10; j++) {
      var index = Math.floor(Math.random() * vehicleNos.length);
      //   console.log(index);

      vehiclesInLocations[i][1].push(vehicleNos[index]);
      vehicleNos.splice(index, 1);
    }
  }
  for (var i = 0; i < vehiclesInLocations.length; i++) {
    for (var j = 0; j < vehiclesInLocations[i][1].length; j++) {
      await Vehicle.create({
        vehicleId: vehiclesInLocations[i][1][j],
        deviceId: vehiclesInLocations[i][1][j],
        vehicleLocation: vehiclesInLocations[i][0],
      }).catch((err) => {
        res.status(400).json('Some Error has Occured');
      });
    }
  }
  res.status(200).json({message: 'Added Random Vehicles'});
});

router.post('/getVehicles', (req, res) => {
  if (!req.body.startLocation) {
    return res.status(400).json('No location Specified');
  }
  User.findOne({userId: req.body.userId}, function (err, docs) {
    if (err || docs == null) {
      console.log(err);
      res.status(400).json('Error finding user');
      return;
    }
    Vehicle.find(
      {vehicleLocation: req.body.startLocation},
      function (err1, docs1) {
        if (err1) {
          console.log(err1);
          res.status(400).json('Error finding vehicles');
          return;
        }
        res.status(200).json({
          vehicles: docs1,
          phoneNo: docs.phoneNo,
          cost: '50 + 3rs/min',
        });
      }
    );
  });
});

module.exports = router;
