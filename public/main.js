let room;
let player;
let W, H;
let x, y;
let backFloor;
let floor = [];
let msg;
let name;
let input;
let emojiSmile, emojiSad, emojiGlasses, emojiAngry, emojiSurprised;

function preload() {
    emojiSmile = loadImage('src/img/emoji-smile.png');
    emojiSad = loadImage('src/img/emoji-sad.png');
    emojiGlasses = loadImage('src/img/emoji-glasses.png');
    emojiAngry = loadImage('src/img/emoji-angry.png');
    emojiSurprised = loadImage('src/img/emoji-surprised.png');
    emojiDevil = loadImage('src/img/emoji-devil.png')
}

function setup() {
    W = 480;
    H = 800;
    let canvas = createCanvas(W, H);
    canvas.parent('sketch-holder');
    backFloor = loadImage('src/img/map.png');
    createFloor();
    room = new Room();
    player = new Player(true, W / 2, (H / 2) + 130, false);

}

function draw() {
    staticRender();
    fixedUpdate();
    update();
    lateUpdate();
    render();
}

function fixedUpdate() {
    if (name) {
        player.playerName = name;
        Client.newPlayer(W / 2, (H / 2) + 130, player.id);
        name = false;
    }
}

function update() {
    room.update();
}

function lateUpdate() {

}

function render() {
    room.draw();
}

function staticRender() {
    background(0);
    image(backFloor, (W / 2) - (backFloor.width / 2), H - backFloor.height);
}

function mousePressed() {
    if (player.playerName) {
        if (collidePointPoly(mouseX, mouseY, floor)) {
            Client.sendClick(player.id, mouseX, mouseY - 16);
            player.destinationX = mouseX;
            player.destinationY = mouseY - 16;
            player.updateCheck = true;
        }
    }
}

function keyPressed() {
    if (keyCode === ENTER) {
        if (msg.length > 0 && player.playerName) {
            console.log(player.playerName);
            Client.sendMessage(player.playerName, msg);
            Object.keys(room.messages).forEach(function (index) {
                room.messages[index].updateCheck = true;
            });
            room.messages.push(new Message(msg, player.playerName));
        }
    }
}

function createFloor() {
    floor[0] = createVector((W / 2) - 207, (H / 2) + 143);
    floor[1] = createVector((W / 2) + 206, (H / 2) + 143);
    floor[2] = createVector((W / 2) + 206, (H / 2) + 366);
    floor[3] = createVector((W / 2) - 207, (H / 2) + 366);
}

function startMenu() {
    let txt;
    let person = prompt("Enter your username:", "username");
    if (person == null || person == "") {
        name = false;
    } else {
        name = person;
    }
}

function getEmote(emote) {
    player.emote = chooseEmote(emote);
    Client.sendEmote(emote);
    setTimeout(function () {
        player.emote = false;
    }, 500);
}

function chooseEmote(emote) {
    switch (emote) {
        case "smile":
            return emojiSmile;
        case "sad":
            return emojiSad;
        case "surprised":
            return emojiSurprised;
        case "glasses":
            return emojiGlasses;
        case "angry":
            return emojiAngry;
        case "devil":
            return emojiDevil;
    }
}