class Ship extends Sprite {
    constructor({
        imageSrc,
        frameRate,
        animations
    }) {
        super({ imageSrc, frameRate, animations })
        this.position = {
            x: 60, 
            y: 20
        }
        this.velocity = {
            x: 1,
            y: 1
        }
        this.duration = 0
    }

    update() {
        if (this.duration <= 300) {
            this.position.y += this.velocity.y
            this.upAndDown()

            this.position.x += this.velocity.x
            this.leftAndRight()

            this.duration ++
        } else {
            gsap.to(overlay, {
                        opacity: 1,
                        onComplete: () => {
                            level ++
                            levels[level].init()
                            gsap.to(overlay, {
                                opacity: 0
                            })
                        }
                    })
            this.duration = 0
        }
    
    }

    upAndDown() {
        if (this.position.y < 10) {
            this.velocity.y = Math.random() 
        } else if (this.position.y > 60) {
            this.velocity.y = -Math.random()
        }
    }

    leftAndRight() {
        if (this.position.x < 40) {
            this.velocity.x = Math.random()
        } else if (this.position.x > 80) {
            this.velocity.x = -Math.random()
        }
    }
}