const express = require('express');

const helloWorld = require('./apis/helloWorld');

require('dotenv').config();

const host = process.env.BACKEND_HOST;
const port = process.env.BACKEND_PORT;

const app = express();

// Variables
app.set('host', host);
app.set('port', port);

// Middlewares

// Routes
app.use('/hello-world', helloWorld);

module.exports = app;
