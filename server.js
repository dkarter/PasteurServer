require('dotenv').load();
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3000;

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

io.on('connection', (socket) => {
  console.log(`a user connected! id: ${socket.id}`);
  console.log("Sending clipboard to client: CLIPBOARD FROM SERVER");
  io.emit('clipboardPublished', 'CLIPBOARD FROM SERVER');

  socket.on('clipboardPublished', (data) => {
    console.log(`Clipboard from client: ${data}`);
  });
});

io.on('disconnect', (socket) => {
  console.log('user disconnected :(');
});

http.listen(port, () => {
  console.log(`Listening on ${port}`)
});

