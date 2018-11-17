const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New User Connected!');
  socket.emit('newMessage', {
    from: 'Ravi',
    text: 'Hey, How are you.',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', function(newMessage){
    console.log("Create Message ", newMessage);

  });

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  });
});
app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
