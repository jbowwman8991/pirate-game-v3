class Cloud extends Sprite {
    constructor({
        imageSrc,
        frameRate,
        animations
    }) {
        super({ imageSrc, frameRate, animations })
        this.position = {
            x: 0, 
            y: 0
        }
        this.velocity = {
            x: -Math.random() - 1,
            y: 0
        }
    }

    update() {
        this.position.x += this.velocity.x

        if (this.position.x <= -this.width) {
            this.position.x = canvas.width
            this.velocity.x = -Math.random() - 1
        }
    }
}