/*
// attach a span at the top of the page to show debug info
const debugSpan = document.createElement('span');
debugSpan.style.position = 'absolute';
debugSpan.style.top = '0';
debugSpan.style.left = '0';
debugSpan.style.color = 'white';
debugSpan.style.backgroundColor = 'black';
debugSpan.style.padding = '5px';
debugSpan.style.fontFamily = 'monospace';
debugSpan.style.fontSize = '12px';
debugSpan.style.zIndex = '1000';
debugSpan.textContent = 'debug info';
document.body.appendChild(debugSpan);
*/



var canvas, context;
rAF = null;  // keep track of the animation frame so we can cancel it

let OTTO_X = 200;
let OTTO_Y = 200;
let BLINK_COUNTER = 0;
let GNASH_COUNTER = 0;
let COUNTER = 0;
let OTTO_MENTAL_STATE = 0;

var bonePosX = 50;
var bonePosY = 50;


// game loop
function dogLoop() {
  rAF = requestAnimationFrame(dogLoop);
  context.clearRect(0,0,canvas.width,canvas.height);

  // paint the background white
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // if any of the inputHandler analog gamestick axes data
  // ...is null, then generate a synthetic movement 
  if (inputHandler.analogStickLeftY === null || inputHandler.analogStickRightX === null ) {
    // output to debug span that we don't have analog gamestick axes data
    //debugSpan.textContent = 'no analog gamestick axes data';

    // make bonePosX and bonePosY move smoothly across the canvas extent using sin/cos
    // a la lissajous curve
    bonePosX = 100 + 100 * Math.cos(COUNTER * 0.03);
    bonePosY = 100 + 100 * Math.sin(COUNTER * 0.03);
  }
  // otherwise, use the analog gamestick axes data to move the bone across the whole canvas height and width
  // by mapping the analogStickLeftY to the canvas height
  // and the analogStickRightX to the canvas width
  else {
    // map analogStickLeftY from [-1, 1] to [0, canvas.height] 
    bonePosY = (inputHandler.analogStickLeftY + 1) * canvas.height / 2;
    // map analogStickRightX from [-1, 1] to [0, canvas.width]
    bonePosX = (inputHandler.analogStickRightX + 1) * canvas.width / 2;
  }

  // draw a bone emoji as text at the dog's position
  context.fillStyle = '#000000';
  context.font = '36px serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('🦴', bonePosX, bonePosY);


  let ottoMove = computeOttoPos(OTTO_X, OTTO_Y, bonePosX, bonePosY, OTTO_MENTAL_STATE);

  OTTO_X = ottoMove[0] + (1 - (2 * noise(COUNTER * 0.1))) * (0.5 * OTTO_MENTAL_STATE);
  OTTO_Y = ottoMove[1] + (1 - (2 * noise(COUNTER))) * (5 * OTTO_MENTAL_STATE);
  OTTO_MENTAL_STATE = computeMentalState(OTTO_X, OTTO_Y);

  drawOttoBody(OTTO_X, OTTO_Y);
  drawOttoEyes(OTTO_X, OTTO_Y, OTTO_MENTAL_STATE, BLINK_COUNTER);

  if (OTTO_MENTAL_STATE === 2) {
      drawOttoMouth(OTTO_X, OTTO_Y, GNASH_COUNTER);
  }

  if (BLINK_COUNTER < 0) {
      BLINK_COUNTER = Math.floor(Math.random() * 50) + 100;
  }

  if (GNASH_COUNTER > 90) {
      GNASH_COUNTER = 0;
  }

  BLINK_COUNTER -= 1;
  GNASH_COUNTER += 20;
  COUNTER += 1;

}

function computeOttoPos(OTTO_X, OTTO_Y, bonePosX, bonePosY, mentalState) {
  let moveOTTO = [OTTO_X, OTTO_Y];


  // mag - distance between OTTO and bone
  let diffX = bonePosX - OTTO_X;
  let diffY = bonePosY - OTTO_Y;
  let mag = Math.sqrt(diffX * diffX + diffY * diffY);

  // move OTTO towards bone with a speed proportional to the mental state
  // (which can be 0, 1, or 2)

  let speed = mag * 0.02 * (mentalState + 1); // Adjust speed based on mental state
  moveOTTO[0] += (diffX / mag) * speed; // Move OTTO in X direction
  moveOTTO[1] += (diffY / mag) * speed; // Move OTTO in Y direction

  return moveOTTO;
}

function drawOttoBody(OTTO_X, OTTO_Y) {
  context.fillStyle = '#000000';

  context.beginPath();
  context.ellipse(OTTO_X, OTTO_Y - 20, 40, 40, 0, 0, 2 * Math.PI);
  context.fill();

  context.beginPath();
  context.ellipse(OTTO_X, OTTO_Y - 60, 25, 15, 0, 0, 2 * Math.PI);
  context.fill();

  context.beginPath();
  context.moveTo(OTTO_X - 38.5, OTTO_Y - 30);
  context.lineTo(OTTO_X - 15, OTTO_Y - 95);
  context.lineTo(OTTO_X + 15, OTTO_Y - 20);
  context.fill();

  context.beginPath();
  context.moveTo(OTTO_X + 38.5, OTTO_Y - 30);
  context.lineTo(OTTO_X + 15, OTTO_Y - 95);
  context.lineTo(OTTO_X - 15, OTTO_Y - 20);
  context.fill();
}

