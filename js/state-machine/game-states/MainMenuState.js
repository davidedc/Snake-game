class MainMenuState extends GameState {

    static menu;

    static moveToNextStateToStartGame(stateMachine) {
        // Implementation to move to the next state
        stateMachine.changeState(GameOngoingState, this.menu); // Assuming stateMachine is properly defined
    }

    static onEnter(stateMachine) {
        
        this.menu = new Menu();

        // Creating and displaying the menu
        this.menu.setTitle('Snake Game');
        this.menu.addTitleDividerLine();
        this.menu.addBoldHeader('Top Score: 0');
        this.menu.addChoice('Level', ['Easy', 'Medium', 'Hard']);
        this.menu.addBoldHeader('Yi');
        this.menu.addChoice('Level2', ['Easy2', 'Medium2', 'Hard2']);
        this.menu.addSelectableEntry('New Game', () => {
            this.moveToNextStateToStartGame(stateMachine); // Adjusted for static context
        });
        this.menu.display();
        
    }

    static onExit(stateMachine) {
        this.menu.dismiss();
        game.start();        
    }
}

