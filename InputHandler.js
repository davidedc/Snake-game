class InputHandler {

    hookUpTo(thingToHookUpTo) {
        document.addEventListener('keydown', e => {
            thingToHookUpTo.changeDirection(e.key);
        });
    }
    
    unhook() {
        document.removeEventListener('keydown', this.handleArrowKeys.bind(this));
    }
}
