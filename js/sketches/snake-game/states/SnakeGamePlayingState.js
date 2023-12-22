class SnakeGamePlayingState extends AppState {

    static onEnter(stateMachine) {
        soundSystem.playMusic(snakeMusic);
    }

    static onExit(stateMachine) {
        soundSystem.stopMusic();
    }
}