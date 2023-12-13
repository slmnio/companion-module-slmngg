const rgb = (r, g, b)  =>  ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);

module.exports = {
    Lime: rgb(0, 255, 0),
    Red: rgb(255, 0, 0),
    Black: rgb(0, 0, 0),
    White: rgb(255, 255, 255),
    Teal: rgb(0, 255, 255),
    DarkBlue: rgb(0, 0, 255),
    Blue: rgb(0, 128, 255),
    Purple: rgb(120, 64, 180),
    get: (r,g,b) => rgb(r,g,b),
    getHex: (hex) => {
        if (!hex) return 0;
        hex = hex.replace("#", "");
        return rgb(parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16))
    }
}
