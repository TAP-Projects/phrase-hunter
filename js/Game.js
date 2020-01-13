// The Game class manages the game. 
class Game {
    constructor() {
        // Bindings
        this.startGame = this.startGame.bind(this);
        this.handleInteraction = this.handleInteraction.bind(this);
    }

    // startGame is called in app.js by an event listener on the reset button. It hides the start screen overlay; generates a new random phrase; instantiates the phrase instance and displays the phrase on the screen
    startGame() {

        // Hide the overlay
        overlay.style.display = 'none';

    }

    // handleInteraction is called in app.js by the letter-button event listener. The event target is the letter-button that  was just pressed/clicked. handleInteraction decorates the key using either the 'chosen' class or 'wrong' class depending on whether the key that was pressed/clicked is in the phrase. In the former case, it calls showMatchedLetter, and in latter case, it calls removeLife.
    handleInteraction(e) {

        // Get the key/button that was just pressed/clicked
        const theLetter = e.target;
        // Get the text of the key/button that was just pressed/clicked
        const theLetterText = e.target.textContent;
        
        // If the area clicked wasn't a button, exit the function.
        if(e.target.nodeName !== 'BUTTON') return;
        // If the letter clicked has been clicked previously, exit the function.
        if(lettersUsed.includes(theLetterText)) return;
        
        // Reset the letter button's class
        theLetter.className = 'key';

        // Add the letter to our list of used letters
        lettersUsed += theLetterText;
        
        // If the phrase includes the letter, then decorate the letter-button with the 'chosen' class, and call showMatchedLetter. Finally, check to see if the game has been won. If so, call gameOver('won'), else decorate the letter-button with the 'wrong' class and remove a life.
        if(activePhrase.includes(theLetterText)){  
            theLetter.className = 'key chosen';
            activePhrase.showMatchedLetter(e);
            if(this.checkForWin()) this.gameOver('won');
            else {
                theLetter.className = 'key wrong';
                this.removeLife();
            } 
        }     
    }
        
    // If the user chooses an incorrect letter, remove a life. If the number of misses reaches 5, call gameOver('lost')
    removeLife() {
        hearts[(hearts.length - 1) - wrongGuesses].src = 'images/lostHeart.png';
        wrongGuesses += 1;
        if(wrongGuesses === hearts.length) this.gameOver('lost');
    }
    
    // Check to see if the player has won or lost. If the phrase contains no hidden elements, then the player has won, so I get all of the phrase LIs and convert them to an array, then filter them any that include the 'hide' class. If that list is empty, I return true.
    checkForWin() {
        if([...theLis].filter(li => li.className.includes('hide')) === 0) return true;
        return false;
    }
    
    // gameOver() takes a boolean parameter indicating a win or loss and shows the overlay with an appropriate message
    gameOver(won) {

        // Reset the game:
        // Overwrite the phrase list contents
        phraseUl.innerHTML = '';
        // Reset the classes on the key buttons
        qwertyKeys.forEach(button => button.className = 'key');
        // Reset the hearts
        hearts.forEach(heart => heart.src = 'images/liveHeart.png');
        
        // Reveal the overlay again by switching from display none to display flex
        overlay.style.display = 'flex';
        // If the player has won, then...
        if('won'){
            // Apply the 'win' style to the overlay
            overlay.className = 'win';
            // Show a congratulatory message
            gameOverMessage.textContent = 'Congratulations! You won!'
        } else if('lost'){
            // Apply the 'lose' style to the overlay
            overlay.className = 'lose';
            // Show a sympathy message
            gameOverMessage.textContent = 'You lost! Better luck next time.'
        }

    }
}