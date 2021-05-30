const mongoose = require('mongoose');

const db = () => {
	mongoose.connect(
		"mongodb+srv://satwik:Satwik@esaproject.wpgbs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
		{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false},
	)
	.then(console.log('Connected to Database'))
	.catch(err => {
		console.log('Error in Connecting to Database');
		console.log(err);
	})
}

module.exports = db;

// esaproj5@gmail.com
// ESAProject12345
