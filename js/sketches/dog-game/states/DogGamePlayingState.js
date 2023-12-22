class DogGamePlayingState extends AppState {

    static onEnter(stateMachine) {
        // start the game
        rAF = requestAnimationFrame(dogLoop);
        soundSystem.playTetrisMusic();

    }

    static onExit(stateMachine) {
        soundSystem.stopTetrisMusic();
    }
}