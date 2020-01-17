let game;

// On button click, create a new phrase, display it, then create a n new game, and start it.
gameResetButton.addEventListener('click', () => {
    
    // Create a game instance
    game = new Game();
    
    // Start the game
    game.startGame();

    // Now we can get the phrase letter list items
    phraseLetterLis = document.querySelectorAll("#phrase ul li");
        
    // Add an event listener that listens for the click event on a key button, and then checks whether that key is in the current word or phrase by calling handleInteraction()
    qwertyContainer.addEventListener('click', game.handleInteraction);
    document.addEventListener('keydown', game.handleInteraction);
    
});

