class GamePausedState extends GameState {

    static menu;

    static moveToNextStateToReStartGame(stateMachine) {
        //console.log("dismissing menu and restarting game...");
        this.menu.dismiss();
        stateMachine.changeState(GameOngoingState);
        game.startGameLoop();
    }

    static onEnter(stateMachine) {
        
        game.pauseGameLoop();

        this.menu = new Menu();

        // Creating and displaying the menu
        this.menu.setTitle('Paused');
        this.menu.addTitleDividerLine();
        this.menu.addSelectableEntry('Continue', () => {
            this.moveToNextStateToReStartGame(stateMachine); // Adjusted for static context
        });
        this.menu.display();
        
    }

    static onExit(stateMachine) {
        

    }
}