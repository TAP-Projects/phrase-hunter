let phrase = new Phrase("Hello, world!");
phrase.addPhraseToDisplay();

// Add an event listener that listens for the click event on
// the key, and then checks whether that e.target.value is 
// equal to one of letters in the word or phrase
const qwerty = document.querySelector('#qwerty');
qwerty.addEventListener('click', phrase.showMatchedLetter)