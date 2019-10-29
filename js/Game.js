class Game {
    constructor(missed, phrases, activePhrase) {
        // Missed attempts to guess a letter
        this.missed = 0;
        // Possible phrases
        this.phrases = [
            'love peace and harmony',
            'oh very nice very nice very nice',
            'oh but maybe in the next world',
            'maybe in the next world',
            'oh'
        ];
        // The currently active phrase
        this.activePhrase = null;

        // Bindings
        this.startGame = this.startGame.bind(this);
        this.getRandomPhrase = this.getRandomPhrase.bind(this);
        this.handleInteraction = this.handleInteraction.bind(this);
    }

    // Start the game
    // startGame is called in app.js by an event listener on the
    // reset button. It hides the start screen overlay; generates
    // a new random phrase; instantiates the phrase instance and
    // displays the phrase on the screen
    startGame() {
        // Hide the overlay
        document.querySelector('#overlay').style.display = 'none';
        // Get a new random phrase
        const thePhrase = this.getRandomPhrase();
        // Set the value of 'activePhrase'
        this.activePhrase = thePhrase;
        // Instantiate a phrase instance and add the phrase to the
        // display
        const phraseInst = new Phrase(thePhrase);
        phraseInst.addPhraseToDisplay();

    }

    // Get a random phrase from the array of phrases
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * 5)];
    }

    //NOTE: How am I passing around the phrase instance? How is 
    // showMatchedLetter getting it? Do I need to re-instantiate
    // the instance
    // Handle player actions
    // handleInteraction is called in app.js by the key button
    // event listener. The event target is the key button that
    // was just pressed. handleInteraction decorates the key 
    // using either the 'chosen' class or 'wrong' class depending
    // on whether the key that was pressed is in the active phrase.
    // In the former case, it calls showMatchedLetter, and in 
    // latter case, it calls removeLife.
    handleInteraction(e) {
        const theLetter = e.target.textContent;
        // Get the letter button that was just pressed
        const pressedKey = document.querySelector(`.${theLetter}`);
        // If that letter is in the phrase, then 
        if(this.activePhrase.indexOf(theLetter)){
            // Add the 'chosen' class
            let classes = pressedKey.className;
            classes += ' chosen';
            pressedKey.className = classes;
            // Call showMatchedLetter
            phrase.showMatchedLetter(e);

        } else {
            // Add the 'wrong' class
            let classes = pressedKey.className;
            classes += ' wrong';
            pressedKey.className = classes;
            // Remove a life
            this.removeLife();
        }        
        
        // Check to see if the game has been won with checkForWin
        // and if so, call gameOver()
    
    }
        

    removeLife() {}

    checkForWin() {}

    gameOver() {}
}