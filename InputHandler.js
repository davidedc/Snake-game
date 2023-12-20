class InputHandler {
    constructor() {
        this.gamepad = null;

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

        window.addEventListener("gamepadconnected", e => {
            console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
                        e.gamepad.index, e.gamepad.id,
                        e.gamepad.buttons.length, e.gamepad.axes.length);
            this.gamepad = e.gamepad;
        });

        window.addEventListener("gamepaddisconnected", e => {
            console.log("Gamepad disconnected from index %d: %s",
                        e.gamepad.index, e.gamepad.id);
            this.gamepad = null;
        });

        this.attachInputs();
    }

    dispatchInputEvents(key) {
        // if game is running then we proces the space to pause the game
        // otherwise we let the menu handle the space to select an option
        if (key === ' ' && gameStateMachine.currentState === GameOngoingState) {
            gameStateMachine.changeState(GamePausedState);
        }
        else if (gameStateMachine.currentState.menu) {
            gameStateMachine.currentState.menu.handleArrowKeys(key);
        }
        else if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
            if (gameStateMachine.currentState !== GamePausedState) {
                game.snake.keyDown(key);
            }
        }
    }

    attachInputs() {
        document.addEventListener('keydown', e => {
            this.dispatchInputEvents(e.key);
        });

        // Polling the gamepad state
        const pollGamepad = () => {
            if (this.gamepad) {
                this.gamepad.buttons.forEach((button, index) => {
                    if (button.pressed && this.controllerMapping[index]) {
                        let mappedKey = this.controllerMapping[index];
                        this.dispatchInputEvents(mappedKey);
                    }
                });
            }
            requestAnimationFrame(pollGamepad);
        };

        pollGamepad(); // Start polling
    }
}
