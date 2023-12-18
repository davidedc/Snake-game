class InputHandler {

    hookUpTo(game, thingToHookUpTo) {
        //console.log('hooking up to', thingToHookUpTo);
        document.addEventListener('keydown', e => {
            // console.log(e.key + " " + gameStateMachine.currentState);
            // if it's an arrow key
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                // if the game state is not paused
                if (gameStateMachine.currentState !== GamePausedState) {
                    thingToHookUpTo.keyDown(e.key);
                }
            }
            // if it is the space
            else if (e.key === ' ') {
                if (gameStateMachine.currentState !== GamePausedState) {
                    gameStateMachine.changeState(GamePausedState);
                }
            }
        });
    }
    
}
