class SnakeGame {

  constructor(gridWidth, gridHeight, cellSize, intervalTime) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.cellSize = cellSize;
    this.intervalTime = intervalTime;
    this.scoreDisplay = document.querySelector(".score span");    

    // Create the InputHandler instance to handle keyboard input
    this.inputHandler = new InputHandler(this);
  }

  setIntervalTime(intervalTime) {
    // only do this if the game is not playing, otherwise throw an error
    if (gameStateMachine.currentState !== SnakeGamePlayingState) {
      this.intervalTime = intervalTime;
    }
    else {
      throw new Error('Cannot change the interval time while the game is running.');
    }
  }

  start() {
      this.reset();
      this.startGameLoop();
  }

  pauseGameLoop() {
    clearInterval(this.interval);
  }

  stopGameLoop() {
    clearInterval(this.interval);
  }

  startGameLoop() {
    this.interval = setInterval(() => this.gameLoop(), this.intervalTime);
  }

  reset() {
    // we have these static properties in the SnakeDirection class
    // that allow us to define directions neatly,
    // however we have to update them in case the grid size changes.
    SnakeDirection.UP = -this.gridWidth;
    SnakeDirection.DOWN = this.gridWidth;

    // Create instances of the Grid, Snake, Food, and Sound classes
    this.grid = new Grid(gridWidth, gridHeight, cellSize);
    this.snake = new Snake(this.grid);
    this.food = new Food();
    this.sound = new Sound();

    this.score = 0;
    this.updateScore();

    this.pauseGameLoop();

    this.food.place(this.grid);
  }

  updateScore() {
      this.scoreDisplay.textContent = this.score;
  }

  gameLoop() {
    if (this.snake.checkCollision()) {
        this.grid.shake();
        this.stopGameLoop();
        gameStateMachine.changeState(SnakeGameGameOverState);
        return;
    }

    const previousHead = this.snake.getHead();
    const tail = this.snake.move(); // Move the snake and get the removed tail segment

    this.grid.getCell(tail).reset(); // Reset the tail cell in the grid

    const newHead = this.snake.getHead();

    if (this.grid.getCell(newHead).isFood()) {
        this.sound.play('eat');
        this.grid.getCell(this.food.position).reset();
        this.snake.grow();
        this.score++;
        this.food.place(this.grid);
    }

    this.grid.getCell(previousHead).putSnakeNoHead(); // Update the old head cell
    this.grid.getCell(newHead).putSnakeHead(); // Update the new head position in the grid
    this.updateScore();
  }

}
