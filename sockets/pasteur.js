module.exports = function(namespace, io) {
  io.of(namespace).on('connection', (socket) => {
    console.log(`a user connected! id: ${socket.id}`);

    socket.on('clipboardPublished', (data) => {
      console.log(`Clipboard from client: ${data.groupId}`);
    });

    socket.on('createGroup', (data) => {
      console.log(`createGroup called with data ${data}`);
      socket.emit('got it');
    });

    socket.on('authenticate', (data) => {
      debugger;
    });
  }).on('disconnect', (socket) => {
    console.log('user disconnected :(');
  });
};
