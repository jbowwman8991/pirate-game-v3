class Skeleton extends Sprite {
    constructor({
        collisionBlocks = [],
        imageSrc,
        frameRate,
        animations,
        goto
    }) {
        super({ imageSrc, frameRate, animations })
        this.position = {
            x: 480,
            y: 20
        }
        this.velocity = {
            x: 0, 
            y: 0
        }
        this.collisionBlocks = collisionBlocks
        this.goto = goto
        this.direction
        this.leftCollide = false
        this.rightCollide = false
        this.topCollide = false
        this.bottomCollide = false

        this.damageDone = 0
        this.health = 100
    }

    update() {
        this.position.x += this.velocity.x
        this.updateHitBox()
        this.checkForPlayerCollision()
        // this.checkForHorizontalCollisions()

        // Red hitBox 
        // c.fillStyle = 'rgba(255, 0, 0, 0.3)'
        // c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)

        this.position.y += this.velocity.y
        this.updateHitBox()
        // this.checkForVerticalCollisions()

        if (this.velocity.x > 0) this.switchSprite('walkRight')
        else if (this.velocity.x < 0) this.switchSprite('walkLeft')
        else if (this.velocity.y > 0) this.switchSprite('walkDown')
        else if (this.velocity.y < 0) this.switchSprite('walkUp')

        this.calculateGoto()

        if (level === 2) this.updateHealthBar()
    }

    updateHealthBar() {
        c.fillStyle = 'rgba(255, 0, 0, 1)'
        c.fillRect(this.position.x + 22, this.position.y + this.height - 2, 100, 10)

        c.fillStyle = 'rgba(0, 255, 0, 1)'
        c.fillRect(this.position.x + 22, this.position.y + this.height - 2, this.health, 10)
    }

    switchSprite(name) {
        if (this.image === this.animations[name].image) return
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
        this.currentAnimation = this.animations[name]
    }

    updateHitBox() {
        this.hitBox = {
            position: {
                x: this.position.x + 12,
                y: this.position.y + 12
            },
            width: 120,
            height: 180
        }
    }

    calculateGoto() {
        if (this.goto?.x && this.goto?.y) {
            let dx = this.goto.x - this.position.x
            let dy = this.goto.y - this.position.y
            let distance = Math.sqrt(dx * dx + dy * dy)

            this.velocity.x = dx / distance
            this.velocity.y = dy / distance
        }
    }
    
    checkForPlayerCollision() {
        if (
            this.hitBox.position.x <= player.position.x + player.width - 20 &&
            this.hitBox.position.x + this.hitBox.width >= player.position.x + 20 &&
            this.hitBox.position.y + this.hitBox.height >= player.position.y + 20 &&
            this.hitBox.position.y <= player.position.y + player.height - 20
        ) {
            // Doing damage
            if (
                keys.x.pressed && 
                (((player.lastDirection === 'right' || player.lastDirection === 'up') && this.position.x > player.position.x) ||
                ((player.lastDirection === 'left' || player.lastDirection === 'down') && this.position.x < player.position.x))
            ) {
                player.damageDone += 0.5
                if (player.damageDone >= 10) {
                    player.damageDone = 0
                    this.health -= 10
                    if (this.health <= 0) {
                        let randoX = Math.random() * background.width + background.position.x
                        let randoY = Math.random() * background.height + background.position.y
                        while ((randoX >= 0 && randoX <= 640) && (randoY >= 0 && randoY <= 640)) {
                            randoX = Math.random() * background.width + background.position.x
                            randoY = Math.random() * background.height + background.position.y
                        }
                        this.position = {
                            x: randoX, 
                            y: randoY
                        }
                        counter += 1
                        this.health = 100
                    }
                }
            } else {
                this.damageDone += 0.15
                if (this.damageDone >= 10) {
                    this.damageDone = 0
                    player.health -= 10
                    if (player.health <= 0) player.health = 0
                }
            }

            // Collision on x-axis going to the left
            if (this.velocity.x < 0) {
                const offset = this.hitBox.position.x - this.position.x + 20
                this.position.x = player.position.x + player.width - offset + 0.01
                this.leftCollide = true
            }
            // Collision on x-axis going to the right
            else if (this.velocity.x > 0) {
                const offset = this.hitBox.position.x - this.position.x + this.hitBox.width - 20
                this.position.x = player.position.x - offset - 0.01 
                this.rightCollide = true
            }
            // Collision on y-axis going up
            else if (this.velocity.y < 0) {
                const offset = this.hitBox.position.y - this.position.y + 20
                this.position.y = player.position.y + player.height - offset + 0.01
                this.topCollide = true
            }
            // Collision on y-axis going down
            else if (this.velocity.y > 0) {
                const offset = this.hitBox.position.y - this.position.y + this.hitBox.height - 20
                this.position.y = player.position.y - offset - 0.01
                this.bottomCollide = true
            }
        }
    }

    // checkForHorizontalCollisions() {
    //     const filteredBlocks = this.filterBlocks()
    //     for (let i = 0; i < filteredBlocks.length; i++) {
    //         const collisionBlock = filteredBlocks[i]
            
    //         // If a collision exists 
    //         if (
    //             this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
    //             this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x && 
    //             this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
    //             this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
    //         ) {
    //             // Collision on x-axis going to the left
    //             if (this.lastDirection === 'left') {
    //                 const offset = this.hitBox.position.x - this.position.x
    //                 this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
    //                 this.leftCollide = true
    //                 break
    //             }
    //             // Collision on x-axis going to the right
    //             if (this.lastDirection === 'right') {
    //                 const offset = this.hitBox.position.x - this.position.x + this.hitBox.width
    //                 this.position.x = collisionBlock.position.x - offset - 0.01
    //                 this.rightCollide = true
    //                 break
    //             }
    //         } 
    //     }
    // }

    // checkForVerticalCollisions() {
    //     const filteredBlocks = this.filterBlocks()
    //     for (let i = 0; i < filteredBlocks.length; i++) {
    //         const collisionBlock = filteredBlocks[i]

    //         // If a collision exists 
    //         if (
    //             this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
    //             this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x && 
    //             this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
    //             this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
    //         ) {
    //             // Collision on y-axis going up
    //             if (this.lastDirection === 'up') {
    //                 const offset = this.hitBox.position.y - this.position.y
    //                 this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
    //                 this.topCollide = true
    //                 break
    //             }
    //             // Collision on y-axis going down
    //             if (this.lastDirection === 'down') {
    //                 const offset = this.hitBox.position.y - this.position.y + this.hitBox.height
    //                 this.position.y = collisionBlock.position.y - offset - 0.01
    //                 this.bottomCollide = true
    //                 break
    //             }
    //         }
    //     }
    // }
}