var Client = {};

Client.socket = io.connect();

Client.newPlayer = function (w, h, id) {
    Client.socket.emit('newPlayer', {
        w: w,
        h: h,
        id: id
    });
}

Client.sendClick = function (idOffline, destX, destY) {
    Client.socket.emit('move', {
        id: idOffline,
        x: destX,
        y: destY
    });
}

Client.sendMessage = function (playerName, msg) {
    Client.socket.emit('message', {
        name: playerName,
        message: msg
    });
}

Client.sendEmote = function (emoteName) {
    Client.socket.emit('emote', {
        emote: emoteName
    });
}

Client.socket.on('emote', function (data) {
    room.players[data.id].emote = chooseEmote(data.emote);
    setTimeout(function () {
        room.players[data.id].emote = false;
    }, 500);
});

Client.socket.on('message', function (data) {
    Object.keys(room.messages).forEach(function (index) {
        room.messages[index].updateCheck = true;
    });
    room.messages[data.messageId] = new Message(data.message, data.name);
});

Client.socket.on('move', function (data) {
    room.players[data.idOnline].destinationX = data.x;
    room.players[data.idOnline].destinationY = data.y;
    room.players[data.idOnline].updateCheck = true;
});

Client.socket.on('newPlayer', function (data) {
    player.id = data.id;
});

Client.socket.on('allPlayers', function (data) {
    Object.keys(data).forEach(function (index) {
        if (data[index].idOffline === player.id) {
            room.players[data[index].idOnline] = player;
            console.log("add eu mesmo");
        } else {
            room.players[data[index].idOnline] = new Player(true, data[index].x, data[index].y, 'Niko');
            console.log("add outros locao");
        }
    });
});

Client.socket.on('remove', function (data) {
    delete room.players[data];
});

Client.socket.on('newPlayer', function (data) {
    room.players[data.idOnline] = new Player(true, data.x, data.y, 'Niko');
});