'use strict'

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.send('<h1>Hello world</h1>');
});

var connected = false;

io.on('connection', function(socket) {
    console.log('a user connected');
    io.emit('connected');

    if(!connected) {

    }
    socket.on('phone-connected', function() {
        connected = true;
        console.log('phone-connected-ok');
		io.emit('phone-connected-ok');
    })

    socket.on('changed-current-world', function(data) {
        io.emit('changed-current-world', data);
    })

    socket.on('go-to-experience', function() {
		io.emit('go-to-experience');
    })

    socket.on('start-experience', function() {
        console.log('start');
		io.emit('start-experience');
    })

    socket.on('end-experience', function() {
		io.emit('end-experience');
    })

    socket.on('go-back-to-worlds', function() {
		io.emit('go-back-to-worlds');
    })

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    //motion
    socket.on('motion', function(data) {
        io.emit('motion', data);
    });

    socket.on('delta-motion', function(data) {
        io.emit('delta-motion', data);
    });

    //rotation
    socket.on('rotation', function(data) {
        io.emit('rotation', data);
    });

    socket.on('delta-rotation', function(data) {
        io.emit('delta-rotation', data);
    });

    //reference
    socket.on('ref-motion', function(data) {
        io.emit('ref-motion', data);
    });

    socket.on('ref-rotation', function(data) {
        io.emit('ref-rotation', data);
    });
});

http.listen(4000, function() {
    console.log('listening on *:4000');
});
