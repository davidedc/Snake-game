class TetrisGamePlayingState extends AppState {

    static onEnter(stateMachine) {
        // start the game
        rAF = requestAnimationFrame(loop);
        soundSystem.playTetrisMusic();

    }

    static onExit(stateMachine) {
        soundSystem.stopTetrisMusic();
    }
}