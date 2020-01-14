
// The html structure of the page and corresponding DOM elements. Indentation represents nesting structure.
// div#main-container
//     div#overlay.start
const overlay = document.getElementById("overlay");
//         h2.title
//         h1#game-over-message
const gameOverMessage = document.getElementById("game-over-message");
//         button#btn__reset
const gameResetButton = document.getElementById("btn__reset");
//	   div#theBoard
//     	div#banner.section
//         	h2.header

//     	div#phrase.section
const phraseContainer = document.getElementById("phrase");
//         	ul
const phraseUl = document.querySelector("#phrase ul");
//             	li
//     	div#qwerty.section
const qwertyContainer = document.getElementById("qwerty");
//         	div.keyrow
//             	button.key
const qwertyKeys = document.querySelectorAll("#qwerty button");
//             	...
//         	div.keyrow
//             	button.key
//             	...
//         	div.keyrow
//             	button.key
//             	...

//     	div#scoreboard.section
//         	ol
//             li.tries
//                 img.heart
const hearts = document.querySelectorAll("img.heart");
//             ...
