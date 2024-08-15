const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 10 
canvas.height = 64 * 10 

let parsedCollisions 
let collisionBlocks 
let background 

let offsetX = -140
let offsetY = -170

let counter = 0

let showChest = true
let openChest = false

let level = 0
let levels = {
    0: {
        init: () => {
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './images/backgrounds/ground-sand-1.png'
            })

            player.width = 144

            player.health = 100
            skeletons.forEach((skel) => {
                skel.health = 100
            })

            chestOpen.position = {
                x: 540,
                y: 540
            }

            chestClosed.position = {
                x: chestOpen.position.x,
                y: chestOpen.position.y + 50
            }

            counter = 0

            showChest = true
            openChest = false
        }
    },
    1: {
        init: () => {
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './images/backgrounds/bg-blue.jpg'
            })
        }
    },
    2: {
        // TODO: fix left attack moving pirate to the right 
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollisions.createObjectFrom2D(offsetX, offsetY)
            player.collisionBlocks = collisionBlocks
            
            background = new Sprite({
                position: {
                    x: offsetX, 
                    y: offsetY
                },
                imageSrc: './images/backgrounds/level-1-test.png'
            })

            player.position = {
                x: 260,
                y: 230
            }

            skeleton = new Skeleton({
                imageSrc: './images/sprites/sheets/skeleton-idle-right-sheet.png',
                frameRate: 1,
                animations: {
                    idleRight: {
                        frameRate: 1,
                        frameBuffer: 1,
                        loop: true,
                        imageSrc: './images/sprites/sheets/skeleton-idle-right-sheet.png'
                    },
                    idleLeft: {
                        frameRate: 1,
                        frameBuffer: 1,
                        loop: true,
                        imageSrc: './images/sprites/sheets/skeleton-idle-left-sheet.png'
                    },
                    walkRight: {
                        frameRate: 6,
                        frameBuffer: 6,
                        loop: true,
                        imageSrc: './images/sprites/sheets/skeleton-walk-right-sheet.png'
                    },
                    walkLeft: {
                        frameRate: 6,
                        frameBuffer: 6,
                        loop: true,
                        imageSrc: './images/sprites/sheets/skeleton-walk-left-sheet.png'
                    },
                    walkUp: {
                        frameRate: 6,
                        frameBuffer: 6,
                        loop: true,
                        imageSrc: './images/sprites/sheets/skeleton-walk-right-sheet.png'
                    },
                    walkDown: {
                        frameRate: 6,
                        frameBuffer: 6,
                        loop: true,
                        imageSrc: './images/sprites/sheets/skeleton-walk-left-sheet.png'
                    }
                }
            })
            
            skeleton2 = new Skeleton({
                imageSrc: './images/sprites/sheets/skeleton-idle-right-sheet.png',
                frameRate: 1,
                animations: {
                    idleRight: {
                        frameRate: 1,
                        frameBuffer: 1,
                        loop: true,
                        imageSrc: './images/sprites/sheets/skeleton-idle-right-sheet.png'
                    },
                    idleLeft: {
                        frameRate: 1,
                        frameBuffer: 1,
                        loop: true,
                        imageSrc: './images/sprites/sheets/skeleton-idle-left-sheet.png'
                    },
                    walkRight: {
                        frameRate: 6,
                        frameBuffer: 6,
                        loop: true,
                        imageSrc: './images/sprites/sheets/skeleton-walk-right-sheet.png'
                    },
                    walkLeft: {
                        frameRate: 6,
                        frameBuffer: 6,
                        loop: true,
                        imageSrc: './images/sprites/sheets/skeleton-walk-left-sheet.png'
                    },
                    walkUp: {
                        frameRate: 6,
                        frameBuffer: 6,
                        loop: true,
                        imageSrc: './images/sprites/sheets/skeleton-walk-right-sheet.png'
                    },
                    walkDown: {
                        frameRate: 6,
                        frameBuffer: 6,
                        loop: true,
                        imageSrc: './images/sprites/sheets/skeleton-walk-left-sheet.png'
                    }
                }
            })

            skeletons = [
                skeleton,
                skeleton2
            ]

            skeleton.position = {
                x: 480,
                y: 20
            }

            skeleton2.position = {
                x: 640,
                y: 640
            }

            player.health = 100
            skeletons.forEach((skel) => {
                skel.health = 100
            })
            counter = 0

            chestOpen.position = {
                x: 540,
                y: 540
            }

            chestClosed.position = {
                x: chestOpen.position.x,
                y: chestOpen.position.y + 50
            }

            showChest = true
            openChest = false
        }
    },
    3: {
        init: () => {
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './images/backgrounds/ground-sand-1.png'
            })

            player.position = {
                x: 260,
                y: 230
            }

            player.health = 100
            skeletons.forEach((skel) => {
                skel.health = 100
            })
            counter = 0

            chestOpen.position = {
                x: 540,
                y: 540
            }

            chestClosed.position = {
                x: chestOpen.position.x,
                y: chestOpen.position.y + 50
            }

            showChest = true
            openChest = false
        }
    },
    4: {
        init: () => {
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './images/backgrounds/ground-sand-1.png'
            })

            player.position = {
                x: 260,
                y: 230
            }

            player.health = 100
            skeletons.forEach((skel) => {
                skel.health = 100
            })
            counter = 0

            chestOpen.position = {
                x: 540,
                y: 540
            }

            chestClosed.position = {
                x: chestOpen.position.x,
                y: chestOpen.position.y + 50
            }

            showChest = true
            openChest = false
        }
    }
}

