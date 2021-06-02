const express = require('express');
const router = express.Router();
const geolib = require('geolib');
const User = require('../models/User.js');
const History = require('../models/History.js');
const Wallet = require('../models/Wallet.js');

var locations = [
  ['Habsiguda', [17.400344025158084, 78.53896233520851]], // Habsiguda

  ['Secunderabad', [17.442501556334673, 78.49498901668164]], // Secunderabad

  ['Ameerpet', [17.43477857257373, 78.44565373814939]], // Ameerpet

  ['Kukatpally', [17.49593900920454, 78.39781262125594]], // Kukatpally

  ['Gachibowli', [17.439509293158775, 78.36117774001633]], // Gachibowli

  ['Miyapur', [17.49636148413489, 78.35840285354759]], // Miyapur

  ['BHEL', [17.495493340624552, 78.31758770358886]], //BHEL

  ['Bachupally', [17.541128272621126, 78.36287564255261]], // Bachupally

  ['Gandimaisamma', [17.57480682461022, 78.42459756604019]], // Gandimaisamma

  ['Jeedimetla', [17.507852515230798, 78.44794237948909]], // Jeedimetla
];

router.get('/getRide', (req, res) => {
  res.status(200).json({
    Locations: locations,
  });
});

router.post('/startRide', (req, res) => {
  var loc = locations[Math.floor(Math.random() * 10)];
  startLocation = JSON.parse(req.body.startLocation);
  var distance =
    geolib.getDistance(
      {latitude: startLocation[0], longitude: startLocation[1]},
      {latitude: loc[0], longitude: loc[1]}
    ) / 1000;

  var avgSpeed = 18.5;
  var time = distance / avgSpeed;
  var price = 50 + time * 60 * 3;

  User.findOne({userId: req.body.userId}, function (err, docs) {
    if (err || docs.length == 0) {
      console.log(err);
      return res.status(400).json('Error in Finding the User');
      return;
    }
    History.create({
      userId: req.body.userId,
      startLocation: req.body.startLocation,
      endLocation: `${loc}`,
      username: docs.username,
      duration: time,
      price: price,
      date: new Date().toISOString(),
    })
      .then((response) => {
        Wallet.findOneAndUpdate(
          {userId: req.body.userId},
          {$inc: {balance: -price}},
          {new: true, upsert: true, setDefaultsOnInsert: true},
          function (err, result) {
            if (err) {
              console.log(err);
              res.status(400).json('Some Error has Occured in Wallet Balance');
              return;
            }

            res.status(400).json({
              endLocation: loc,
              distance,
              time,
              price,
            });
          }
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json('Some Error has Occured');
      });
  });
});

module.exports = router;
