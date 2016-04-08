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
    data.x = Math.round(data.x);
    data.y = Math.round(data.y);
    data.z = Math.round(data.z);
    io.emit('acceleration', data);
  });

  socket.on('orientation', function(data){
    console.log(data);
    io.emit('orientation', data);
  });

  socket.on('click', function(data){
    console.log(data);
    io.emit('click', data);
  });

});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
