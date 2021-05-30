const express = require('express');
const router = express.Router();
const geolib = require('geolib');
const User = require('../models/User.js');
const History = require('../models/History.js');
const Wallet = require('../models/Wallet.js');

var locations = [
	[17.400344025158084, 78.53896233520851],
	[17.395429782200214, 78.52351281252294],
	[17.400344025158084, 78.53896233520851],
	[17.395429782200214, 78.52351281252294],
	[17.400344025158084, 78.53896233520851],
	[17.395429782200214, 78.52351281252294],
	[17.400344025158084, 78.53896233520851],
	[17.395429782200214, 78.52351281252294],
	[17.400344025158084, 78.53896233520851],
	[17.395429782200214, 78.52351281252294],
]

router.get('/getRide', (req, res) => {
	var loc = locations[Math.floor(Math.random() * 10)];
	res
	.status(200)
	.json(loc)
})

router.post('/startRide', (req, res) => {
	var loc = locations[Math.floor(Math.random() * 10)];
	startLocation = JSON.parse(req.body.startLocation);
	var distance = geolib.getDistance(
		{latitude: startLocation[0], longitude: startLocation[1]},
		{latitude: loc[0], longitude: loc[1]}
	) / 1000;

	var avgSpeed = 18.5;
	var time = distance / avgSpeed;
	var price = 50 + time * 60 * 3;

	User.findOne({userId: req.body.userId}, function(err, docs){
		if(err || docs.length == 0){
			console.log(err);
			res
			.status(400)
			.json("Error in Finding the User");
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
		.then(response => {
			Wallet.findOneAndUpdate({userId: req.body.userId}, {$inc: {balance: -price}}, {new: true, upsert: true, setDefaultsOnInsert: true}, function(err, result){
				if(err){
					console.log(err);
					res
					.status(400)
					.json("Some Error has Occured in Wallet Balance");
					return;
				}

				res
				.status(400)
				.json({
					endLocation: loc,
					distance,
					time,
					price
				})
			})
		})
		.catch(err => {
			console.log(err);
			res
			.status(400)
			.json("Some Error has Occured");
		})
	})




})

module.exports = router;
