var programming_languages = [
    "monkey",
	"tiger",
	"horse",
	"dog",
	"pig",
	"sheep",
	"rabbit",
	"rooster",
]

////default values

let answer = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

////this function selects a random string in the array

    function randomWord() {
        answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
    }

////splitting the alphabet inside the string

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
        <button
            class="btn btn-lg btn-dark m-2"
            id='` + letter + `'
            onClick= "handleGuess('` + letter + `')"
        >
            ` + letter + `
        </button>
    `).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

////this disables the letter upon clicking it

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

   ////updating the status of the game for every time you make a mistake or guessed a correct letter

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        gameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        gameLost();
        updateHangmanPicture();
    }
}

////this updates the hangman pictures for every time you make a mistake

function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = 'images/' + mistakes + '.jpg';
}

////updating the status of the game if you either win or lose

function gameWon() {
    if (wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = 'You Won :)';
    }
}

function gameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('wordSpotlight').innerHTML = 'The answer was ' + answer;
        document.getElementById('keyboard').innerHTML = 'You lost :('
    }
}

////initially, a letter is marked with an underscore, but for each letter you guess, the underscore gets replaced with a correct letter. at the same time, the number of mistakes get updated when you make a mistake

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

////This function resets the hangman game

function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = 'images/0.jpg';

    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

////calling the functions

randomWord();
generateButtons();
guessedWord();