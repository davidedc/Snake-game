// https://tetris.fandom.com/wiki/Tetris_Guideline

// get a random integer between the range of [min,max]
// @see https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generate a new tetromino sequence
// @see https://tetris.fandom.com/wiki/Random_Generator
function generateSequence() {
  const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

  while (sequence.length) {
    const rand = getRandomInt(0, sequence.length - 1);
    const name = sequence.splice(rand, 1)[0];
    tetrominoSequence.push(name);
  }
}

// get the next tetromino in the sequence
function getNextTetromino() {
  if (tetrominoSequence.length === 0) {
    generateSequence();
  }

  const name = tetrominoSequence.pop();
  const matrix = tetrominos[name];

  // I and O start centered, all others start in left-middle
  const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);

  // I starts on row 21 (-1), all others start on row 22 (-2)
  const row = name === 'I' ? -1 : -2;

  return {
    name: name,      // name of the piece (L, O, etc.)
    matrix: matrix,  // the current rotation matrix
    row: row,        // current row (starts offscreen)
    col: col         // current col
  };
}

// rotate an NxN matrix 90deg
// @see https://codereview.stackexchange.com/a/186834
function rotate(matrix) {
  const N = matrix.length - 1;
  const result = matrix.map((row, i) =>
    row.map((val, j) => matrix[N - j][i])
  );

  return result;
}

// check to see if the new matrix/row/col is valid
function isValidMove(matrix, cellRow, cellCol) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] && (
          // outside the game bounds
          cellCol + col < 0 ||
          cellCol + col >= playfield[0].length ||
          cellRow + row >= playfield.length ||
          // collides with another piece
          playfield[cellRow + row][cellCol + col])
        ) {
        return false;
      }
    }
  }

  return true;
}

// place the tetromino on the playfield
function placeTetromino() {
  for (let row = 0; row < tetromino.matrix.length; row++) {
    for (let col = 0; col < tetromino.matrix[row].length; col++) {
      if (tetromino.matrix[row][col]) {

        // game over if piece has any part offscreen
        if (tetromino.row + row < 0) {
          return gameStateMachine.changeState(DogGameGameOverState);
        }

        soundSystem.play('blockFall');
        playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
      }
    }
  }

  // check for line clears starting from the bottom and working our way up
  for (let row = playfield.length - 1; row >= 0; ) {
    if (playfield[row].every(cell => !!cell)) {

      // drop every row above this one
      for (let r = row; r >= 0; r--) {
        for (let c = 0; c < playfield[r].length; c++) {
          playfield[r][c] = playfield[r-1][c];
        }
      }
    }
    else {
      row--;
    }
  }

  tetromino = getNextTetromino();
}

var canvas, context;

rAF = null;  // keep track of the animation frame so we can cancel it



function resetPlayField() {
    for (let row = -2; row < 20; row++) {
        playfield[row] = [];

        for (let col = 0; col < 10; col++) {
            playfield[row][col] = 0;
        }
    }
    count = 0;
    tetromino = getNextTetromino();
    gameOver = false;
    
}

// game loop
function dogLoop() {
  rAF = requestAnimationFrame(dogLoop);
  context.clearRect(0,0,canvas.width,canvas.height);

  // draw the playfield
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 10; col++) {
      if (playfield[row][col]) {
        const name = playfield[row][col];
        context.fillStyle = colors[name];

        // drawing 1 px smaller than the grid creates a grid effect
        context.fillRect(col * grid, row * grid, grid-1, grid-1);
      }
    }
  }

  // draw the active tetromino
  if (tetromino) {

    // tetromino falls every 35 frames
    if (++count > 35) {
      tetromino.row++;
      count = 0;

      // place piece if it runs into anything
      if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
        tetromino.row--;
        placeTetromino();
      }
    }

    context.fillStyle = colors[tetromino.name];

    for (let row = 0; row < tetromino.matrix.length; row++) {
      for (let col = 0; col < tetromino.matrix[row].length; col++) {
        if (tetromino.matrix[row][col]) {

          // drawing 1 px smaller than the grid creates a grid effect
          context.fillRect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid-1, grid-1);
        }
      }
    }
  }
  // draw the word "dog" in magenta at the top
  context.fillStyle = 'magenta';
  context.font = '36px monospace';
  context.textAlign = 'center';
  context.textBaseline = 'top';
  context.fillText('dog', 115, 0);

}