// The html structure of the page and corresponding DOM elements. Indentation represents nesting structure.

// div#main-container
//     div#overlay.start
const overlay = document.getElementById('overlay');
//         h2.title
//         h1#game-over-message
const gameOverMessage = document.getElementById('game-over-message');
//         button#btn__reset
const gameResetButton = document.getElementById('btn__reset');

//     div#banner.section
//         h2.header

//     div#phrase.section
const phraseContainer = document.getElementById('phrase');
//         ul
const phraseUl = document.querySelector('#phrase ul');
//             li
const phraseLetters = document.querySelectorAll('#phrase ul li');

//     div#qwerty.section
const qwertyContainer = document.getElementById('qwerty');
//         div.keyrow
const qwertyKeys = document.querySelectorAll('#qwerty button');
//             button.key
//             ...
//         div.keyrow
//             button.key
//             ...
//         div.keyrow
//             button.key
//             ...

//     div#scoreboard.section
//         ol
//             li.tries
const hearts = document.querySelectorAll('img.heart');
//                 img.heart
//             ...