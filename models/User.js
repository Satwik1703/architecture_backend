const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	userId: String,
	username: {type: String, unique: true},
	email: {type: String, unique: true},
	phoneNo: {type: String, unique: true},
	password: String,
	licenseNo: {type: String, unique: true}
});

module.exports = mongoose.model('User', UserSchema);
