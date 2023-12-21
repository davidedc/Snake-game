class SnakeGameMainMenuState extends AppState {

    static menu;

    static moveToNextStateToStartGame(stateMachine) {
        // Implementation to move to the next state
        stateMachine.changeState(SnakeGamePlayingState, this.menu); // Assuming stateMachine is properly defined
    }

    static onEnter(stateMachine) {
        
        this.menu = new Menu();

        // Creating and displaying the menu
        this.menu.setTitle('Snake Game');
        this.menu.addBoldHeader('Top Score: 0');
        this.menu.addTitleDividerLine();
        this.menu.addChoice('Level', ['Easy', 'Medium', 'Hard']);
        this.menu.addSelectableEntry('Start game', () => {
            this.moveToNextStateToStartGame(stateMachine); // Adjusted for static context
        });
        this.menu.currentSelection = 1;
        this.menu.display();
        
    }

    static onExit(stateMachine) {
        this.menu.dismiss();
        game.start();        
    }
}

