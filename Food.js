class Food {
    constructor() {
        this.position = 0; // Initial position of the food
        this.type = Food.randomFood();
    }

    place(grid) {
        if (grid.emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * grid.emptyCells.length);
            this.position = grid.cells.indexOf(grid.emptyCells[randomIndex]);
            grid.getCell(this.position).putFood();            
        }
    }
    
    static randomFood() {
        const foodItemsArray = ['🐁', '🍇', '🍉', '🍈', '🍓', '🍍', '🍌', '🥝', '🍏', '🍎', '🍔', '🍅', '🥚'];
        return foodItemsArray[Math.floor(Math.random() * foodItemsArray.length)];
    }

}
