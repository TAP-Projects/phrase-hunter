// The Game class manages the game.
class Game {
	constructor() {
		// Possible phrases
		this.phrases = this.createPhrases([
			"love peace and harmony",
			"oh very nice very nice very nice",
			"oh but maybe in the next world",
			"maybe in the next world",
			"oh"
		]);

		// The Phrase class instance
		this.activePhrase = null;

		//! REMOVE THIS
		// The letters in the phrase
		this.phraseLetters = [];

		// Letters that have been guessed so far
		this.lettersUsed = [];

		// Incorrect guesses
		this.missed = 0;

		// Bindings
		//this.getRandomPhrase = this.getRandomPhrase.bind(this);
		this.handleInteraction = this.handleInteraction.bind(this);
	}

	// Create the array of Phrase objects
	createPhrases(arrayOfPhraseStrings) {
		arrayOfPhraseStrings.map(phrase => new Phrase(phrase));
	}

	// Get a random phrase from the array of phrases
	getRandomPhrase(arrayOfPhraseObjects) {
		return arrayOfPhraseObjects[Math.floor(Math.random() * arrayOfPhraseObjects.length)];
	}

	// handleInteraction is called in app.js by the letter-button event listener. The event target is the letter-button that  was just pressed/clicked. handleInteraction decorates the key using either the 'chosen' class or 'wrong' class depending on whether the key that was pressed/clicked is in the phrase. In the former case, it calls showMatchedLetter, and in latter case, it calls removeLife.
	handleInteraction(e) {
		// These will stand in for both click and keyboard events
		let theKeyButtonLI, theClickedKeyButtonText;

		// Is this a click event or a keydown event?
		// Click
		if (e.type === "click") {
			// Otherwise get the list item from e.target and the letter value
			theKeyButtonLI = e.target;
			theClickedKeyButtonText = theKeyButtonLI.textContent;

			// If the area clicked wasn't a button, exit the function.
			if (theKeyButtonLI.nodeName !== "BUTTON") return;

			// Keydown
		} else if (e.type === "keydown") {
			// Get the letter value from the key property
			theClickedKeyButtonText = e.key;

			// Use the letter value to find the matching on-screen key button list item
			theKeyButtonLI = [...qwertyKeys].find(
				keyButton => keyButton.textContent === theClickedKeyButtonText
			);
		}

		// If the letter clicked has been clicked previously, exit the function.
		if (this.lettersUsed.includes(theClickedKeyButtonText)) return;

		// Reset the letter button's class
		if (theKeyButtonLI) theKeyButtonLI.className = "key";

		// Add the letter to our list of used letters
		this.lettersUsed += theClickedKeyButtonText;

		// If the phrase includes the letter, the letter-button gets the 'chosen' class, and the letters in the phrase get 'show'. If not, the letter-button gets the 'wrong' class and we remove a life.
		if (
			this.activePhrase.checkLetter(
				this.phraseLetters,
				theClickedKeyButtonText
			)
		) {
			theKeyButtonLI.className = "key chosen";
			this.activePhrase.showMatchedLetter(
				this.phraseLetters,
				theClickedKeyButtonText
			);
			if (this.checkForWin()) this.gameOver("won");
		} else {
			if (theKeyButtonLI) theKeyButtonLI.className = "key wrong";
			this.removeLife();
		}
	}

	// If the user chooses an incorrect letter, remove a life. If the number of misses reaches 5, call gameOver('lost')
	removeLife() {
		hearts[hearts.length - 1 - this.missed].src = "images/lostHeart.png";
		this.missed += 1;
		if (this.missed === hearts.length) this.gameOver("lost");
	}

	// Check to see if the player has won or lost. If the phrase contains no hidden elements, then the player has won, so I get all of the phrase LIs and convert them to an array, then filter them any that include the 'hide' class. If that list is empty, I return true.
	checkForWin() {
		// Any letters still hidden?
		const hiddenLetterLIs = [...phraseLetterLis].filter(letterLI =>
			letterLI.className.includes("hide")
		);
		if (hiddenLetterLIs.length <= 0) return true;
		else return false;
	}

	// gameOver() takes a string parameter indicating a win or loss and shows the overlay with an appropriate message. There's a lot of timing and callbacks going on here. See the README for my comments.
	gameOver(winLose) {
		// No funny business
		qwertyContainer.removeEventListener("click", game.handleInteraction);
		document.removeEventListener("keydown", game.handleInteraction);

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

			// Reset the game: Overwrite the phrase list contents; reset the classes on the key buttons; reset the hearts; reset missed and lettersUsed
			const reset = () => {
				phraseUl.innerHTML = "";
				qwertyKeys.forEach(button => (button.className = "key"));
				hearts.forEach(heart => (heart.src = "images/liveHeart.png"));
				this.missed = 0;
				this.lettersUsed = "";
			};

			fadeOutBoard(() => fadeInOverlay(reset, 500), 500);
		}, 1000);
	}

	// Start the game
	startGame() {
		// Fade in the board
		document.getElementById("theBoard").style.display = "block";
		document.getElementById("theBoard").className = "fade-in";
		
		// Set the active Phrase object
		this.activePhrase = this.getRandomPhrase(this.phrases);

		// Set the phrase letters
		this.phraseLetters = activePhrase.phrase.split("");

		// Add the phrase to the display
		this.activePhrase.addPhraseToDisplay(this.phraseLetters);

		// Hide the overlay
		overlay.className = "";
	}
}
