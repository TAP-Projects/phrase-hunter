// The Phrase class takes a phrase and provides methods for displaying
// it on the screen, checking whether an entered letter matches 
// a letter in the phrase, and showing matched letters 
class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase().trim();
        this.letters = this.phrase.split(''); //?

        // DOM
        this.phraseDiv = document.getElementById('phrase');
        this.letterLis = this.phraseDiv.firstElementChild.children; //HTML collection

        // Bindings
        this.addPhraseToDisplay = this.addPhraseToDisplay.bind(this);
        this.checkLetter = this.checkLetter.bind(this);
        this.showMatchedLetter = this.showMatchedLetter.bind(this);
    }

    // Adds letter placeholders to the display when the game starts.  
    addPhraseToDisplay() {
        // New fragment to hold placeholder elements
        const frag = document.createDocumentFragment();
        // Create placeholder elements and append to frag
        this.letters.forEach((letter) => {
            const li = document.createElement('li');
            // Test for whether this is a letter or a space
            const isLetter = /\w/.test(letter);
            // Set the classes on the li
            li.className = isLetter ? 'hide letter ' + letter : 'space';
            // Set the text on the li
            li.textContent = isLetter ? letter : ' ';
            // Append the li to our fragment
            frag.append(li);
        });
        // Add placeholders to display
        this.phraseDiv.firstElementChild.append(frag);
    }

    // Checks to see if the letter selected by the player matches a 
    // letter in the phrase and returns an array of indices for the 
    // matches.
    checkLetter(e) {
        //!NOTE: this is a convoluted way to do this.
        // Create an array of indices by looping through the 
        // letters of the phrase. Whenever a letter matches the
        // key clicked by the user, return the letter's index
        const showThese = [];
        this.letters.forEach((letter, index) => {
            if (e.target.textContent === letter) {
                showThese.push(index);
            };
        });
        // Return the array of indices
        return showThese;
    }

    // Reveals the letter(s) on the board that matches the player's 
    // selection. 
    showMatchedLetter(e) {
        // Replace each selected element's 'hide' class with the
        // 'show' class.
        const indices = this.checkLetter(e);
        indices.forEach((theIndex) => {
                // theLi corresponds to a letter placeholder on the page
                const theLi = this.letterLis[theIndex];
                theLi.classList.toggle('hide');
                theLi.classList.toggle('show');
            });
    }
}