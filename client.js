var WebSocket = require('ws');
var ws        = new WebSocket('ws://localhost:8181');

ws.on('open', () => {
  console.log('-- Sending hello message');
  ws.send(':: Hello from client!');
  console.log('-- Message sent (hello)');
});

ws.on('message', (data, flags) =>  {
  console.log(`-- received message ${data}`);
})
