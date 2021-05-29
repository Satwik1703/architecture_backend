const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const {v4 : uuidv4} = require('uuid');

router.post('/signIn', (req, res) => {
	User.findOne({phoneNo: req.body.phoneNo, password: req.body.password}, function(err, docs){
		if(err){
			console.log(err);
			res
			.status(400)
			.json("Error in Finding the User");
			return;
		}
		if(docs.length == 0){
			res
			.status(400)
			.json("Wrong Username/Password");
			return;
		}

		res
		.status(200)
		.json({
			userId: docs.userId,
			message: "Successfully Logged in the User"
		});
	})
});

router.post('/register', (req, res) => {
	var userId = uuidv4();
	User.create({
		userId: userId,
		username: req.body.username,
		email: req.body.email,
		phoneNo: req.body.phoneNo,
		password: req.body.password,
		licenseNo: req.body.licenseNo
	})
	.then(response => {
		res
		.status(200)
		.json({
			userId: userId,
			message: "Successfully Registered the User"
		})
	})
	.catch(err => {
		console.log(err);
		res
		.status(400)
		.json({
			userId: null,
			message: "Error has Occured in Registering the User"
		});
	})
})

module.exports = router;