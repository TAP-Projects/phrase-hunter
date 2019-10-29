// Add an event listener the listens for the click event on
// the reset button, and then instantiates a new game 
// game instance and starts it by calling startGame().
document.querySelector('#btn__reset').addEventListener('click', () => {
    const newGame = new Game();
    newGame.startGame();
});

// Add an event listener that listens for the click event on
// the key button, and then checks whether that key is in the
// in the current word or phrase by calling handleInteraction()
const qwerty = document.querySelector('#qwerty');
qwerty.addEventListener('click', handleInteraction);