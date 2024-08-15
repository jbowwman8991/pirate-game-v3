class Player extends Sprite {
    constructor({
        collisionBlocks = [],
        imageSrc, 
        frameRate,
        animations
    }) {
        super({ imageSrc, frameRate, animations })
        this.position = {
            x: 260,
            y: 230
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.collisionBlocks = collisionBlocks
        this.lastDirection = 'right'
        this.leftCollide = false
        this.rightCollide = false
        this.topCollide = false
        this.bottomCollide = false

        this.damageDone = 0
        this.health = 100
    }

    update() {
        // this.position.x += this.velocity.x
        this.updateHitBox()
        this.checkForHorizontalCollisions()
        
        // Red hitBox 
        // c.fillStyle = 'rgba(255, 0, 0, 0.3)'
        // c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)
        
        // this.position.y += this.velocity.y
        this.updateHitBox()
        this.checkForVerticalCollisions()

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

    checkForHorizontalCollisions() {
        const filteredBlocks = this.filterBlocks()        
        for (let i = 0; i < filteredBlocks.length; i++) {
            const collisionBlock = filteredBlocks[i]
            
            // If a collision exists 
            if (
                this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x && 
                this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
                this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                // Collision on x-axis going to the left
                if (this.lastDirection === 'left') {
                    const offset = this.hitBox.position.x - this.position.x
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    this.leftCollide = true
                    break
                }
                // Collision on x-axis going to the right
                if (this.lastDirection === 'right') {
                    const offset = this.hitBox.position.x - this.position.x + this.hitBox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01
                    this.rightCollide = true
                    break
                }
            } 
        }
    }

    checkForVerticalCollisions() {
        const filteredBlocks = this.filterBlocks()        
        for (let i = 0; i < filteredBlocks.length; i++) {
            const collisionBlock = filteredBlocks[i]

            // If a collision exists 
            if (
                this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x && 
                this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
                this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                // Collision on y-axis going up
                if (this.lastDirection === 'up') {
                    const offset = this.hitBox.position.y - this.position.y
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    this.topCollide = true
                    break
                }
                // Collision on y-axis going down
                if (this.lastDirection === 'down') {
                    const offset = this.hitBox.position.y - this.position.y + this.hitBox.height
                    this.position.y = collisionBlock.position.y - offset - 0.01
                    this.bottomCollide = true
                    break
                }
            }
        }
    }
}