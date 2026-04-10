from PIL import Image

def process_macbook():
    img = Image.open('src/assets/macbook_lid.jpg').convert("RGBA")
    data = img.getdata()

    new_data = []
    # threshold for considering something 'white' background
    # The laptop is grey, so (230, 230, 230) and above should be safe
    # Also to avoid losing the bright parts of the laptop, we can flood fill,
    # but the simplest mask is Euclidean distance from pure white.
    # Actually, a simple flood fill from the borders is very safe.
    width, height = img.size
    
    # Simple array for flood fill
    pixels = img.load()
    
    # threshold to determine if background
    def is_bg(r, g, b):
        return r > 230 and g > 230 and b > 230

    visited = set()
    queue = []
    
    def enqueue(x, y):
        if x < 0 or x >= width or y < 0 or y >= height:
            return
        if (x, y) not in visited:
            r, g, b, a = pixels[x, y]
            if is_bg(r, g, b):
                visited.add((x, y))
                queue.append((x, y))

    # Add all four borders
    for x in range(width):
        enqueue(x, 0)
        enqueue(x, height - 1)
    for y in range(height):
        enqueue(0, y)
        enqueue(width - 1, y)

    # Flood fill
    while queue:
        x, y = queue.pop(0)
        pixels[x, y] = (0, 0, 0, 0) # transparent
        enqueue(x - 1, y)
        enqueue(x + 1, y)
        enqueue(x, y - 1)
        enqueue(x, y + 1)
        
    # Save as PNG
    img.save('src/assets/macbook_lid.png')
    print("Saved macbook_lid.png")

if __name__ == '__main__':
    process_macbook()
