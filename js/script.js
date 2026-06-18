const words = ["DEVELOPER", "JAVASCRIPT", "GITHUB", "GIT", "CODIGO", "ORACLE", "WINDOWS", "LATAM"];
let selectedWord = "";
let guessedLetters = [];
const maxGuesses = 6;
let remainingGuesses = 6;

const wordContainer = document.getElementById("word-container");
const guessesLeftSpan = document.getElementById("guesses-left");
const keyboard = document.getElementById("keyboard");
const resetBtn = document.getElementById("reset-btn");

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingGuesses = maxGuesses;
    guessesLeftSpan.textContent = remainingGuesses;
    
    renderWord();
    renderKeyboard();
}

function renderWord() {
    wordContainer.innerHTML = selectedWord
        .split("")
        .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
    
    checkGameStatus();
}

function renderKeyboard() {
    keyboard.innerHTML = "";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    
    alphabet.forEach(letter => {
        const btn = document.createElement("button");
        btn.textContent = letter;
        btn.addEventListener("click", () => handleGuess(letter, btn));
        keyboard.appendChild(btn);
    });
}

function handleGuess(letter, btn) {
    btn.disabled = true;
    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        renderWord();
    } else {
        remainingGuesses--;
        guessesLeftSpan.textContent = remainingGuesses;
        checkGameStatus();
    }
}

function checkGameStatus() {
    const hasWon = selectedWord.split("").every(l => guessedLetters.includes(l));
    
    if (hasWon) {
        setTimeout(() => alert("¡Felicidades! Ganaste 🎉"), 100);
        disableKeyboard();
    } else if (remainingGuesses <= 0) {
        setTimeout(() => alert(`Perdiste. La palabra era: ${selectedWord} 😢`), 100);
        disableKeyboard();
    }
}

function disableKeyboard() {
    document.querySelectorAll("#keyboard button").forEach(b => b.disabled = true);
}

resetBtn.addEventListener("click", startGame);

// Inicializar el juego al cargar la página
startGame();
