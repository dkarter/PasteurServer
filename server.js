require('dotenv').load();
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_ADAPTER_SEQUELIZE,
    pool: 25
  }
);

var User = require('./lib/user')(sequelize, Sequelize);

var port = 3000;

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

app.post('/login', (req, res) => {
  User.authenticate(
    req.body.username,
    req.body.password
  ).then((result) => {
    res.status(200).json(result);
  }, (err) => {
    res.status(500).json(err);
  });
});

app.post('/register', (req, res) => {
  User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }).then((user) => {
    res.status(200).json(user);
  }, (err) => {
    res.status(500).json(err);
  });
});

io.on('connection', (socket) => {
  console.log(`a user connected! id: ${socket.id}`);
  console.log("Sending clipboard to client: CLIPBOARD FROM SERVER");
  io.emit('clipboardPublished', 'CLIPBOARD FROM SERVER');

  socket.on('clipboardPublished', (data) => {
    console.log(`Clipboard from client: ${data.groupId}`);
  });

  socket.on('createGroup', (data) => {
    console.log(`createGroup called with data ${data}`);
    socket.emit('got it');
  });

  socket.on('register', (data) => {
    debugger;
  });
});

io.on('disconnect', (socket) => {
  console.log('user disconnected :(');
});


http.listen(port, () => {
  console.log(`Listening on ${port}`)
});

