const { Jimp } = require('jimp');

async function processMacbook() {
  try {
    const image = await Jimp.read('src/assets/macbook_lid.jpg');
    
    // Convert to Jimp's internal representation which has width and height directly or on bitmap
    const width = image.bitmap.width;
    const height = image.bitmap.height;

    // Use pure Euclidean distance from white (255, 255, 255)
    const threshold = 15; // Dist threshold. E.g. anything within 15 points of 255
    const isBackground = (x, y) => {
        const hex = image.getPixelColor(x, y);
        const rgba = Jimp.intToRGBA(hex);
        return (255 - rgba.r) < threshold && (255 - rgba.g) < threshold && (255 - rgba.b) < threshold;
    }

    const setTransparent = (x, y) => {
        image.setPixelColor(0x00000000, x, y);
    }

    const visited = new Array(width * height).fill(false);
    const queue = [];

    const enqueue = (x, y) => {
        if (x < 0 || x >= width || y < 0 || y >= height) return;
        const idx = y * width + x;
        if (!visited[idx] && isBackground(x, y)) {
            visited[idx] = true;
            queue.push({x, y});
        }
    }

    for (let x = 0; x < width; x++) {
        enqueue(x, 0);
        enqueue(x, height - 1);
    }
    for (let y = 0; y < height; y++) {
        enqueue(0, y);
        enqueue(width - 1, y);
    }

    while (queue.length > 0) {
        const p = queue.shift();
        setTransparent(p.x, p.y);
        enqueue(p.x - 1, p.y);
        enqueue(p.x + 1, p.y);
        enqueue(p.x, p.y - 1);
        enqueue(p.x, p.y + 1);
    }

    await image.write('src/assets/macbook_lid.png'); // Overwrite as PNG (will save as .png)
    console.log('Successfully created macbook_lid.png');

  } catch (error) {
    console.error('Error:', error);
  }
}

processMacbook();
