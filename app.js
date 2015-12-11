'use strict';

require('dotenv').load();
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }));

// load routes
var sessionRoutes = require('./routes/sessions');
var userRoutes = require('./routes/users');
var rootRoutes = require('./routes/root');

// mount routes
app.use('/sessions', sessionRoutes);
app.use('/users', userRoutes);
app.use('/', rootRoutes);

// load sockets
var pasteurSocket = require('./sockets/pasteur');

// mount sockets
pasteurSocket('/sockets/pasteurapp', io);

var port = process.env.SERVER_PORT || 3000;
http.listen(port, () => {
  console.log(`Listening on ${port}`)
});
