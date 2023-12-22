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
        // set the background color to off-white
        document.body.style.backgroundColor = '#fafafa';

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

        // LOOKS PREPARATION
        // set the background color to black
        document.body.style.backgroundColor = 'black';
        // add a canvas element to the page as if it was
        // <canvas width="320" height="640" id="game"></canvas>
        // document.body.innerHTML = '<canvas width="320" height="640" id="game"></canvas>';
        document.body.innerHTML = '<canvas width="230" height="460" id="game"></canvas>';
        // set the canvas on the page (need to find it in the dom) as if it was css "border: 1px solid white;"
        document.querySelector('canvas').style.border = '1px solid white';

        // these two are globals
        canvas = document.getElementById('game');
        context = canvas.getContext('2d');


        game = {};
        game.pauseGameLoop = function() {
            cancelAnimationFrame(rAF);
        }

        // key can be one of: 'ArrowUp' 'ArrowDown' ArrowLeft' 'ArrowRight'
        game.keyDown = function(key) {
            if (gameOver) return;

            // left and right arrow keys (move)
            if (key === 'ArrowLeft' || key === 'ArrowRight') {
            const col = key === 'ArrowLeft'
                ? tetromino.col - 1
                : tetromino.col + 1;
        
            if (isValidMove(tetromino.matrix, tetromino.row, col)) {
                tetromino.col = col;
            }
            }
        
            // up arrow key (rotate)
            if (key === 'ArrowUp') {
            const matrix = rotate(tetromino.matrix);
            if (isValidMove(matrix, tetromino.row, tetromino.col)) {
                tetromino.matrix = matrix;
            }
            }
        
            // down arrow key (drop)
            if(key === 'ArrowDown') {
            const row = tetromino.row + 1;
        
            if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
                tetromino.row = row - 1;
        
                placeTetromino();
                return;
            }
        
            tetromino.row = row;
            }
        }

        // populate the empty state
        resetPlayField();

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

    static startPlayingTopLevelMenuMusic() {
        soundSystem.playTopLevelMenuMusic();    
    }

    static stopPlayingTopLevelMenuMusic() {
        soundSystem.stopTopLevelMenuMusic();
    }

    static onEnter(stateMachine) {
        //this.stopPlayingTopLevelMenuMusic();
        this.startPlayingTopLevelMenuMusic();
        
        this.menu = new Menu();

        // Creating and displaying the menu
        this.menu.addSelectableVerticalImage("./top-level-menu-images/top-level-image-1.png",'Tetris', () => {
            this.moveToNextStateTetrisGame(stateMachine); // Adjusted for static context
        });
    
        this.menu.addSelectableVerticalImage("./top-level-menu-images/top-level-image-2.png",'Snake', () => {
            this.moveToNextStateSnakeGame(stateMachine); // Adjusted for static context
        });

        this.menu.currentSelection = 1;
        this.menu.display();
        
    }

    static onExit(stateMachine) {
        this.stopPlayingTopLevelMenuMusic();
    }
}