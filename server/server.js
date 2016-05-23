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

  //motion
  socket.on('motion', function(data){
    io.emit('motion', data);
  });

  socket.on('motion-dif', function(data){
    io.emit('motion-dif', data);
  });

  socket.on('motion-prev', function(data){
    io.emit('motion-prev', data);
  });

  //rotation
  socket.on('rotation', function(data){
    io.emit('rotation', data);
  });

  socket.on('rotation-dif', function(data){
    io.emit('rotation-dif', data);
  });

  socket.on('rotation-prev', function(data){
    io.emit('rotation-prev', data);
  });

  //reference
  socket.on('ref', function(data){
    io.emit('ref', data);
  });

});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
