//HEROS SERVICES

require('dotenv').config();

const express = require('express');
const app = express();

var cors = require('cors');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

const MONGODB_URL = 'mongodb+srv://' + process.env.MONGODB_USERNAME + ':' + process.env.MONGODB_PASSWORD + '@lms.ebhxa.mongodb.net/FirstDatabase?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(cors());
app.use(bodyParser.json());

const authRouter = require('./routes/heros');
app.use('/heros', authRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Auth service listening on port ${port}`);
});
