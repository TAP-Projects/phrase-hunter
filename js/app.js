let newGame;
// On button cluck, create a new game instance and start the 
// game by calling startGame().
document.querySelector('#btn__reset').addEventListener('click', () => {
    newGame = new Game();
    newGame.startGame();
});

