const WORDS = ['APPLE', 'BREAD', 'CLOUD', 'HOUSE', 'MUSIC', 'PLANT', 'RIVER', 'SMILE'];
const MAX_MISTAKES = 6;

let gameState;
let selectedGuessMode = 'letter';
let previousWord = '';
let drawingCanvas;

function setup() {
  drawingCanvas = new Canvas(720, 300);
  drawingCanvas.setAttribute('role', 'img');
  drawingCanvas.setAttribute('aria-label', 'Hangman drawing');
  document.getElementById('drawing-area').appendChild(drawingCanvas);

  document.getElementById('letter-mode').addEventListener('click', () => setGuessMode('letter'));
  document.getElementById('word-mode').addEventListener('click', () => setGuessMode('word'));
  document.getElementById('guess-form').addEventListener('submit', (event) => {
    event.preventDefault();
    submitGuess();
  });
  document.getElementById('new-round').addEventListener('click', startNewRound);

  noLoop();
  startNewRound();
}

function draw() {
  background('#f8fafc');
  stroke('#263238');
  strokeWeight(7);
  strokeCap(ROUND);
  noFill();

  // The gallows stays visible; each incorrect guess draws one figure stroke.
  line(105, 265, 365, 265);
  line(160, 265, 160, 30);
  line(160, 30, 385, 30);
  line(385, 30, 385, 65);

  const mistakes = gameState ? gameState.mistakes : 0;
  if (mistakes >= 1) ellipse(385, 91, 52, 52);
  if (mistakes >= 2) line(385, 117, 385, 190);
  if (mistakes >= 3) line(385, 132, 345, 160);
  if (mistakes >= 4) line(385, 132, 425, 160);
  if (mistakes >= 5) line(385, 190, 350, 235);
  if (mistakes >= 6) line(385, 190, 420, 235);
}

function startNewRound() {
  let wordIndex = Math.floor(random(WORDS.length));
  if (WORDS.length > 1 && WORDS[wordIndex] === previousWord) {
    wordIndex = (wordIndex + 1 + Math.floor(random(WORDS.length - 1))) % WORDS.length;
  }

  const word = WORDS[wordIndex];
  previousWord = word;
  gameState = {
    word,
    guessedLetters: new Set(),
    incorrectLetters: [],
    incorrectWords: [],
    mistakes: 0,
    status: 'playing',
    message: 'Choose a guess mode and enter your guess.'
  };

  setGuessMode('letter');
  document.getElementById('guess-input').value = '';
  renderGame();
}

function setGuessMode(mode) {
  selectedGuessMode = mode;
  document.getElementById('letter-mode').setAttribute('aria-pressed', String(mode === 'letter'));
  document.getElementById('word-mode').setAttribute('aria-pressed', String(mode === 'word'));
  document.getElementById('guess-label').textContent = mode === 'letter' ? 'Enter a letter' : 'Enter a word';
  document.getElementById('guess-input').placeholder = mode === 'letter' ? 'Type one letter' : 'Type your word';
}

function submitGuess() {
  if (!gameState || gameState.status !== 'playing') return;

  const guess = document.getElementById('guess-input').value.trim().toUpperCase();
  if (selectedGuessMode === 'letter') {
    guessLetter(guess);
  } else {
    guessWord(guess);
  }

  document.getElementById('guess-input').value = '';
  renderGame();
  if (gameState.status === 'playing') document.getElementById('guess-input').focus();
}

function guessLetter(guess) {
  if (!/^[A-Z]$/.test(guess)) {
    gameState.message = 'Invalid guess. Enter exactly one letter from A to Z.';
    return;
  }

  if (gameState.guessedLetters.has(guess)) {
    gameState.message = `You already guessed ${guess}. Try a different letter.`;
    return;
  }

  gameState.guessedLetters.add(guess);
  if (gameState.word.includes(guess)) {
    gameState.message = `Correct! The letter ${guess} is in the word.`;
    if ([...gameState.word].every((letter) => gameState.guessedLetters.has(letter))) {
      gameState.status = 'won';
      gameState.message = `You win! The word was ${gameState.word}.`;
    }
    return;
  }

  gameState.incorrectLetters.push(guess);
  addMistake();
  gameState.message = gameState.status === 'lost'
    ? `Game over! The word was ${gameState.word}.`
    : `Not quite. ${guess} is not in the word.`;
}

function guessWord(guess) {
  if (!/^[A-Z]+$/.test(guess)) {
    gameState.message = 'Invalid guess. Enter a word using letters A to Z only.';
    return;
  }

  if (guess === gameState.word) {
    gameState.guessedLetters = new Set(gameState.word);
    gameState.status = 'won';
    gameState.message = `You win! The word was ${gameState.word}.`;
    return;
  }

  gameState.incorrectWords.push(guess);
  addMistake();
  gameState.message = gameState.status === 'lost'
    ? `Game over! The word was ${gameState.word}.`
    : `Incorrect word. ${guess} is not the hidden word.`;
}

function addMistake() {
  gameState.mistakes += 1;
  if (gameState.mistakes >= MAX_MISTAKES) gameState.status = 'lost';
}

function renderGame() {
  const wordDisplay = document.getElementById('word-display');
  wordDisplay.replaceChildren();
  const revealWord = gameState.status === 'lost';

  for (const letter of gameState.word) {
    const slot = document.createElement('span');
    slot.className = 'word-slot';
    slot.textContent = revealWord || gameState.guessedLetters.has(letter) ? letter : '_';
    wordDisplay.appendChild(slot);
  }

  renderGuessList('wrong-letters', gameState.incorrectLetters, true);
  renderGuessList('wrong-words', gameState.incorrectWords, false);

  document.getElementById('game-status').textContent = gameState.message;
  const gameEnded = gameState.status !== 'playing';
  document.getElementById('guess-input').disabled = gameEnded;
  document.getElementById('submit-guess').disabled = gameEnded;
  document.getElementById('letter-mode').disabled = gameEnded;
  document.getElementById('word-mode').disabled = gameEnded;

  if (drawingCanvas) {
    drawingCanvas.setAttribute(
      'aria-label',
      `Hangman drawing with ${gameState.mistakes} of ${MAX_MISTAKES} incorrect guesses`
    );
    redraw();
  }
}

function renderGuessList(elementId, guesses, showCross) {
  const list = document.getElementById(elementId);
  list.replaceChildren();

  for (const guess of guesses) {
    const item = document.createElement('li');
    if (showCross) {
      const letter = document.createElement('strong');
      letter.textContent = guess;
      const cross = document.createElement('span');
      cross.className = 'wrong-letter-mark';
      cross.setAttribute('aria-label', 'incorrect');
      cross.textContent = ' ✗';
      item.append(letter, cross);
    } else {
      item.textContent = guess;
    }
    list.appendChild(item);
  }
}
