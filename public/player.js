class Player {
    constructor(visible, x, y, playerName) {
        this.player = createSprite(x, y, 22, 44);
        this.playerName = playerName;
        this.player.addAnimation('idle', 'src/img/p1.png');
        this.destinationX = x;
        this.destinationY = y;
        this.visible = visible;
        this.updateCheck = false;
        this.id = generateId();

        this.player.maxSpeed = 2;
    }

    draw() {
        if (this.visible) {
            drawSprite(this.player);
        }
    }

    update() {
        if (this.updateCheck) {
            //move with interpolation and animate
            this.player.velocity.x = (this.destinationX - this.player.position.x) / 2;
            this.player.velocity.y = (this.destinationY - this.player.position.y) / 2;
            if (this.player.getSpeed() === 0) this.updateCheck = false;
        }
    }
}

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
};