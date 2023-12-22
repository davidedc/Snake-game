class Menu {
    constructor() {
        this.menuElement = document.createElement('div');
        this.menuElement.id = 'settingsMenu';

        // via javascript apply all these style properties:
        // width: 300px;
        // height: auto;
        // border: 2px solid black;
        // display: flex;
        // flex-direction: column;
        // justify-content: center;
        // align-items: center;
        // background-color: white;
   
        this.menuElement.style.width = '300px';
        this.menuElement.style.height = 'auto';
        this.menuElement.style.border = '2px solid black';
        this.menuElement.style.display = 'flex';
        this.menuElement.style.flexDirection = 'column';
        this.menuElement.style.justifyContent = 'center';
        this.menuElement.style.alignItems = 'center';
        this.menuElement.style.backgroundColor = 'white';

        this.selectableItems = [];
        this.currentSelection = 0;

        this.isTopMenu = false;
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

    // used to show a list of images side by side, with a label under each,
    // and allows the user to select one
    // Note that each call to this method only adds one image, and multiple
    // calls just add the images side by side
    addSelectableVerticalImage(imagePath, label, callbacks) {

        this.isTopMenu = true;

        // Adjust CSS properties of the menuElement
        this.menuElement.style.flexDirection = 'row';
        this.menuElement.style.flexWrap = 'wrap';
        this.menuElement.style.border = '0px';


        //document.querySelector('.overlay').style.backgroundColor = 'rgba(255, 255, 255, 1)';


        const entryElement = document.createElement('div');
        entryElement.className = 'menu-item selectable';
        this.selectableItems.push(entryElement);
        this.menuElement.appendChild(entryElement);
        entryElement.callback = callbacks; // Add a callback property to the element
        entryElement.imagePath = imagePath;
        entryElement.label = label;
        entryElement.innerHTML = `<img src="${imagePath}" alt="${label}"><br>${label}`;
    }
    

    addLine(line) {
        const headerElement = document.createElement('div');
        headerElement.className = 'menu-item';
        headerElement.textContent = line;
        this.menuElement.appendChild(headerElement);
    }

    addChoice(label, options, callback) {
        const choiceElement = document.createElement('div');
        this.selectableItems.push(choiceElement);
        this.menuElement.appendChild(choiceElement);
        choiceElement.className = 'menu-item selectable';
        choiceElement.label = label;
        choiceElement.options = options;
        choiceElement.callback = callback;
        choiceElement.optionIndex = 0;
        // call the callback with the initial value
        choiceElement.callback(options[choiceElement.optionIndex]);
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
        var overlayDiv = document.body.appendChild(document.createElement('div'));
        overlayDiv.className = 'overlay';

        // append to the overlay instead of the body
        overlayDiv.appendChild(this.menuElement);

        this.updateSelection(0);
    }

    dismiss() {
        document.body.removeChild(document.querySelector('.overlay'));
    }

    updateSelection(direction) {
        // play "click" sound
        soundSystem.play('click');

        const itemCount = this.selectableItems.length;
        this.currentSelection = (this.currentSelection + direction + itemCount) % itemCount;

        this.selectableItems.forEach((item, index) => {
            const isSelected = index === this.currentSelection;
            item.classList.toggle('selected', isSelected);

            if (this.isTopMenu) {
                document.querySelector('.overlay').style.backgroundColor = 'rgba(255, 255, 255, 1)';
                // change the style of all the elements of the class .selected
                //   background-color: pink;
                // and the non-selected elements
                //   background-color: white;
                // via javascript
                item.style.backgroundColor = isSelected ? 'pink' : 'white';
            }
    
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
                if (this.isTopMenu) {
                    this.updateSelection(1);
                }
                else {
                    this.cycleChoice(1);
                }
                break;
            case 'ArrowRight':
                if (this.isTopMenu) {
                    this.updateSelection(1);
                }
                else {
                    this.cycleChoice(1);
                }
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

            if (choiceElement.textContent) {
              choiceElement.textContent = `< ${choiceElement.label}: ${choiceElement.options[choiceElement.optionIndex]} >`;
            }

            soundSystem.play('click');
            // call the callback with the new value
            choiceElement.callback(choiceElement.options[choiceElement.optionIndex]);
        }

    }
}