class InputHandler {

    hookUpTo(game, thingToHookUpTo) {
        //console.log('hooking up to', thingToHookUpTo);
        document.addEventListener('keydown', e => {
            // if it's not the space
            // console.log(e.key + " " + gameStateMachine.currentState);
            if (e.key !== ' ') {
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
