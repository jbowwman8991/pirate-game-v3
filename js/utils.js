Array.prototype.parse2D = function() {
    const rows = []
    for (let i = 0; i < this.length; i += 96) {
        rows.push(this.slice(i, i + 96))
    }

    return rows
}

Array.prototype.createObjectFrom2D = function(offsetX, offsetY) {
    const objects = []
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 6) {
                objects.push(new CollisionBlock({
                    position: {
                        x: x * 20 + offsetX,
                        y: y * 20 + offsetY
                    }
                }))
            }
        })
    });

    return objects
}


