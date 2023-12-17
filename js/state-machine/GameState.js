class GameState {
    static onEnter(stateMachine) {
        console.log(`Entering state: ${this.name}`);
        // Additional code for entering the state
    }

    static onExit(stateMachine) {
        console.log(`Exiting state: ${this.name}`);
        // Additional code for exiting the state
    }
}