class SnakeGamePlayingState extends AppState {

    static onEnter(stateMachine) {
        soundSystem.playSnakeMusic();
    }

    static onExit(stateMachine) {
        soundSystem.stopSnakeMusic();
    }
}