const ul = document.querySelector('#phrase ul');
const buttons = document.querySelectorAll('#qwerty button');
const hearts = document.querySelectorAll('img.heart');
// On button cluck, create a new game instance and start the 
// game by calling startGame().
document.querySelector('#btn__reset').addEventListener('click', () => {
    // Remove the current ul and append a new ul
    ul.innerHTML = '';
    // Reset the classes on the key buttons
    buttons.forEach(button => button.className = 'key');
    // Reset the hearts
    hearts.forEach(heart => heart.src = 'images/liveHeart.png');
    // Create a new game instance
    newGame = new Game();
    // Start the new game
    newGame.startGame();
});

