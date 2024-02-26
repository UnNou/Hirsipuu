// Koodi ei lähtenyt toimimaan ennen kuin lisäsin ; loppuihin. En keksinyt syytä miksi ei toiminut ilman.

const input = document.querySelector('input');
const output = document.querySelector('output');
const span = document.querySelector('span');

const words = [
    "programming",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "stylesheet",
    "library",
    "asynchronous",
    "hypertext",
];

let randomizedWord = '';
let maskedWord = '';
let guessCount = 0;

const newGame = () => {
    const random = Math.floor(Math.random() * words.length); // Kohta ei toiminut -> Math.floor(Math.random() * 10) + 1
    randomizedWord = words[random];
    maskedWord = "*".repeat(randomizedWord.length);
    console.log(randomizedWord);
    output.innerHTML = maskedWord;
    guessCount = 0;
    span.textContent = guessCount;
};

const win = () => {
    alert(`Arvasit oikein, sana on ${randomizedWord}. Arvausten määrä: ${guessCount}.`);
    newGame();
};

const replaceFoundChars = (guess) => {
    let found = false;
    for (let i = 0; i < randomizedWord.length; i++) {
        const char = randomizedWord[i].toLowerCase();
        if (char === guess.toLowerCase()) {
            let newString = maskedWord.split('');
            newString.splice(i, 1, randomizedWord[i]);
            maskedWord = newString.join('');
            found = true;
        }
    }
    if (found) {
        output.innerHTML = maskedWord;
    } else {
        alert("Arvasit väärin!");
    }
};

newGame();

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        guessCount++;
        span.textContent = guessCount;

        const guess = input.value.trim();
        if (guess.toLowerCase() === randomizedWord.toLowerCase()) {
            win();
        } else if (guess.length === 1) {
            replaceFoundChars(guess);
            if (maskedWord.toLowerCase() === randomizedWord.toLowerCase()) {
                win();
            }
        }
        input.value = '';
    }
});
