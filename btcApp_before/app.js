var express = require('express');
var http = require('http');
var socketIo = require('socket.io');
var path = require('path');

var app = express();
var server = http.Server(app);
var io = socketIo(server);
var port = 8080;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log(`New connection made`);

  socket.emit('message-from-server', {
    greeting: 'Hello from Server'
  });

  socket.on('message-from-client', (message) => {
    console.log(message);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});