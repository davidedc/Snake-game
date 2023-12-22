class TetrisGamePlayingState extends AppState {

    static onEnter(stateMachine) {
        // start the game
        rAF = requestAnimationFrame(loop);
        soundSystem.playMusic(tetrisMusic);

    }

    static onExit(stateMachine) {
        soundSystem.stopMusic();
    }
}