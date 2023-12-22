class InputHandler {
    constructor() {

        // Mapping controller buttons to game actions
        this.controllerMapping = {
            12: 'ArrowUp',    // UP
            13: 'ArrowDown',  // Down
            14: 'ArrowLeft',  // Left
            15: 'ArrowRight', // Right
            // Start button is B9 we are going to map to space
            9: ' ',
            // any of the buttons
            //   Y: B3
            //   K: B2
            //   B: B1
            //   A: B0
            // ... we are going to map to enter
            3: 'Enter',
            2: 'Enter',
            1: 'Enter',
            0: 'Enter',
        };

        this.previousButtonStates = new Array(16).fill(false);

        window.addEventListener("gamepadconnected", e => {
            //console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
            //            e.gamepad.index, e.gamepad.id,
            //            e.gamepad.buttons.length, e.gamepad.axes.length);
            // set the   <div class="debug">Debug: <span>0</span></div>
            // to show the gamepad id
            // document.querySelector('.debug span').textContent = "controller: " + e.gamepad.id;

        });

        window.addEventListener("gamepaddisconnected", e => {
            //console.log("Gamepad disconnected from index %d: %s",
            //            e.gamepad.index, e.gamepad.id);
            this.previousButtonStates.fill(false);
        });

        this.attachInputs();
    }

    dispatchInputEvents(key) {
        // if game is running then we proces the space to pause the game
        // otherwise we let the menu handle the space to select an option
        if (key === ' ' && gameStateMachine.currentState && (gameStateMachine.currentState === SnakeGamePlayingState || gameStateMachine.currentState === TetrisGamePlayingState || gameStateMachine.currentState === DogGamePlayingState) ) {
            if (gameStateMachine.currentState === SnakeGamePlayingState) {
                gameStateMachine.changeState(SnakeGamePausedState);
            }
            else if (gameStateMachine.currentState === TetrisGamePlayingState) {
                gameStateMachine.changeState(TetrisGamePausedState);
            }
            else if (gameStateMachine.currentState === DogGamePlayingState) {
                gameStateMachine.changeState(DogGamePausedState);
            }
        }
        else if (gameStateMachine.currentState && gameStateMachine.currentState.menu) {
            gameStateMachine.currentState.menu.handleArrowKeys(key);
        }
        else if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
            if (!gameStateMachine.currentState || (gameStateMachine.currentState !== SnakeGamePausedState || gameStateMachine.currentState !== TetrisGamePausedState || gameStateMachine.currentState !== DogGamePausedState) ) {
                game.keyDown(key);
            }
        }
    }

    attachInputs() {
        document.addEventListener('keydown', e => {
            this.dispatchInputEvents(e.key);
        });

        // Polling the gamepad state
        const pollGamepad = () => {
            // Use navigator.getGamepads() to get the current state
            const gamepads = navigator.getGamepads();
            if (gamepads[0]) {  // assuming the first gamepad is the one we want to use
                // add to the four arrow buttons pressed value to the debug span
                /*
                document.querySelector('.debug span').textContent = "controller: " + gamepads[0].id + " " +
                    gamepads[0].buttons[12].pressed + " " +
                    gamepads[0].buttons[13].pressed + " " +
                    gamepads[0].buttons[14].pressed + " " +
                    gamepads[0].buttons[15].pressed;
                */
                gamepads[0].buttons.forEach((button, index) => {
                    const isCurrentlyPressed = button.pressed;
                    const wasPreviouslyPressed = this.previousButtonStates[index];

                    // Check if the button was not pressed before and is pressed now
                    if (!wasPreviouslyPressed && isCurrentlyPressed && this.controllerMapping[index]) {
                        let mappedKey = this.controllerMapping[index];
                        this.dispatchInputEvents(mappedKey);
                    }

                    // Update the previous state
                    this.previousButtonStates[index] = isCurrentlyPressed;
                });
            }
            requestAnimationFrame(pollGamepad);
        };
        pollGamepad(); // Start polling

    }
}
