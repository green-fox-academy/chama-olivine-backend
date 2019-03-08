const PORT = 3000;

const express = require('express');

const app = express();
const cors = require('cors');

app.use(cors());

const mongoose = require('mongoose');

mongoose.connect('Connection String', { useNewUrlParser: true, useCreateIndex: true });

app.use(express.json());

const services = require('./routes/index');

app.use(services);

app.listen(PORT, () => {
  console.log(`Port is listening on ${PORT}`); // eslint-disable-line
});

module.exports = app;
