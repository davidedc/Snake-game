class BreakoutGamePlayingState extends AppState {

    static onEnter(stateMachine) {
        // start the game
        rAF = requestAnimationFrame(breakoutLoop);
        //soundSystem.play???Music();
    }

    static onExit(stateMachine) {
        //soundSystem.stop???Music();
    }
}