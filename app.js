const express = require('express');
var ws = require('websocket').server;
const http = require('http');
const app = express();
const mongoose = require("mongoose");
const env = require('dotenv').config();
mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
module.exports = app;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', require('./routes/product'));
app.use('/', require('./routes/order'));


app.listen(process.env.PORT)
