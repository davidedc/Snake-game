class SnakeGameGameOverState extends AppState {
    static menu;

    static moveToNextStateToReStartGame(stateMachine) {
        this.menu.dismiss();
        stateMachine.changeState(SnakeGameMainMenuState);
    }

    static showGameOverMenu(stateMachine) {
        this.menu = new Menu();

        // Creating and displaying the menu
        this.menu.setTitle('Game Over');
        this.menu.addTitleDividerLine();
        this.menu.addLine("Score: " + game.score);
        this.menu.addSelectableEntry('Play again', () => {
            this.moveToNextStateToReStartGame(stateMachine); // Adjusted for static context
        });
        this.menu.display();
    }

    static onEnter(stateMachine) {
        
        // the game loop has already been stopped by the time we enter this state

        game.sound.play('gameOver');

        // in half a second, show the game over menu
        setTimeout(() => {
            this.showGameOverMenu(stateMachine);
        }, 500);
        
    }

    static onExit(stateMachine) {        
    }
}