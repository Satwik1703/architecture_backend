const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const History = require('../models/History.js');

router.post('/account', (req, res) => {
	User.findOne({userId: req.body.userId}, function(err, docs){
		if(err || docs == null){
			res
			.status(400)
			.json("Error in Finding the User");
			return;
		}
		res
		.status(200)
		.json({
			username: docs.username,
			email: docs.email,
			phoneNo: docs.phoneNo,
			licenseNo: docs.licenseNo
		})
	})
})

router.post('/history', (req, res) => {
	History.find({userId: req.body.userId}, function(err, docs){
		if(err){
			res
			.status(400)
			.json("Error in Finding the User");
			return;
		}
		if(docs == null){
			res
			.status(202)
			.json("No Rides");
			return;
		}

		res
		.status(200)
		.json(docs);
	})
})

module.exports = router;
