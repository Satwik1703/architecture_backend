const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet.js');

router.post('/balance', (req, res) => {
	Wallet.findOne({userId: req.body.userId}, function(err, docs){
		if(err){
			res
			.status(400)
			.json("Error in Finding the User");
			return;
		}
		if(docs == null){
			res
			.status(202)
			.json({
				userId: req.body.userId,
				balance: 0
			});
			return;
		}

		res
		.status(200)
		.json(docs);
	})
})

router.post('/addMoney', (req, res) => {
	Wallet.findOneAndUpdate({userId: req.body.userId}, {$inc: {balance: req.body.money}}, {new: true, upsert: true, setDefaultsOnInsert: true}, function(err, docs){
		if(err){
			res
			.status(400)
			.json("Error in Adding the Money to the User");
			return;
		}

		res
		.status(200)
		.json(docs)
	})
})

module.exports = router;
