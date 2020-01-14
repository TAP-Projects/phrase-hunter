// The Game class manages the game.
class Game {
	constructor() {
		// Bindings
		this.handleInteraction = this.handleInteraction.bind(this);
	}

	// handleInteraction is called in app.js by the letter-button event listener. The event target is the letter-button that  was just pressed/clicked. handleInteraction decorates the key using either the 'chosen' class or 'wrong' class depending on whether the key that was pressed/clicked is in the phrase. In the former case, it calls showMatchedLetter, and in latter case, it calls removeLife.
	handleInteraction(e) {

        console.log(e)
        
        let theLetterLI, theClickedLetterText;
        
        // Is this a click event or a keydown event?
		if (e.type === "click") {

			// If the area clicked wasn't a button, exit the function.
            if (theLetterLI.nodeName !== "BUTTON") return;

            // Otherwise get the list item from e.target and the letter value
			theLetterLI = e.target;
			theClickedLetterText = theLetterLI.textContent;

        } else if (e.type === "keydown") {
            
            // Get the letter value from the key property
            theClickedLetterText = e.key;

            // Use the letter value to find the matching on-screen key button
            theLetterLI = [...qwertyKeys].find(keyButton => keyButton.textContent === theClickedLetterText);

        }
            
        // If the letter clicked has been clicked previously, exit the function.
        if (lettersUsed.includes(theClickedLetterText)) return;

        // Reset the letter button's class
        theLetterLI.className = "key";

        // Add the letter to our list of used letters
        lettersUsed += theClickedLetterText;

        // If the phrase includes the letter, the letter-button gets the 'chosen' class, and the letters in the phrase get 'show'. If not, the letter-button gets the 'wrong' class and we remove a life.
        if (activePhrase.checkLetter(theClickedLetterText)) {
            theLetterLI.className = "key chosen";
            activePhrase.showMatchedLetter(theClickedLetterText);
            if (this.checkForWin()) this.gameOver("won");
        } else {
            theLetterLI.className = "key wrong";
            this.removeLife();
        }
	}

	// If the user chooses an incorrect letter, remove a life. If the number of misses reaches 5, call gameOver('lost')
	removeLife() {
		hearts[hearts.length - 1 - wrongGuesses].src = "images/lostHeart.png";
		wrongGuesses += 1;
		if (wrongGuesses === hearts.length) this.gameOver("lost");
	}

	// Check to see if the player has won or lost. If the phrase contains no hidden elements, then the player has won, so I get all of the phrase LIs and convert them to an array, then filter them any that include the 'hide' class. If that list is empty, I return true.
	checkForWin() {
		// Any letters still hidden?
		const hiddenLetterLIs = [...phraseLetterLis].filter(letterLI =>
			letterLI.className.includes("hide")
		);
		console.log("The hidden letter list items are: ", hiddenLetterLIs);
		if (hiddenLetterLIs.length <= 0) return true;
		else return false;
	}

	// gameOver() takes a string parameter indicating a win or loss and shows the overlay with an appropriate message. There's a lot of timing and callbacks going on here. See the README for my comments.
	gameOver(winLose) {
		// No funny business
		qwertyContainer.removeEventListener("click", currentGame.handleInteraction);
		document.removeEventListener("keydown", currentGame.handleInteraction);

		setTimeout(() => {
			// Fade out the game board
			const fadeOutBoard = (cb, timer) => {
				document.getElementById("theBoard").className = "fade-out";
				setTimeout(cb, timer);
			};

			// Fade in the overlay
			const fadeInOverlay = (cb, timer) => {
				// After the board fades out, set it's visibility to hidden to prevent a flash when the board resets
				document.getElementById("theBoard").style.display = "none";

				// If the player has won, then...
				if (winLose === "won") {
					// Apply the 'win' style to the overlay
					overlay.className = "show-overlay win fade-in";
					// Show a congratulatory message
					gameOverMessage.textContent = "Congratulations! You won!";
				} else if (winLose === "lost") {
					// Apply the 'lose' style to the overlay
					overlay.className = "show-overlay lose fade-in";
					// Show a sympathy message
					gameOverMessage.textContent =
						"You lost! Better luck next time.";
				}
				setTimeout(cb, timer);
			};

			// Reset the game: Overwrite the phrase list contents; reset the classes on the key buttons; reset the hearts; reset wrongGuesses and lettersUsed
			const reset = () => {
				phraseUl.innerHTML = "";
				qwertyKeys.forEach(button => (button.className = "key"));
				hearts.forEach(heart => (heart.src = "images/liveHeart.png"));
				wrongGuesses = 0;
				lettersUsed = "";
			};

			fadeOutBoard(() => fadeInOverlay(reset, 500), 500);
		}, 1000);
	}
}
