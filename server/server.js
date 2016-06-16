'use strict'

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket) {
    console.log('a user connected');
    io.emit('connected');

    socket.on('phone-connected', function() {
		io.emit('phone-connected');
    })

    socket.on('start-calibrate', function() {
		io.emit('launch-experience');
    })

    socket.on('changed-current-world', function(data) {
        console.log(data);
        io.emit('changed-current-world', data);
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

http.listen(3000, function() {
    console.log('listening on *:3000');
});
