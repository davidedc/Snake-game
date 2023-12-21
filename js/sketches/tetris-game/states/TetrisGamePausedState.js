class TetrisGamePausedState extends AppState {

    static menu;

    static moveToNextStateToReStartGame(stateMachine) {
        //console.log("dismissing menu and restarting game...");
        game.sound.play('pause');
        this.menu.dismiss();
        stateMachine.changeState(TetrisGamePlayingState);
        //game.startGameLoop();
    }

    static moveToNextStateToResetGame(stateMachine) {
        this.menu.dismiss();
        resetPlayField();
        stateMachine.changeState(TetrisGameMainMenuState);
    }


    static onEnter(stateMachine) {
        
        game.pauseGameLoop();
        game.sound.play('pause');

        this.menu = new Menu();

        // Creating and displaying the menu
        this.menu.setTitle('Paused');
        this.menu.addTitleDividerLine();
        this.menu.addSelectableEntry('New game', () => {
            this.moveToNextStateToResetGame(stateMachine); // Adjusted for static context
        });
        // the "continue" entry is the pre-selected one and only accepts the space key
        // the reason is that when we use controllers, we ony want to unpause when
        // "start" is pressed, not when the user presses one of the Y, K, B, A buttons
        this.menu.addSelectableEntry('Continue', () => {
            this.moveToNextStateToReStartGame(stateMachine); // Adjusted for static context
        }, true);
        this.menu.currentSelection = 1;
        this.menu.display();
        
    }

    static onExit(stateMachine) {
        

    }
}