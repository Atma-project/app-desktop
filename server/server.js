'use strict'

let app  = require('express')();
let http = require('http').Server(app);
let io   = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('acceleration', function(data){
    io.emit('acceleration', data);
  });

  socket.on('orientation', function(data){
    io.emit('orientation', data);
  });

});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
