const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
	userId: String,
	username: String,
	balance: Number
});

module.exports = mongoose.model('Wallet', WalletSchema);
