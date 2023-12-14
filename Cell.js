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

    putFood() {
        this._putInCell(Cell.FOOD);
        this.element.textContent = Food.randomFood(); // Example food icon
        this._removeFromEmptyCells();
    }

    putSnakeHead() {
        this._putInCell(Cell.SNAKE_HEAD);
        this._setRainbowColor();
        this.element.textContent = '👀';
        this._removeFromEmptyCells();
    }

    putSnakeNoHead() {
        this._putInCell(Cell.SNAKE_NO_HEAD);
        this._setRainbowColor();
        this.element.textContent = '';
        this._removeFromEmptyCells();
    }

    reset() {
        this._putInCell(Cell.EMPTY);
        this.element.style.backgroundColor = '';
        this.element.textContent = '';
        // Add the cell to the emptyCells array if it's not already there
        if (this.grid.emptyCells.indexOf(this) === -1) {
            this.grid.emptyCells.push(this);
        }
    }
}
