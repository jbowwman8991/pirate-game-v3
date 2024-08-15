window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 's':
            keys.s.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
        case 'x':
            keys.x.pressed = true
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 'x':
            keys.x.pressed = false
            break
    }
})

canvas.addEventListener('click', (e) => {
    if (level === 0) {
        if (
            e.offsetX >= canvas.width / 2 - 140 &&
            e.offsetX <= canvas.width / 2 + 140 &&
            e.offsetY >= canvas.height / 5 + 10 &&
            e.offsetY <= canvas.height / 5 + 120
        ) {
            gsap.to(overlay, {
                        opacity: 1,
                        onComplete: () => {
                            level++
                            levels[level].init()
                            gsap.to(overlay, {
                                opacity: 0
                            })
                        }
                    })
        }
    } else if (level === 3 || level === 4) {
        if (
            e.offsetX >= canvas.width / 2 - 70 &&
            e.offsetX <= canvas.width / 2 + 60 &&
            e.offsetY >= canvas.height / 2 + 10 &&
            e.offsetY <= canvas.height / 2 + 120
        ) {
            gsap.to(overlay, {
                        opacity: 1,
                        onComplete: () => {
                            level = 0
                            levels[level].init()
                            gsap.to(overlay, {
                                opacity: 0
                            })
                        }
                    })
        }
    }
})

canvas.addEventListener('mousedown', (e) => {
    if (level === 2) {
        keys.x.pressed = true
    }
})

canvas.addEventListener('mouseup', (e) => {
    if (level === 2) {
        keys.x.pressed = false
    }
})
