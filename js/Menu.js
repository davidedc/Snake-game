class Menu {
    constructor() {
        this.menuElement = document.createElement('div');
        this.menuElement.id = 'settingsMenu';
        this.selectableItems = [];
        this.currentSelection = 0;
    }

    setTitle(title) {
        const titleElement = document.createElement('div');
        titleElement.className = 'menu-item bold';
        titleElement.textContent = title;
        this.menuElement.appendChild(titleElement);
    }

    addBoldHeader(header) {
        const headerElement = document.createElement('div');
        headerElement.className = 'menu-item bold';
        headerElement.textContent = header;
        this.menuElement.appendChild(headerElement);
    }

    addLine(line) {
        const headerElement = document.createElement('div');
        headerElement.className = 'menu-item';
        headerElement.textContent = line;
        this.menuElement.appendChild(headerElement);
    }

    addChoice(label, options) {
        const choiceElement = document.createElement('div');
        this.selectableItems.push(choiceElement);
        this.menuElement.appendChild(choiceElement);
        choiceElement.className = 'menu-item selectable';
        choiceElement.label = label;
        choiceElement.options = options;

        choiceElement.optionIndex = 0;
        choiceElement.textContent = `< ${choiceElement.label}: ${options[choiceElement.optionIndex]} >`;
    }

    addSelectableEntry(label, callback, onlyAcceptSpace = false) {
        const entryElement = document.createElement('div');
        entryElement.className = 'menu-item selectable';
        entryElement.textContent = label;
        this.selectableItems.push(entryElement);
        this.menuElement.appendChild(entryElement);
        entryElement.onlyAcceptSpace = onlyAcceptSpace;
        entryElement.callback = callback; // Add a callback property to the element
    }

    addTitleDividerLine() {
        const titleDividerElement = document.createElement('div');
        titleDividerElement.className = 'menu-title-divider';
        this.menuElement.appendChild(titleDividerElement);
    }

    display() {
        // append to the body a div with class overlay
        document.body.appendChild(document.createElement('div')).className = 'overlay';

        // append to the overlay instead of the body
        document.querySelector('.overlay').appendChild(this.menuElement);
        this.updateSelection(0);
    }

    dismiss() {
        document.body.removeChild(document.querySelector('.overlay'));
    }

    updateSelection(direction) {
        const itemCount = this.selectableItems.length;
        this.currentSelection = (this.currentSelection + direction + itemCount) % itemCount;

        this.selectableItems.forEach((item, index) => {
            const isSelected = index === this.currentSelection;
            item.classList.toggle('selected', isSelected);

            /*
            // if the item has options, and it's selected, add the beginning and ending arrows
            // otherwhise, remove them
            if (item.options && !isSelected) {
                item.textContent = item.textContent.replace('< ', '').replace(' >', '');
            } else if (item.options && isSelected) {
                item.textContent = '< ' + item.textContent + ' >';
            }
            */

        });
    }

    getSelectedItem() {
        return this.selectableItems[this.currentSelection];
    }

    handleArrowKeys(key) {
        //console.log("A menu handling the arrow keys");
        switch (key) {
            case 'ArrowUp':
                this.updateSelection(-1);
                break;
            case 'ArrowDown':
                this.updateSelection(+1);
                break;
            case 'ArrowLeft':
                this.cycleChoice(-1);
                break;
            case 'ArrowRight':
                this.cycleChoice(1);
                break;
            // enter OR space
            case 'Enter':
                if (this.getSelectedItem().onlyAcceptSpace) {
                    return;
                }
            case ' ':
                if (this.getSelectedItem().callback) {
                    this.getSelectedItem().callback();
                }
                break;
        }
    }

    cycleChoice(direction) {
        var choiceElement = this.getSelectedItem()
        if (choiceElement.options) {
            choiceElement.optionIndex = (choiceElement.optionIndex + direction + choiceElement.options.length) % choiceElement.options.length;
            choiceElement.textContent = `< ${choiceElement.label}: ${choiceElement.options[choiceElement.optionIndex]} >`;
        }

    }
}