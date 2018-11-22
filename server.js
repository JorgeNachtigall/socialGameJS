var express = require('express');
var app = express();
var server = app.listen(3000);
var socket = require('socket.io');
var io = socket(server);
app.use(express.static('public'));

var connectedPlayers = {};

console.log("Server is running!");

io.on('connection',

    function (socket) {

        socket.on('newPlayer',
            function (data) {
                console.log("New player connected - ID: " + data.id);
                connectedPlayers[socket.id] = {
                    idOnline: socket.id,
                    idOffline: data.id,
                    x: data.w,
                    y: data.h
                };
                socket.emit('allPlayers', connectedPlayers);
                socket.broadcast.emit('newPlayer', connectedPlayers[socket.id]);
            });

        socket.on('move',
            function (data) {
                connectedPlayers[socket.id].x = data.x;
                connectedPlayers[socket.id].y = data.y;
                socket.broadcast.emit('move', connectedPlayers[socket.id]);
            });

        socket.on('message',
            function (data) {
                message = {
                    name: data.name,
                    message: data.message,
                    messageId: generateId()
                };
                socket.broadcast.emit('message', message);
            });

    });

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
};