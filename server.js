var express = require('express');
var app = express();
var server = require('http').createServer(app);
//var socket = require('socket.io');
var io = require('socket.io').listen(server);
app.use(express.static('public'));

server.listen(process.env.PORT || 5000);

var connectedPlayers = {};

console.log("Server is running!");

io.sockets.on('connection',

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
                socket.broadcast.emit('newPlayer', connectedPlayers[serverId]);
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

        socket.on('emote',
            function (data) {
                message = {
                    emote: data.emote,
                    id: socket.id
                }
                socket.broadcast.emit('emote', message);
            });

        socket.on('disconnect', function () {
            delete connectedPlayers[socket.id];
            io.emit('remove', socket.id);
        });

    });

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
};