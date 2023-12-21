class TetrisGameMainMenuState extends AppState {

    static menu;

    static moveToNextStateToStartGame(stateMachine) {
        // Implementation to move to the next state
        resetPlayField();
        stateMachine.changeState(TetrisGamePlayingState, this.menu); // Assuming stateMachine is properly defined
    }

    static setLevel(levelAsString) {
        /*
        switch(levelAsString) {
            case 'Easy':
                game.setIntervalTime(200);
                break;
            case 'Medium':
                game.setIntervalTime(100);
                break;
            case 'Hard':
                game.setIntervalTime(50);
                break;
        }
        */
    }

    static onEnter(stateMachine) {
        

        this.menu = new Menu();

        // Creating and displaying the menu
        this.menu.setTitle('Snake Game');
        this.menu.addBoldHeader('Top Score: 0');
        this.menu.addTitleDividerLine();
        // third parameter is a callback function that is called when the entry is selected
        this.menu.addChoice('Level', ['Easy', 'Medium', 'Hard'], (levelAsString) => { this.setLevel(levelAsString); });
        this.menu.addSelectableEntry('Start game', () => {
            this.moveToNextStateToStartGame(stateMachine); // Adjusted for static context
        });
        this.menu.currentSelection = 1;
        this.menu.display();
        
    }

    static onExit(stateMachine) {
        this.menu.dismiss();
        //game.start();        
    }
}

