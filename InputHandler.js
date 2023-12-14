class InputHandler {
    constructor(game) {
        this.game = game;
        this.initialize();
    }

    initialize() {
        document.addEventListener('keydown', e => {
            this.game.snake.changeDirection(e.key);
        });
    }
}
