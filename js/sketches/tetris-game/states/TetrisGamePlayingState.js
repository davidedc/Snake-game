class TetrisGamePlayingState extends AppState {

    static onEnter(stateMachine) {
        // start the game
        rAF = requestAnimationFrame(tetrisLoop);
        soundSystem.playTetrisMusic();

    }

    static onExit(stateMachine) {
        soundSystem.stopTetrisMusic();
    }
}