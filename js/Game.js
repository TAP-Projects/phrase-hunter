// The Game class manages the game. 
class Game {
    constructor() {
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

        // This string stores all of the used letters. It's then
        // used to test whether a key has previously been
        // clicked/pressed
        this.lettersUsed = '';

        // Hearts images
        this.hearts = document.getElementsByClassName('heart');

        // Bindings
        this.startGame = this.startGame.bind(this);
        this.getRandomPhrase = this.getRandomPhrase.bind(this);
        this.handleInteraction = this.handleInteraction.bind(this);
    }

    // startGame is called in app.js by an event listener on the
    // reset button. It hides the start screen overlay; generates
    // a new random phrase; instantiates the phrase instance and
    // displays the phrase on the screen
    startGame() {
        // Hide the overlay
        document.getElementById('overlay').style.display = 'none';
        // Set the value of 'activePhrase'
        this.activePhrase = this.getRandomPhrase();
        // Instantiate a phrase instance and add the phrase to the
        // display
        this.phraseInst = new Phrase(this.activePhrase);
        this.phraseInst.addPhraseToDisplay();

        // Add an event listener that listens for the click event on
        // the key button, and then checks whether that key is in the
        // current word or phrase by calling handleInteraction()
        const qwerty = document.getElementById('qwerty');
        qwerty.addEventListener('click', this.handleInteraction);

    }

    // Get a random phrase from the array of phrases
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

    // handleInteraction is called in app.js by the letter-button
    // event listener. The event target is the letter-button that
    // was just pressed/clicked. handleInteraction decorates the key 
    // using either the 'chosen' class or 'wrong' class depending
    // on whether the key that was pressed/clicked is in the phrase.
    // In the former case, it calls showMatchedLetter, and in 
    // latter case, it calls removeLife.
    handleInteraction(e) {

        // Get the key/button that was just pressed/clicked
        const theLetter = e.target;
        // Get the text of the key/button that was just 
        // pressed/clicked
        const theLetterText = e.target.textContent;
        
        // A couple of escape conditions:
        // 1. If the area clicked wasn't a button, exit the function
        // (When using bubbling, you need to make sure you've got
        // the target element you were after.)
        if(e.target.nodeName !== 'BUTTON') return;
        // 2. If the letter clicked has been clicked previously,
        // exit the function. This effectively 'disables' the
        // letter.
        if(this.lettersUsed.includes(theLetterText)) return;
            
        // Add the letter to our list of used letters
        this.lettersUsed += theLetterText;
        
        // If the phrase includes the letter, then...
        if(this.activePhrase.includes(theLetterText)){  
            // Add the 'chosen' class to the letter-button
            theLetter.className = 'key chosen';
            // Call showMatchedLetter
            this.phraseInst.showMatchedLetter(e);
            // Check to see if the game has been won 
            if(this.checkForWin()){
                this.gameOver(true);
            }
        } else {
            // Add the 'wrong' class to the letter-button
            theLetter.className = 'key wrong';
            // Remove a life
            this.removeLife();
        }      
    }
        
    // If the user chooses an incorrect letter, remove a life.
    // If the number of misses reaches 5, call gameOver()
    removeLife() {
        // Replace the full heart image with an empty heart image
        // Access the hearts array at the end of that array
        // and then proceed to the left as this.missed increases
        this.hearts[(this.hearts.length - 1) - this.missed].src = 'images/lostHeart.png';
        // Increment the number of misses
        this.missed++;
        // When the user reaches the max misses, call gameOver()
        if(this.missed === this.hearts.length){
            this.gameOver(false);
        }
    }
    
    // Check to see if the player has won or lost
    checkForWin() {
        // If the phrase contains no hidden elements, then 
        //the player has won, so...
        
        // Get all of the phrase LIs and convert them to a JS
        // array
        let theLis = [...document.querySelectorAll('#phrase ul li')];
        // Filter the LIs for any that include the 'hide' class
        // and store those in hiddenLis
        const hiddenLis = theLis.filter(li => li.className.includes('hide'));
        // If hiddenLis is empty, the player has revealed all
        // of the letters and they've won.        
        if(hiddenLis.length === 0){
            return true;
        }
        // Otherwise, they haven't won yet
        return false;
    }
    
    // gameOver() takes a boolean parameter indicating a win or
    // loss and shows the overlay  with an appropriate
    // message
    gameOver(won) {

        // Reset the game:
        // Overwrite the ul's contents
        const ul = document.querySelector('#phrase ul');
        ul.innerHTML = '';
        // Reset the classes on the key buttons
        const buttons = document.querySelectorAll('#qwerty button');
        buttons.forEach(button => button.className = 'key');
        // Reset the hearts
        const hearts = document.querySelectorAll('img.heart');
        hearts.forEach(heart => heart.src = 'images/liveHeart.png');
        
        // Get the overlay element
        const overlay = document.getElementById('overlay');
        // Get the game-over-message
        const message = document.querySelector('h1#game-over-message');
        // Reveal the overlay again by switching from display
        // none to display flex
        overlay.style.display = 'flex';
        // If the player has won, then...
        if(won){
            // Apply the 'win' style to the overlay
            overlay.className = 'win';
            // Show a congratulatory message
            message.textContent = 'Congratulations! You won!'
        } else {
            // Apply the 'lose' style to the overlay
            overlay.className = 'lose';
            // Show a sympathy message
            message.textContent = 'You lost! Better luck next time.'
        }

    }
}