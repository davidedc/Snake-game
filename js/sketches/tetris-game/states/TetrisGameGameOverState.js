class TetrisGameGameOverState extends AppState {
    static menu;

    static moveToNextStateToReStartGame(stateMachine) {
        this.menu.dismiss();
        stateMachine.changeState(TetrisGameMainMenuState);
    }

    static showGameOverMenu(stateMachine) {
        //gameOver = true;
      
        this.menu = new Menu();
      
        // Creating and displaying the menu
        this.menu.setTitle('Game Over');
        this.menu.addTitleDividerLine();
        //this.menu.addLine("Score: " + game.score);
        this.menu.addSelectableEntry('Play again', () => {
            this.moveToNextStateToReStartGame(stateMachine); // Adjusted for static context
        });
        this.menu.display();
    }

    static onEnter(stateMachine) {
        
        // the game loop has already been stopped by the time we enter this state

        game.sound.play('gameOver');
        cancelAnimationFrame(rAF);

        // in half a second, show the game over menu
        setTimeout(() => {
            this.showGameOverMenu(stateMachine);
        }, 500);
        
    }

    static onExit(stateMachine) {        
    }
}