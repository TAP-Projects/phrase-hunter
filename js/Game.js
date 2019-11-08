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

        // Memo for pressed letters
        this.lettersUsed = '';

        // Hearts images
        this.hearts = document.querySelectorAll('.heart');

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
        // Gotta click on a button. 
        if(e.target.nodeName === 'BUTTON'){
            // Get the key that was just pressed
            const theLetter = e.target;
            // Get the text of the key that was just pressed
            const theLetterText = e.target.textContent;
            // Add the letter to the list of used letters
            if(!this.lettersUsed.includes(theLetterText)){
                this.lettersUsed += theLetterText;
            } else {
                return;
            }
            // Store theLetter's current classes
            let classes = theLetter.className;
            // If theLetter is in the DOM, then
            if(this.activePhrase.includes(theLetterText)){  
                // Add the 'chosen' class
                classes += ' chosen';
                theLetter.className = classes;
                // Call showMatchedLetter
                this.phraseInst.showMatchedLetter(e);
                // Check to see if the game has been won 
                if(this.checkForWin()){
                    this.gameOver(true);
                }
            } else {
                // Add the 'wrong' class
                classes += ' wrong';
                theLetter.className = classes;
                // Remove a life
                this.removeLife();
            }   
    }     
    }
        

    removeLife() {
        if(this.missed < 5){
            this.hearts[this.hearts.length - 1 - this.missed].src = 'images/lostHeart.png';
            this.missed++;
        } else {
            this.gameOver(false);
        }
    }
    
    // Check to see if the player has won or lost
    checkForWin() {
        // If the phrase as it appears on the page contains no
        // hidden elements, then the player has won
        let theLis = [...document.querySelectorAll('#phrase ul li')];
        const hiddenLis = theLis.filter(li => li.className.includes('hide'));        
        if(hiddenLis.length === 0){
            // Then they've won
            return true;
        }
        // Or they haven't won yet
        return false;
    }
    
    // Is the game over? Did the player win or lose?
    gameOver(won) {
        // Get the overlay
        const overlay = document.querySelector('#overlay');
        // Get the game-over-message
        const message = document.querySelector('h1#game-over-message');
        // Replace start screen
        overlay.style.display = 'flex';
        if(won){
            console.log('you won!')
            // Apply the 'win' style
            overlay.className = 'win';
            // Show message
            message.textContent = 'Congratulations! You won!'
        }
        else {
            // Apply the 'lose' style
            overlay.className = 'lose';
            // Show message
            message.textContent = 'You lost! Better luck next time.'
        }

    }
}