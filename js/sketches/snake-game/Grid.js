class Grid {
    constructor(width, height, cellSize) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.cells = [];
        this.emptyCells = [];
        this.initialize();
    }

    initialize() {
        const gridElement = document.querySelector('.grid');

        // clear up the grid
        gridElement.innerHTML = '';

        // set the grid size
        gridElement.style.width = `${this.width * this.cellSize}px`;
        gridElement.style.height = `${this.height * this.cellSize}px`;

        for (let i = 0; i < this.width * this.height; i++) {
            const cell = document.createElement('div');
            cell.style.width = `${this.cellSize}px`;
            cell.style.height = `${this.cellSize}px`;
            gridElement.appendChild(cell);
            this.cells.push(new Cell(this, cell, i % this.width, Math.floor(i/this.width)));
        }
        // emptyCells array is at this moment just a copy of cells array
        this.emptyCells = this.cells.slice();
    }

    getCell(index) {
        if (index >= 0 && index < this.cells.length) {
            return this.cells[index];
        }
        return null;
    }

    shake() {
        const gridElement = document.querySelector('.grid'); // Assuming this is your grid's DOM element
        gridElement.classList.add('shake');

        // Remove the class after the animation completes
        setTimeout(() => {
            gridElement.classList.remove('shake');
        }, 500); // Adjust time to match your CSS animation duration
    }

}
