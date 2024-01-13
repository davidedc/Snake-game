const level1 = [
  [],
  [],
  [],
  [],
  [],
  [],
  ['R','R','R','R','R','R','R','R','R','R','R','R','R','R'],
  ['R','R','R','R','R','R','R','R','R','R','R','R','R','R'],
  ['O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
  ['O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
  ['G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
  ['G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
  ['Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y'],
  ['Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y']
];

// create a mapping between color short code (R, O, G, Y) and color name
const colorMap = {
  'R': 'red',
  'O': 'orange',
  'G': 'green',
  'Y': 'yellow'
};

// use a 2px gap between each brick
const brickGap = 2;
const brickWidth = 25;
const brickHeight = 12;

// the wall width takes up the remaining space of the canvas width. with 14 bricks
// and 13 2px gaps between them, thats: 400 - (14 * 25 + 2 * 13) = 24px. so each
// wall will be 12px
const wallSize = 12;
var bricks;

function resetBreakout () {
  bricks = [];

  // create the level by looping over each row and column in the level1 array
  // and creating an object with the bricks position (x, y) and color
  for (let row = 0; row < level1.length; row++) {
    for (let col = 0; col < level1[row].length; col++) {
      const colorCode = level1[row][col];

      bricks.push({
        x: wallSize + (brickWidth + brickGap) * col,
        y: wallSize + (brickHeight + brickGap) * row,
        color: colorMap[colorCode],
        width: brickWidth,
        height: brickHeight
      });
    }
  }
  resetBreakoutBall();
}

var paddle;

const ball = {
  x: 130,
  y: 260,
  width: 5,
  height: 5,

  // how fast the ball should go in either the x or y direction
  speed: 3,

  // ball velocity
  dx: 0,
  dy: 0
};

// check for collision between two objects using axis-aligned bounding box (AABB)
// @see https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function collides(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}

// game loop
function breakoutLoop() {
  rAF = requestAnimationFrame(breakoutLoop);
  context.clearRect(0,0,canvas.width,canvas.height);

  // move paddle by it's velocity
  paddle.x += paddle.dx;

  // prevent paddle from going through walls
  if (paddle.x < wallSize) {
    paddle.x = wallSize
  }
  else if (paddle.x + brickWidth > canvas.width - wallSize) {
    paddle.x = canvas.width - wallSize - brickWidth;
  }

  // move ball by it's velocity
  ball.x += ball.dx;
  ball.y += ball.dy;

  // prevent ball from going through walls by changing its velocity
  // left & right walls
  if (ball.x < wallSize) {
    ball.x = wallSize;
    ball.dx *= -1;
    soundSystem.play('ballWall');
  }
  else if (ball.x + ball.width > canvas.width - wallSize) {
    ball.x = canvas.width - wallSize - ball.width;
    ball.dx *= -1;
    soundSystem.play('ballWall');
  }
  // top wall
  if (ball.y < wallSize) {
    ball.y = wallSize;
    ball.dy *= -1;
    soundSystem.play('ballWall');
  }

  // reset ball if it goes below the screen
  if (ball.y > canvas.height) {
    resetBreakoutBall();
    soundSystem.play('gameOver');
  }

  // check to see if ball collides with paddle. if they do change y velocity
  if (collides(ball, paddle)) {


    const ballPos = ball.x - paddle.x;
    // console.log(ballPos);
    // make ball.dx to be an interpolation depending
    // on where the ball hits the paddle
    ball.dx = 4 * ((ballPos - paddle.width / 2) / paddle.width);

    // adjust the vertical velocity based on horizontal velocity
    // so the ball always moves at a constant speed
    ball.dy = -Math.sqrt(3*3 - ball.dx * ball.dx);

    // move ball above the paddle otherwise the collision will happen again
    // in the next frame
    ball.y = paddle.y - ball.height - 1;

    soundSystem.play('ballPaddle');
  }

  // check to see if ball collides with a brick. if it does, remove the brick
  // and change the ball velocity based on the side the brick was hit on
  for (let i = 0; i < bricks.length; i++) {
    const brick = bricks[i];

    if (collides(ball, brick)) {
      soundSystem.play('ballBrick');
      // remove brick from the bricks array
      bricks.splice(i, 1);

      // ball is above or below the brick, change y velocity
      // account for the balls speed since it will be inside the brick when it
      // collides
      if (ball.y + ball.height - ball.speed <= brick.y ||
          ball.y >= brick.y + brick.height - ball.speed) {
        ball.dy *= -1;
      }
      // ball is on either side of the brick, change x velocity
      else {
        ball.dx *= -1;
      }

      break;
    }
  }

  // draw walls /////////

  // draw the bottom wall in a faint color so it looks like it's in the background
  context.fillStyle = 'rgba(200, 200, 200, 0.2)';
  context.fillRect(0, canvas.height - wallSize, canvas.width, wallSize);

  context.fillStyle = 'lightgrey';
  context.fillRect(0, 0, canvas.width, wallSize);
  context.fillRect(0, 0, wallSize, canvas.height);
  context.fillRect(canvas.width - wallSize, 0, wallSize, canvas.height);


  // draw ball if it's moving
  if (ball.dx || ball.dy) {
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
  }

  // draw bricks
  bricks.forEach(function(brick) {
    context.fillStyle = brick.color;
    context.fillRect(brick.x, brick.y, brick.width, brick.height);
  });

  // draw paddle
  context.fillStyle = 'cyan';
  context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  // if the ball is still, draw "press button to launch ball"
  if (!ball.dx && !ball.dy) {
    context.textAlign = 'center';
    context.font = '16px Courier New';
    context.fillText('Press a button to launch', canvas.width / 2, canvas.height / 2);
  }

}

function resetBreakoutBall() {
  ball.x = 130;
  ball.y = 260;
  ball.dx = 0;
  ball.dy = 0;
}
