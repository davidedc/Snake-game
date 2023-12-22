class DogGamePlayingState extends AppState {

    static onEnter(stateMachine) {
        // start the game
        rAF = requestAnimationFrame(dogLoop);
        soundSystem.playDogMusic();

    }

    static onExit(stateMachine) {
        soundSystem.stopDogMusic();
    }
}