function drawOttoEyes(OTTO_X, OTTO_Y, OTTO_MENTAL_STATE, BLINK_COUNTER) {
  if (BLINK_COUNTER > 10) {
      context.fillStyle = '#FFFFFF';

      let LeyeX = OTTO_X - 10;
      let eyeY = OTTO_Y - 50;
      let ReyeX = OTTO_X + 10;

      context.beginPath();
      context.ellipse(LeyeX, eyeY, 7.5, 7.5, 0, 0, 2 * Math.PI);
      context.fill();

      context.beginPath();
      context.ellipse(ReyeX, eyeY, 7.5, 7.5, 0, 0, 2 * Math.PI);
      context.fill();

      let LPupilOffsetX = bonePosX - LeyeX;
      let RPupilOffsetX = bonePosX - ReyeX;
      let RPupilOffsetY = bonePosY - eyeY;
      let LPupilOffsetY = bonePosY - eyeY;

      let magLeft = Math.sqrt(LPupilOffsetX * LPupilOffsetX + LPupilOffsetY * LPupilOffsetY);
      let magRight = Math.sqrt(RPupilOffsetX * RPupilOffsetX + RPupilOffsetY * RPupilOffsetY);

      if (magLeft > 0) {
          LPupilOffsetX /= magLeft;
          LPupilOffsetY /= magLeft;
      }

      if (magRight > 0) {
          RPupilOffsetX /= magRight;
          RPupilOffsetY /= magRight;
      }

      LPupilOffsetX *= 5;
      LPupilOffsetY *= 5;
      RPupilOffsetX *= 5;
      RPupilOffsetY *= 5;

      if (OTTO_MENTAL_STATE > 0) {
          if (LPupilOffsetY < -1) {
              LPupilOffsetY = -1;
          }
          if (RPupilOffsetY < -1) {
              RPupilOffsetY = -1;
          }
      }

      context.fillStyle = '#000000';

      context.beginPath();
      context.ellipse(LeyeX + LPupilOffsetX, eyeY + LPupilOffsetY, 2, 2, 0, 0, 2 * Math.PI);
      context.fill();

      context.beginPath();
      context.ellipse(ReyeX + RPupilOffsetX, eyeY + RPupilOffsetY, 2, 2, 0, 0, 2 * Math.PI);
      context.fill();

      if (OTTO_MENTAL_STATE > 0) {
          context.fillStyle = '#000000';
          context.beginPath();
          context.moveTo(LeyeX - 12, eyeY - 5);
          context.lineTo(LeyeX + 12, eyeY);
          context.lineTo(LeyeX + 12, eyeY - 10);
          context.lineTo(LeyeX - 12, eyeY - 15);
          context.fill();

          context.beginPath();
          context.moveTo(ReyeX + 12, eyeY - 5);
          context.lineTo(ReyeX - 12, eyeY);
          context.lineTo(ReyeX - 12, eyeY - 10);
          context.lineTo(ReyeX + 12, eyeY - 15);
          context.fill();
      }
  }
}


function drawOttoMouth(OTTO_X, OTTO_Y, GNASH_COUNTER) {
  // console.log('drawOttoMouth');
  let gnashAmount = radians(GNASH_COUNTER);

  let topRowY = OTTO_Y - 20 + Math.cos(gnashAmount) * 15 + 5;
  let bottomRowY = OTTO_Y - 20 - Math.cos(gnashAmount) * 15 - 5;

  context.fillStyle = '#FFFFFF';
  context.beginPath();
  context.moveTo(OTTO_X - 30, bottomRowY);
  context.lineTo(OTTO_X + 30, bottomRowY);
  context.lineTo(OTTO_X + 25, topRowY);
  context.lineTo(OTTO_X - 25, topRowY);
  context.closePath();
  context.fill();

  drawTeeth(OTTO_X, topRowY, bottomRowY, true); // top teeth
  drawTeeth(OTTO_X, topRowY, bottomRowY, false); // bottom teeth
}

function drawTeeth(OTTO_X, topRowY, bottomRowY, isTop) {
  let teethSpacing = 10;
  let teethWidth = 5;
  let teethHeight = 10;
  let startX = OTTO_X - 30 + teethSpacing;

  context.fillStyle = '#FFFFFF';
  for (let i = 0; i < 6; i++) {
      if (isTop) {
          context.beginPath();
          context.moveTo(startX, bottomRowY);
          context.lineTo(startX + teethWidth, bottomRowY + teethHeight);
          context.lineTo(startX + teethWidth * 2, bottomRowY);
          context.fill();
      } else {
          context.beginPath();
          context.moveTo(startX, topRowY);
          context.lineTo(startX + teethWidth, topRowY - teethHeight);
          context.lineTo(startX + teethWidth * 2, topRowY);
          context.fill();
      }
      startX += teethWidth * 2 + teethSpacing;
  }
}

function radians(degrees) {
  return degrees * (Math.PI / 180);
}

function noise(x) {
  // Parameters to control the smoothness and randomness
  let frequency = 5.0;
  let amplitude = 0.5;
  let phaseShift = Math.random() * Math.PI * 2;

  // Generating a smooth noise value using sine and cosine functions
  return amplitude * (Math.sin(x / frequency + phaseShift) + Math.cos(x / frequency + phaseShift)) / 2;
}

function computeMentalState(OTTO_X, OTTO_Y) {
  let mentalStateOut = 0;


  let diffX = bonePosX - OTTO_X;
  let diffY = bonePosY - OTTO_Y;

  let magnitude = Math.sqrt(diffX * diffX + diffY * diffY);
  
  // print out nicely in the console all the involved coordinates
  // and the magnitude
  // console.log('computeMentalState: magnitude:' + magnitude + 'bonePosX: ' + bonePosX + ' bonePosY: ' + bonePosY + ' OTTO_X: ' + OTTO_X + ' OTTO_Y: ' + OTTO_Y);

  if (magnitude < 150) {
      mentalStateOut = 1;
  }
  if (magnitude < 70) {
      mentalStateOut = 2;
  }

  //console.log('computeMentalState: ' + mentalStateOut);
  return mentalStateOut;
}

