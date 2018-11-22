class Room {
    constructor() {
        this.players = [];
        this.messages = [];
    }

    draw() {
        Object.keys(this.players).forEach((index) => {
            this.players[index].draw();
        });
        Object.keys(this.messages).forEach((index) => {
            this.messages[index].draw();
        });
    }

    update() {
        Object.keys(this.players).forEach((index) => {
            this.players[index].update();
        });
        Object.keys(this.messages).forEach((index) => {
            this.messages[index].update();
        });
    }
}