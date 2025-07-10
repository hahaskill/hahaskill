const fruits = ['🍎', '🍌', '🍇', '🍓', '🍍'];
let cards = [...fruits, ...fruits];
cards = shuffle(cards);

const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const fireworks = document.getElementById('fireworks');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;
let score = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  cards.forEach((fruit, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.fruit = fruit;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains('flipped')) return;

  this.textContent = this.dataset.fruit;
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  if (firstCard.dataset.fruit === secondCard.dataset.fruit) {
    score += 10;
    scoreDisplay.textContent = `점수: ${score}`;
    matchedCount += 2;

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetTurn();

    if (matchedCount === cards.length) {
      fireworks.classList.remove('hidden');
    }
  } else {
    setTimeout(() => {
      firstCard.textContent = '';
      secondCard.textContent = '';
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

createBoard();