const player = new Player({
    imageSrc: './images/sprites/sheets/pirate-idle-right-sheet.png',
    frameRate: 1,
    animations: {
        idleRight: {
            frameRate: 1,
            frameBuffer: 1,
            loop: true,
            imageSrc: './images/sprites/sheets/pirate-idle-right-sheet.png'
        },
        idleLeft: {
            frameRate: 1,
            frameBuffer: 1,
            loop: true,
            imageSrc: './images/sprites/sheets/pirate-idle-left-sheet.png'
        },
        walkRight: {
            frameRate: 6,
            frameBuffer: 6,
            loop: true,
            imageSrc: './images/sprites/sheets/pirate-walk-right-sheet.png'
        },
        walkLeft: {
            frameRate: 6,
            frameBuffer: 6,
            loop: true,
            imageSrc: './images/sprites/sheets/pirate-walk-left-sheet.png'
        },
        walkUp: {
            frameRate: 6,
            frameBuffer: 6,
            loop: true,
            imageSrc: './images/sprites/sheets/pirate-walk-right-sheet.png'
        },
        walkDown: {
            frameRate: 6,
            frameBuffer: 6,
            loop: true,
            imageSrc: './images/sprites/sheets/pirate-walk-left-sheet.png',
            // onComplete: () => {
            //     gsap.to(overlay, {
            //         opacity: 1,
            //         onComplete: () => {
            //             level++
            //             levels[level].init()
            //             gsap.to(overlay, {
            //                 opacity: 0
            //             })
            //         }
            //     })
            // }
        },
        attackRight: {
            frameRate: 9,
            frameBuffer: 4,
            loop: false,
            imageSrc: './images/sprites/sheets/pirate-attack-right-sheet.png'
        },
        attackLeft: {
            frameRate: 9,
            frameBuffer: 4,
            loop: false,
            imageSrc: './images/sprites/sheets/pirate-attack-left-sheet.png'
        }
    }
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    x: {
        pressed: false
    }
}

let skeleton = new Skeleton({
    imageSrc: './images/sprites/sheets/skeleton-idle-right-sheet.png',
    frameRate: 1,
    animations: {
        idleRight: {
            frameRate: 1,
            frameBuffer: 1,
            loop: true,
            imageSrc: './images/sprites/sheets/skeleton-idle-right-sheet.png'
        },
        idleLeft: {
            frameRate: 1,
            frameBuffer: 1,
            loop: true,
            imageSrc: './images/sprites/sheets/skeleton-idle-left-sheet.png'
        },
        walkRight: {
            frameRate: 6,
            frameBuffer: 6,
            loop: true,
            imageSrc: './images/sprites/sheets/skeleton-walk-right-sheet.png'
        },
        walkLeft: {
            frameRate: 6,
            frameBuffer: 6,
            loop: true,
            imageSrc: './images/sprites/sheets/skeleton-walk-left-sheet.png'
        },
        walkUp: {
            frameRate: 6,
            frameBuffer: 6,
            loop: true,
            imageSrc: './images/sprites/sheets/skeleton-walk-right-sheet.png'
        },
        walkDown: {
            frameRate: 6,
            frameBuffer: 6,
            loop: true,
            imageSrc: './images/sprites/sheets/skeleton-walk-left-sheet.png'
        }
    }
})

let skeleton2 = new Skeleton({
    imageSrc: './images/sprites/sheets/skeleton-idle-right-sheet.png',
    frameRate: 1,
    animations: {
        idleRight: {
            frameRate: 1,
            frameBuffer: 1,
            loop: true,
            imageSrc: './images/sprites/sheets/skeleton-idle-right-sheet.png'
        },
        idleLeft: {
            frameRate: 1,
            frameBuffer: 1,
            loop: true,
            imageSrc: './images/sprites/sheets/skeleton-idle-left-sheet.png'
        },
        walkRight: {
            frameRate: 6,
            frameBuffer: 6,
            loop: true,
            imageSrc: './images/sprites/sheets/skeleton-walk-right-sheet.png'
        },
        walkLeft: {
            frameRate: 6,
            frameBuffer: 6,
            loop: true,
            imageSrc: './images/sprites/sheets/skeleton-walk-left-sheet.png'
        },
        walkUp: {
            frameRate: 6,
            frameBuffer: 6,
            loop: true,
            imageSrc: './images/sprites/sheets/skeleton-walk-right-sheet.png'
        },
        walkDown: {
            frameRate: 6,
            frameBuffer: 6,
            loop: true,
            imageSrc: './images/sprites/sheets/skeleton-walk-left-sheet.png'
        }
    }
})

let skeletons = [
    skeleton,
    skeleton2
]

const startButton = new Sprite({
    position: {
        x: canvas.width / 2 - 150,
        y: canvas.height / 5
    },
    imageSrc: './images/backgrounds/button-start.png'
})

const creditsButton = new Sprite({
    position: {
        x: canvas.width / 2 - 200,
        y: canvas.height / 2
    },
    imageSrc: './images/backgrounds/button-credits.png'
})

const ship = new Ship({
    imageSrc: './images/backgrounds/pirate-ship-1.png',
    frameRate: 1
})

const cloud1 = new Cloud({
    imageSrc: './images/backgrounds/cloud-1.png',
    frameRate: 1
})

const cloud2 = new Cloud({
    imageSrc: './images/backgrounds/cloud-2.png',
    frameRate: 1
})

cloud1.position.y = 10
cloud1.position.x = 200
cloud2.position.y = 80
cloud2.position.x = 500

const wave = new Wave({
    imageSrc: './images/backgrounds/wave-1.png',
    frameRate: 1
})

const wave2 = new Wave({
    imageSrc: './images/backgrounds/wave-1.png',
    frameRate: 1
})

wave.position.y = canvas.height - 160
wave2.position.y = canvas.height - 160
wave2.position.x = canvas.width

const gameOver = new Sprite({
    position: {
        x: canvas.width / 2 - 230,
        y: canvas.height / 5
    },
    imageSrc: './images/backgrounds/end-game-over.png'
})

const winner = new Sprite({
    position: {
        x: canvas.width / 2 - 300,
        y: canvas.height / 5
    },
    imageSrc: './images/backgrounds/end-winner.png'
})

const backButton = new Sprite({
    position: {
        x: canvas.width / 2 - 80,
        y: canvas.height / 2
    },
    imageSrc: './images/backgrounds/button-back.png'
})

const nums = [
    new Sprite({
        position: {
            x: 20,
            y: 20
        },
        imageSrc: './images/backgrounds/num-0.png'
    }),
    new Sprite({
        position: {
            x: 20,
            y: 20
        },
        imageSrc: './images/backgrounds/num-1.png'
    }),
    new Sprite({
        position: {
            x: 20,
            y: 20
        },
        imageSrc: './images/backgrounds/num-2.png'
    }),
    new Sprite({
        position: {
            x: 20,
            y: 20
        },
        imageSrc: './images/backgrounds/num-3.png'
    }),
    new Sprite({
        position: {
            x: 20,
            y: 20
        },
        imageSrc: './images/backgrounds/num-4.png'
    }),
    new Sprite({
        position: {
            x: 20,
            y: 20
        },
        imageSrc: './images/backgrounds/num-5.png'
    }),
    new Sprite({
        position: {
            x: 20,
            y: 20
        },
        imageSrc: './images/backgrounds/num-6.png'
    }),
    new Sprite({
        position: {
            x: 20,
            y: 20
        },
        imageSrc: './images/backgrounds/num-7.png'
    }),
    new Sprite({
        position: {
            x: 20,
            y: 20
        },
        imageSrc: './images/backgrounds/num-8.png'
    }),
    new Sprite({
        position: {
            x: 20,
            y: 20
        },
        imageSrc: './images/backgrounds/num-9.png'
    }),
    new Sprite({
        position: {
            x: 20,
            y: 20
        },
        imageSrc: './images/backgrounds/num-10.png'
    })
]

const chestOpen = new Sprite({
    position: {
        x: 540,
        y: 540
    },
    imageSrc: './images/chest-open-1.png'
})

const chestClosed = new Sprite({
    position: {
        x: chestOpen.position.x,
        y: chestOpen.position.y + 50
    },
    imageSrc: './images/chest-closed-1.png'
})

const skull = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './images/skull-1.png'
})

