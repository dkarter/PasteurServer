var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 8181 });

console.log('-- booting server');

wss.on('connection', (ws) => {
  debugger;
  console.log('-- connection established');
  // ws.clients.length
  ws.on('message', (message) => {
    console.log(`-- received ${message}`);
  });

  ws.send('welcome to my server');
});

wss.on('close', () => {
  console.log('-- Client closed connection');
});

console.log(`-- listening on ${wss.options.port}`);
