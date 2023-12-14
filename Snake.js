class Snake {
    constructor(grid) {
        this.grid = grid;
        this.segments = [2, 1, 0]; // Starting positions of the snake
        this.direction = 1; // Initial movement direction
        this.lastExecutedDirection = 1;

        // put the snake in the grid
        //   head
        this.grid.getCell(this.getHead()).putSnakeHead();
        //   other segments
        for (let i = 1; i < this.segments.length; i++) {
            this.grid.getCell(this.segments[i]).putSnakeNoHead();
        }
    }

    move() {
        const tail = this.segments.pop();
        this.segments.unshift(this.getHead() + this.direction);
        this.lastExecutedDirection = this.direction;
        return tail;
    }

    getHead() {
        return this.segments[0];
    }

    grow() {
        const tail = this.segments[this.segments.length - 1];
        this.segments.push(tail);
    }

    reset() {
        this.segments = [2, 1, 0];
        this.direction = this.lastExecutedDirection = SnakeDirection.RIGHT;
    }

    checkCollision() {
        const head = this.getHead();
        
        if (head + this.grid.width >= this.grid.cells.length && this.direction === SnakeDirection.DOWN || // Check if the snake has hit the bottom wall
            head % this.grid.width === this.grid.width - 1 && this.direction === SnakeDirection.RIGHT || // Check if the snake has hit the right wall
            head % this.grid.width === 0 && this.direction === SnakeDirection.LEFT || // Check if the snake has hit the left wall
            head - this.grid.width < 0 && this.direction === SnakeDirection.UP || // Check if the snake has hit the top wall
            this.grid.getCell(head + this.direction).isSnake()) { // Check if the snake has hit itself
            return true;
        }
        return false;
    }

    changeDirection(newDirection) {
        const newDirectionMap = {
          'ArrowRight': SnakeDirection.RIGHT,
          'ArrowLeft': SnakeDirection.LEFT,
          'ArrowUp': SnakeDirection.UP,
          'ArrowDown': SnakeDirection.DOWN
        };

        if (Math.abs(this.lastExecutedDirection) !== Math.abs(newDirection)) {
            this.direction = newDirectionMap[newDirection];
        }
    }
}
