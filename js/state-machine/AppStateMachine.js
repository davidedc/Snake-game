class AppStateMachine {
    constructor() {
        this.transitions = {};
        this.currentState = null;
    }

    addTransition(fromStateClass, toStateClass) {
        const fromStateName = fromStateClass.name;
        const toStateName = toStateClass.name;

        if (!this.transitions[fromStateName]) {
            this.transitions[fromStateName] = [];
        }
        this.transitions[fromStateName].push(toStateName);
    }

    changeState(newStateClass, somethingToPassToNewState) {
        const newStateName = newStateClass.name;

        if (this.currentState) {
            if (this.transitions[this.currentState.name]?.includes(newStateName)) {
                this.currentState.onExit(this, somethingToPassToNewState);
                this.currentState = newStateClass;
                this.currentState.onEnter(this, somethingToPassToNewState);
            } else {
                console.log(`Transition from ${this.currentState.name} to ${newStateName} is not allowed.`);
            }
        } else {
            this.currentState = newStateClass;
            this.currentState.onEnter(this, somethingToPassToNewState);
        }
    }
}