class TopLevelMenuState extends AppState {

    static menu;

    static moveToNextStateSnakeGame(stateMachine) {

        this.menu.dismiss();

        // start populating the body with what we need for the snake game
        document.body.innerHTML = `
    <div class="debug">
      <span></span>
    </div>
    <div class="score">Score: <span>0</span></div>
    <div class="grid"></div>
  `;

        // Define the dimensions and cell size for the grid
        const gridWidth = 25;
        const gridHeight = 20;
        const cellSize = 20;
        const initialInterval = 200;

        // Create the SnakeGame instance
        game = new SnakeGame(gridWidth, gridHeight, cellSize, initialInterval);


        stateMachine.changeState(SnakeGameMainMenuState, this.menu); // Assuming stateMachine is properly defined
    }

    static moveToNextStateTetrisGame(stateMachine) {
        stateMachine.changeState(TetrisGameMainMenuState, this.menu); // Assuming stateMachine is properly defined
    }

    static setLevel(levelAsString) {
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
    }

    static onEnter(stateMachine) {
        
        this.menu = new Menu();

        // Creating and displaying the menu
        this.menu.setTitle('Choose a game');
        this.menu.addTitleDividerLine();

        this.menu.addSelectableEntry('Tetris', () => {
            this.moveToNextStateTetrisGame(stateMachine); // Adjusted for static context
        });

        this.menu.addSelectableEntry('Snake', () => {
            this.moveToNextStateSnakeGame(stateMachine); // Adjusted for static context
        });

        this.menu.currentSelection = 1;
        this.menu.display();
        
    }

    static onExit(stateMachine) {
    }
}