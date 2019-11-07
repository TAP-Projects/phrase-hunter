// The Game class manages the game. 
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

        // The phrase instance
        this.phraseInst = null;

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
        // Set the value of 'activePhrase'
        this.activePhrase = this.getRandomPhrase();
        // Instantiate a phrase instance and add the phrase to the
        // display
        this.phraseInst = new Phrase(this.activePhrase);
        this.phraseInst.addPhraseToDisplay();

        // Add an event listener that listens for the click event on
        // the key button, and then checks whether that key is in the
        // in the current word or phrase by calling handleInteraction()
        const qwerty = document.querySelector('#qwerty');
        qwerty.addEventListener('click', this.handleInteraction);

    }

    // Get a random phrase from the array of phrases
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * 5)];
    }

    // Handle player actions
    // handleInteraction is called in app.js by the key button
    // event listener. The event target is the key button that
    // was just pressed. handleInteraction decorates the key 
    // using either the 'chosen' class or 'wrong' class depending
    // on whether the key that was pressed is in the active phrase.
    // In the former case, it calls showMatchedLetter, and in 
    // latter case, it calls removeLife.
    handleInteraction(e) {
        // Get the key that was just pressed
        const theLetter = e.target;
        // Get the text of the key that was just pressed
        const theLetterText = e.target.textContent;
        // Store theLetter's current classes
        let classes = theLetter.className;
        // If theLetter is in the DOM, then
        if(this.activePhrase.includes(theLetterText)){  
            // Add the 'chosen' class
            classes += ' chosen';
            theLetter.className = classes;
            // Call showMatchedLetter
            this.phraseInst.showMatchedLetter(e);

        } else {
            // Add the 'wrong' class
            classes += ' wrong';
            theLetter.className = classes;
            // Remove a life
            this.removeLife();
        }        
        
        // Check to see if the game has been won with checkForWin
        // and if so, call gameOver()
        if(this.checkForWin()){
            this.gameOver()
        }
    
    }
        

    removeLife() {
        console.log("Remove life fired")
    }
    
    checkForWin() {
        console.log("check for win fired");
        return false;
        
    }
    
    gameOver() {
        console.log("Game over fired")

    }
}