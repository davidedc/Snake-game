class GamePausedState extends GameState {

    static menu;

    static moveToNextStateToReStartGame(stateMachine) {
        //console.log("dismissing menu and restarting game...");
        game.sound.play('pause');
        this.menu.dismiss();
        stateMachine.changeState(GameOngoingState);
        game.startGameLoop();
    }

    static moveToNextStateToResetGame(stateMachine) {
        this.menu.dismiss();
        stateMachine.changeState(MainMenuState);
    }


    static onEnter(stateMachine) {
        
        game.pauseGameLoop();
        game.sound.play('pause');

        this.menu = new Menu();

        // Creating and displaying the menu
        this.menu.setTitle('Paused');
        this.menu.addTitleDividerLine();
        this.menu.addSelectableEntry('Quit game', () => {
            this.moveToNextStateToResetGame(stateMachine); // Adjusted for static context
        });
        this.menu.addSelectableEntry('Continue', () => {
            this.moveToNextStateToReStartGame(stateMachine); // Adjusted for static context
        });
        this.menu.currentSelection = 1;
        this.menu.display();
        
    }

    static onExit(stateMachine) {
        

    }
}