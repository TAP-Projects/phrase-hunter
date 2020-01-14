# Phrase Hunter

NOTE: This project is a part of Treehouse's Full-Stack Web Development Techdegree

## What is this?
Phrase Hunter is a simple 'Wheel of Fortune' -like guessing game that demonstrates some principles of object oriented programming in JavaScript.

Play here: https://julianjohannesen.github.io/phrase-hunter/

## Playing the Game
Your goal is to guess all the letters in a hidden, random phrase. At the beginning, you'll only sees the number of letters and words in the phrase, represented by blank boxes on the screen.

The player clicks an onscreen keyboard, or can use their actual keyboard, to guess letters in the phrase. After a letter has been guessed, the letter is disabled on the onscreen keyboard and you can't select that letter again.

If the selected letter is in the phrase at least once, the letter and its position in the phrase is highlighted on screen. All instances of the letter are made visible (so if there are 3 A's, all of the A's in the phrase appear at once).

If the selected letter is not in the phrase, you lose one 'heart.' You have 5 hearts.

Keep playing until you reveal the word or phrase or until you've lost all of your heats.

## Install 
To install the game, fork and clone the repo to your local environment. No build tools were used in the creation of Phrase Hunter. Simply open index.html in your browser.

## Issues
Please report any issues here: https://github.com/julianjohannesen/phrase-hunter/issues

## Development Notes

When I originally built this the game would very quickly switch to a won or lost screen when the player won or lost. It was happening so quickly, it didn't really give the player a chance to see what was going on. My solution was to use setTimeout in both the  gameOver() function and the component functions within gameOver. 

The first timeout simply pauses before loading the won/lost screen, to give the player an opportunity to see that they've won or lost. At that point, I wanted to fade out the screen and fade in the won/lost overlay. I did that with the CSS animation API, which worked well. However, I ran into a series of problems related to the timing of each animation and the reset of the game screen. 

My solution was again to use setTimeout() to control the timing of events. I created separate functions to handle the screen fade out, overlay fade in, and game reset within gameOver(). I added a callback and a timer as parameters to the first two of those function, and then at the end of each function, I added another setTimeout that would call the callback function after 'timer' amount of time, like so:

```js
function doAnimation(cb, timer) {
    // Animation code goes up here
    // Then, call the callback function, but only 
    // after the time it took to do the animation.
    // That amount of time is defined in 'timer'
    setTimeout(cb, timer)
}

// Called like this
doAnimation(() => doAnimation2(doReset, 500), 500)
```

That allowed me to control precisely when each animation began and when the game board was reset. I think it's the first time I've had to do something like this and it was exhilarating. 