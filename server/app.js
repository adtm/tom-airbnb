const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index_router');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes); 

module.exports = app;