const png = require('fast-png')
const fs = require('fs')

class Image {
    constructor(obj) {
        if (typeof obj == 'undefined') {
            obj = {}
        }

        this.width = obj.width || 1
        this.height = obj.height || 1
        this.depth = obj.depth || 8
        this.channels = obj.channels || 4
        this.data = obj.data || new Uint8Array(this.width * this.height * this.channels)
    }
    getPixel(x, y) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            let offset = 4 * (y * this.width + x)

            return {
                red: this.data[offset],
                green: this.data[offset + 1],
                blue: this.data[offset + 2],
                alpha: this.data[offset + 3]
            }
        }
    }
    setPixel(x, y, color) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            if (typeof color == 'undefined') {
                color = {}
            }
            let red = color.red || 0
            let green = color.green || 0
            let blue = color.blue || 0
            let alpha = color.alpa || 255

            let offset = 4 * (y * this.width + x)

            this.data[offset] = red
            this.data[offset + 1] = green
            this.data[offset + 2] = blue
            this.data[offset + 3] = alpha
        }
    }

}

console.log('Loading images...')
let foreground = new Image(png.decode(fs.readFileSync('images/foreground.png')))
let background = new Image(png.decode(fs.readFileSync('images/background.png')))

console.log('Performing Chroma Key...')
let resultImage = ChromaKey(foreground, background, {red: 110, green: 181, blue: 121, alpha: 255}, 5)

console.log('Saving new image...')
fs.writeFileSync('result.png', png.encode(resultImage))

function ChromaKey(frontImage, backImage, color, threshold) {
    let result = new Image(frontImage)


    //TODO: Return Chroma Keyed image
    return result
}