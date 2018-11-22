class Message {
    constructor(message, playerName) {
        this.message = message;
        this.playerName = playerName + ':';
        this.messageId;
        this.textSize = 15;
        this.playerNameX = 10;
        this.playerNameY = (H / 2) - 100 + 5;
        this.rectX = 0;
        this.rectY = (H / 2) - 100;
        this.rectW = W - 2;
        this.rectH = 30;
        this.updateCheck = false;
    }

    draw() {
        rect(this.rectX, this.rectY, this.rectW, this.rectH, 15);
        textSize(this.textSize);
        textStyle(BOLD);
        text(this.playerName, this.playerNameX, this.playerNameY, this.rectW, this.rectH);
        textStyle(NORMAL);
        text(this.message, this.playerNameX + ((this.playerName.length - 1) * 11), this.playerNameY, this.rectW, this.rectH);
    }

    update() {
        if (this.updateCheck) {
            this.rectY = this.rectY - 30;
            this.playerNameY = this.playerNameY - 30;
            this.updateCheck = false;
            console.log("deveria dar update");
        }
    }
}

function getMessage(message) {
    if (event.key === 'Enter') {
        msg = message.value;
        message.value = "";
    }
}