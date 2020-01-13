//!NOTE: BUG - spaces are able to take on both the hide and show classes at the same time
//!NOTE: BUG - hearts don't reduce when incorrect letters are chosen


// Possible phrases
const phrases = [
    'love peace and harmony',
    'oh very nice very nice very nice',
    'oh but maybe in the next world',
    'maybe in the next world',
    'oh'
];

let wrongGuesses = 0;
let lettersUsed = '';

// Instantiate a phrase instance and add the phrase to the display
let activePhrase = new Phrase(phrases);
activePhrase.addPhraseToDisplay();

let currentGame = new Game();

// Add an event listener that listens for the click event on a key button, and then checks whether that key is in the current word or phrase by calling handleInteraction()
qwertyKey.addEventListener('click', currentGame.handleInteraction);

// On button click, create a new game instance and start the game by calling startGame().
gameResetButton.addEventListener('click', () => {
    // I'm not sure that this is necessary. I wanted to  overwrite the previous game instance
    let newGame = null;
    // Create a new game instance
    newGame = new Game();
    // Start the new game
    newGame.startGame();
});

