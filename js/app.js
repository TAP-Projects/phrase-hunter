//!NOTE: BUG - spaces are able to take on both the hide and show classes at the same time

// - While it isn't explicitly stated as a requirement, the checkLetter method typically just returns true or false based on whether or not the letter is in the phrase.

// - There should be an event listener in app.js that listens for onscreen keyboard events and calls the handleInteraction method. It looks like you are doing this in Game.js in the startGame method instead.


// On button click, create a new game instance and start the 
// game by calling startGame().
document.querySelector('#btn__reset').addEventListener('click', () => {
    
    // I'm not sure that this is necessary. I wanted to
    // overwrite the previous game instance
    let newGame = null;
    // Create a new game instance
    newGame = new Game();
    // Start the new game
    newGame.startGame();
});

