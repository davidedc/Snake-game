class Cell {

    // static constants
    static EMPTY = 0;
    static SNAKE_NO_HEAD = 1;
    static SNAKE_HEAD = 2;
    static FOOD = 3;
    
    constructor(grid, element, x, y) {
        this.grid = grid; // Grid object containing the cell
        this.element = element; // DOM element representing the cell
        this.type = Cell.EMPTY; // Initial type of the cell
        this.x = x;
        this.y = y;
    }


    isSnake() {
        return this.type === Cell.SNAKE_NO_HEAD || this.type === Cell.SNAKE_HEAD;
    }

    isSnakeHead() {
        return this.type === Cell.SNAKE_HEAD;
    }

    isFood() {
        return this.type === Cell.FOOD;
    }

    isEmpty() {
        return this.type === Cell.EMPTY;
    }

    _removeFromEmptyCells() {
        const index = this.grid.emptyCells.indexOf(this);
        if (index !== -1) {
            this.grid.emptyCells.splice(index, 1);
        }
    }

    _setRainbowColor() {
        this.element.style.backgroundColor = `hsl(${10*(this.x+this.y)}, 100%, 50%)`;
    }

    _putInCell(type) {
        this.type = type;
        this.element.className = ''; // Clear existing classes
        this.element.classList.add(type); // Add the new type as a class for styling
    }

    _putEmoji(emojiImage) {
        this.element.innerHTML = `<img src="${emojiImage.src}">`;
    }

    _removeEmoji() {
        this.element.innerHTML = '';
    }

    putFood() {
        this._putInCell(Cell.FOOD);
        // random food returns an Image with a src attribute of something like 'green-apple.svg'
        // ... use that file to show the food
        const foodImage = Food.randomFood();
        this._putEmoji(foodImage);
        this._removeFromEmptyCells();
    }

    putSnakeHead() {
        this._putInCell(Cell.SNAKE_HEAD);
        this._setRainbowColor();
        // put the image for the eyes in the cell
        // the image is eyesEmojiImage
        this._putEmoji(eyesEmojiImage);

        this._removeFromEmptyCells();
    }

    putSnakeNoHead() {
        this._putInCell(Cell.SNAKE_NO_HEAD);
        this._setRainbowColor();
        this._removeEmoji();
        this._removeFromEmptyCells();
    }

    reset() {
        this._putInCell(Cell.EMPTY);
        this.element.style.backgroundColor = '';
        this._removeEmoji();
        // Add the cell to the emptyCells array if it's not already there
        if (this.grid.emptyCells.indexOf(this) === -1) {
            this.grid.emptyCells.push(this);
        }
    }
}
