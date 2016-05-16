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

  socket.on('motion', function(data){
    io.emit('motion', data);
  });

  socket.on('rotation', function(data){
    io.emit('rotation', data);
  });

  socket.on('referencePosition', function(data){
    io.emit('referencePosition', data);
  });

});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