const overlay = {
    opacity: 0
}

let lastTime = 0
let fps = 60
let interval = 1000 / fps

function animate(currentTime) {

    let deltaTime = currentTime - lastTime

    if (deltaTime >= interval) {
        lastTime = currentTime - (deltaTime % interval)
        // Clear 
        c.fillStyle = 'rgba(0, 200, 255, 1)'
        c.fillRect(0, 0, canvas.width, canvas.height)
        
        // Background
        // background.draw()
    
        if (level === 0) {
            background.draw()

            // Start
            startButton.draw()

            // Credits 
            // creditsButton.draw()

            player.draw()
            player.update()
            player.switchSprite('walkLeft')
            player.position.x = 160
            player.position.y = canvas.height / 2

            skeleton.draw()
            skeleton.update()
            skeleton.switchSprite('walkLeft')
            skeleton.position.x = 340
            skeleton.position.y = canvas.height / 2
        } else if (level === 1) {
            background.draw()

            // Cloud
            cloud1.draw()
            cloud1.update()
            cloud2.draw()
            cloud2.update()
            
            // Ship
            ship.draw()
            ship.update()
            
            // Wave
            wave.draw()
            wave.update()
            wave2.draw()
            wave2.update()
        } else if (level === 3) {
            // Game Over
            gameOver.draw()
            // Back
            backButton.draw()

            skull.position = {
                x: canvas.width / 2 - skull.width / 2,
                y: canvas.height / 2 + 180
            }
            skull.draw()
        } else if (level === 4) {
            // Winner
            winner.draw()
            // Back
            backButton.draw()
            
            chestOpen.position = {
                x: canvas.width / 2 - chestOpen.width / 2,
                y: canvas.height / 2 + 140
            }
            chestOpen.draw()
        } else {
            background.draw()

            if (player.health == 0) {
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level = 3
                        levels[level].init()
                        gsap.to(overlay, {
                            opacity: 0
                        })
                    }
                })
            } else {
                if (counter >= 10) {
                    
                    skeletons = []

                    if (openChest) chestOpen.draw()
                    if (!openChest) chestClosed.draw()
                    if (showChest) {
                        showChest = false
                        
                        let chestOpenX = 540
                        // let chestOpenY = 540 
                        if (chestOpenX > background.position.x + background.width - 100) {
                            chestOpenX = 0
                        }
                        chestOpen.position = {
                            x: chestOpenX,
                            y: player.position.y
                        }
                        chestClosed.position = {
                            x: chestOpen.position.x,
                            y: chestOpen.position.y + 50
                        }
                    }

                    if (!openChest) {
                        if (
                            player.hitBox.position.x <= chestClosed.position.x + chestClosed.width + 40 &&
                            player.hitBox.position.x + player.hitBox.width >= chestClosed.position.x - 40 &&
                            player.hitBox.position.y + player.hitBox.height >= chestClosed.position.y - 40 &&
                            player.hitBox.position.y <= chestClosed.position.y + chestClosed.height + 40
                        ) {
                            if (
                                keys.x.pressed && 
                                (((player.lastDirection === 'right' || player.lastDirection === 'up') && chestClosed.position.x > player.position.x) ||
                                ((player.lastDirection === 'left' || player.lastDirection === 'down') && chestClosed.position.x < player.position.x))
                            ) {
                                openChest = true
                            }
                        }
                    }

                    if (openChest) {
                        gsap.to(overlay, {
                            opacity: 1,
                            onComplete: () => {
                                level = 4
                                levels[level].init()
                                gsap.to(overlay, {
                                    opacity: 0
                                })
                            },
                            duration: 2
                        })
                    }
                } 

                // Player
                player.draw()
                player.update()
        
                // Skeleton
                skeletons.forEach((skel) => {
                    skel.draw()
                    skel.update()
                })
        
                // Collisions
                // collisionBlocks.forEach(collisionBlock => {
                //     collisionBlock.draw()
                // })

                if (keys.x.pressed && keys.w.pressed) {
                    keys.w.pressed = false
                } else if (keys.x.pressed && keys.a.pressed) {
                    keys.a.pressed = false
                } else if (keys.x.pressed && keys.s.pressed) {
                    keys.s.pressed = false
                } else if (keys.x.pressed && keys.d.pressed) {
                    keys.d.pressed = false
                }

                if (!keys.x.pressed) {
                    player.width = 144
                    // player.position.x = 260
                }
                
                if (keys.w.pressed) {
                    player.switchSprite('walkUp')
        
                    player.leftCollide = false
                    player.rightCollide = false
                    player.bottomCollide = false
        
                    if (!player.topCollide) {
                        background.position.y += 10
                        chestOpen.position.y += 10
                        chestClosed.position.y += 10
                        skeletons.forEach((skel) => {
                            skel.position.y += 10
                        })
                        offsetY += 10
                        collisionBlocks = parsedCollisions.createObjectFrom2D(offsetX, offsetY)
                    }
                    player.lastDirection = 'up'
                } else if (keys.s.pressed) {
                    player.switchSprite('walkDown')
        
                    player.leftCollide = false
                    player.rightCollide = false
                    player.topCollide = false
        
                    if (!player.bottomCollide) {
                        background.position.y -= 10
                        chestOpen.position.y -= 10
                        chestClosed.position.y -= 10
                        skeletons.forEach((skel) => {
                            skel.position.y -= 10
                        })
                        offsetY -= 10
                        collisionBlocks = parsedCollisions.createObjectFrom2D(offsetX, offsetY)
                    }
                    player.lastDirection = 'down'
                } else if (keys.a.pressed) {
                    player.switchSprite('walkLeft')
        
                    player.rightCollide = false
                    player.topCollide = false
                    player.bottomCollide = false
        
                    if (!player.leftCollide) {
                        background.position.x += 10
                        chestOpen.position.x += 10
                        chestClosed.position.x += 10
                        skeletons.forEach((skel) => {
                            skel.position.x += 10
                        })
                        offsetX += 10
                        collisionBlocks = parsedCollisions.createObjectFrom2D(offsetX, offsetY)
                    }
                    player.lastDirection = 'left'
                } else if (keys.d.pressed) {
                    player.switchSprite('walkRight')
        
                    player.leftCollide = false
                    player.topCollide = false
                    player.bottomCollide = false 
        
                    if (!player.rightCollide) {
                        background.position.x -= 10
                        chestOpen.position.x -= 10
                        chestClosed.position.x -= 10
                        skeletons.forEach((skel) => {
                            skel.position.x -= 10
                        })
                        offsetX -= 10
                        collisionBlocks = parsedCollisions.createObjectFrom2D(offsetX, offsetY)
                    }
                    player.lastDirection = 'right'
                } else if (keys.x.pressed) {
                    player.width = 244
                    if (player.lastDirection === 'left' || player.lastDirection === 'down') {
                        player.switchSprite('attackLeft')
                    } else {
                        player.switchSprite('attackRight')
                    }
                } else {
                    if (player.lastDirection === 'left' || player.lastDirection === 'down') player.switchSprite('idleLeft')
                        else player.switchSprite('idleRight')
                }
                player.collisionBlocks = collisionBlocks 

                skeletons.forEach((skel) => {
                    skel.goto = {
                        x: player.position.x,
                        y: player.position.y
                    }
                })

                nums[counter].draw()
            }
        }
        
        // Level change
        c.save()
        c.globalAlpha = overlay.opacity 
        c.fillStyle = 'black'
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.restore()
    }


    window.requestAnimationFrame(animate)
}

levels[level].init()
animate()




























































