function init() {

    //! VARIABLES & ELEMENTS
    
    //? ELEMENTS
    //CREATE GRID
    const grid = document.querySelector('.grid')
    
    
    //? VARIABLES
    //BOARD CONFIG
    const width = 10
    const height = 10
    const cellCount = width*height
    let cells = [] 
    
    //CHARACTER CONFIG
    const startingPosition = 94
    let currentPosition = startingPosition
    let gameStarted = false;

    //! FUNCTIONS

    //? CREATE GRID CELLS
    function createGrid(){
        //use cell count to create our grid cells
        for (let i = 0; i < cellCount; i++) {
            const cell = document.createElement('div')
            cell.dataset.index = i 
            cell.style.height = `${100 / height}`
            cell.style.width = `${100 / width}`
           //add cell to grid
            grid.appendChild(cell)
            //add new cell to cells array
            cells.push(cell)
            }
            addFrog(startingPosition)
            addCar ()
    }
    
    //? Add frog to the board - start
    function addFrog(position){
        cells[position].classList.add('frog')
    }

    function startGame() {
        if (!gameStarted) {
            gameStarted = true;
            console.log('Game started!');
        }
    }

    function moveCars() {
        const carElements = document.querySelectorAll('.car');
        carElements.forEach(car => {
            let carPosition = cells.indexOf(car); // Get the current position of the car
            // Remove car class from current position
            cells[carPosition].classList.remove('car');
            // Move the car to the next position towards the right within the specified range
            carPosition = (carPosition + 1) % cellCount;
            // Ensure cars move within cells 10 to 89
            if (carPosition < 10 || carPosition > 89) {
                // If the new car position is outside the specified range, adjust it
                carPosition = carPosition < 10 ? 89 : 10;
            }
            // Collision detection with the frog
            if (carPosition === currentPosition) {
                alert('Game Over! Frog collided with a car');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                return;
            }
            // Add car class to the new position
            cells[carPosition].classList.add('car');
        });
    }

    function addCar() {
        const numberOfCars = 20;
        const carPositions = [];
        for (let i = 0; i < numberOfCars; i++) {
            let generateCarPosition;
            do {
                generateCarPosition = Math.floor(Math.random() * cells.length);
            } while (generateCarPosition === currentPosition || carPositions.includes(generateCarPosition));
            carPositions.push(generateCarPosition);
            cells[generateCarPosition].classList.add("car");
        }
        setInterval(moveCars, 1000);
    }

    //? REMOVE FROG CLASS
    function removeFrog(position){
        cells[currentPosition].classList.remove('frog')
    }
    
    function handleMovement(event) {
        const key = event.keyCode;
        const up = 38;
        const down = 40;
        const left = 37;
        const right = 39;
    
        removeFrog(currentPosition); // Remove the frog before updating its position
    
        if (!gameStarted) {
            startGame(); // Call startGame on the first movement
        }
        let moveSuccessful = false;
    
        // Check which key was pressed and update currentPosition accordingly
        if (key === up && currentPosition >= width) {
            currentPosition -= width;
            moveSuccessful = true;
        } else if (key === down && currentPosition + width <= cellCount - 1) {
            currentPosition += width;
            moveSuccessful = true;
        } else if (key === right && currentPosition % width !== width - 1) {
            currentPosition += 1;
            moveSuccessful = true;
        } else if (key === left && currentPosition % width !== 0) {
            currentPosition -= 1;
            moveSuccessful = true;
        } else {
            console.log('invalid key');
        }
        // Update frog position after a successful move
        if (moveSuccessful) {
            const nextCell = cells[currentPosition];
    
            if (nextCell.classList.contains('car')) {
                alert('Game Over! Frog collided with a car');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                return;
            }

            addFrog(currentPosition); // Add the frog to its new position
            if (currentPosition < width) {
                setTimeout(() => {
                    alert('Congratulations! You won!');
                    window.location.reload();
                }, 100); // Wait for a short time before displaying victory alert and reloading
                return; // Exit the function to prevent further movement
            }
        }
    }


    //! EVENTS
    document.addEventListener('keydown', handleMovement)
    
    //! PAGE LOAD
    createGrid()
    }
    
    window.addEventListener('DOMContentLoaded', init)