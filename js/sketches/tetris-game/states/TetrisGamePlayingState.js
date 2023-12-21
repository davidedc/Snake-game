class TetrisGamePlayingState extends AppState {

    static onEnter(stateMachine) {
        // start the game
        rAF = requestAnimationFrame(loop);
    }

    static onExit(stateMachine) {
    }
}