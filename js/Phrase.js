// The Phrase class takes a phrase and provides methods for displaying it on the screen, checking whether an entered letter matches a letter in the phrase, and showing matched letters
class Phrase {
	constructor() {

		// Bindings
		this.addPhraseToDisplay = this.addPhraseToDisplay.bind(this);
		this.checkLetter = this.checkLetter.bind(this);
		this.showMatchedLetter = this.showMatchedLetter.bind(this);
	}

	

	// Adds letter placeholders to the display when the game starts.
	addPhraseToDisplay(lettersInPhrase) {
		// New fragment to hold placeholder elements
		const frag = document.createDocumentFragment();
		// Create placeholder elements and append to frag
		lettersInPhrase.forEach(letter => {
			const li = document.createElement("li");
			// Test for whether this is a letter or a space
			const isLetter = /\w/.test(letter);
			// Set the classes on the li
			li.className = isLetter ? "hide letter " + letter : "space";
			// Set the text on the li
			li.textContent = isLetter ? letter : " ";
			// Append the li to our fragment
			frag.append(li);
		});
		// Add placeholders to display
		phraseUl.append(frag);
	}

	// Reveals the letters on the board that match the player's selection b replacing each selected element's 'hide' class with the 'show' class.
	showMatchedLetter(lettersInPhrase, theClickedLetterText) {
		lettersInPhrase.forEach( (letter, index) => {
            if(theClickedLetterText === letter){
                phraseLetterLis[index].className = "show letter " + letter
            }
        });
    }

	// Checks to see if the letter selected by the player matches a letter in the phrase
	checkLetter(lettersInPhrase, theClickedLetterText) {
		return lettersInPhrase.includes(theClickedLetterText);
	}
}
