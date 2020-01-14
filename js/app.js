// Possible phrases
const phrases = [
    'love peace and harmony',
    'oh very nice very nice very nice',
    'oh but maybe in the next world',
    'maybe in the next world',
    'oh'
];

let activePhrase = {};
let phraseLetterLis = [];
let currentGame = {};
let wrongGuesses = 0;
let lettersUsed = ' ';

// On button click, create a new phrase, display it, then create a n new game, and start it.
gameResetButton.addEventListener('click', () => {

    // Fade in the board
    document.getElementById("theBoard").style.display = "block";
    document.getElementById("theBoard").className = "fade-in";
    
    // Create a phrase instance and add the phrase to the display
    activePhrase = new Phrase(phrases);
    activePhrase.addPhraseToDisplay();
    // Now we can get the phrase list items
    phraseLetterLis = document.querySelectorAll("#phrase ul li");
    
    // Create a new game instance
    currentGame = new Game();
    
    // Add an event listener that listens for the click event on a key button, and then checks whether that key is in the current word or phrase by calling handleInteraction()
    qwertyContainer.addEventListener('click', currentGame.handleInteraction);
    
    // Hide the overlay
    overlay.className = ""
});

