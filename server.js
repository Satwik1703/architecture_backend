const express = require('express');
const app = express();
const cors = require('cors');
const login = require('./routes/login.js');
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

app.listen(port, () =>{
	console.log(`Server Running on Port ${port}`);
})
