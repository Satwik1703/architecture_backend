const express = require('express');
const app = express();
const cors = require('cors');
const login = require('./routes/login.js');
const ride = require('./routes/ride.js');
const details = require('./routes/details.js');
const wallet = require('./routes/wallet.js');
const bodyParser = require('body-parser');
const port = process.env.PORT ||  3000;

app.use(cors());
app.use(bodyParser.json());

//Database Connection
const db = require('./db.js');
db();

app.get('/', (req, res) => {
	res.json("Backend of Architecture Project");
})

app.use('/login', login);
app.use('/home', ride);
app.use('/details', details);
app.use('/wallet', wallet);

app.listen(port, () =>{
	console.log(`Server Running on Port ${port}`);
})
