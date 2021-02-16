"use strict";

var express = require('express');

var mongoose = require('mongoose');

var parser = require('body-parser');

var cors = require('cors');

var app = express();
var PORT = 8000;

var apiRoutes = require('./backend/modules/routes/routes');

app.use(cors());
app.use(parser.json());
var uri = 'mongodb+srv://alexander:1488sasha@cluster0.yhbzy.mongodb.net/cost?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
var db = mongoose.connection;
db.on('error', function () {
  console.error.bind(console, 'connection error:');
});
db.once('open', function () {
  console.log('connected');
});
app.use('/', apiRoutes);
app.listen(PORT, function () {
  console.log("Example app listening on port ".concat(PORT, "..."));
});