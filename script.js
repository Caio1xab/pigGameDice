'use strict';

//Selecting elements
const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.querySelector('#score--1');
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');
const currentScoreEl0 = document.querySelector('#current--0');
const currentScoreEl1 = document.querySelector('#current--1');
const player0Name = document.querySelector('.player0Name');
const player1Name = document.querySelector('.player1Name');

//buttons and dice
const getDice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');

//Starting elements
let playing, currentScore, currentPlayerTurn, scores;

//Starting and reseting the game
const initializeGame = () => {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  currentPlayerTurn = 0;

  scoreEl0.textContent = '0';
  scoreEl1.textContent = '0';
  getDice.classList.add('hidden');

  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector('#name--0').textContent = 'Player 1';
  document.querySelector('#name--1').textContent = 'Player 2';
};
initializeGame();
newGame.addEventListener('click', initializeGame);

//Switch player
const switchCurrentPlayer = () => {
  document.getElementById(`current--${currentPlayerTurn}`).textContent = 0;
  currentPlayerTurn = currentPlayerTurn === 0 ? 1 : 0;
  currentScore = 0;
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
};

//Roll dice functionality.
const randomDice = () => {
  if (playing) {
    let myRandomDice = Math.trunc(Math.random() * 6 + 1);
    console.log(myRandomDice);

    //checking if the dice is hidden and removing hidden.
    if (getDice.classList.contains('hidden')) {
      getDice.classList.remove('hidden');
    }
    getDice.src = `/images/dice-${myRandomDice}.png`;

    if (myRandomDice !== 1) {
      //Add dice to current score
      currentScore += myRandomDice;
      document.getElementById(`current--${currentPlayerTurn}`).textContent =
        currentScore;
    } else {
      switchCurrentPlayer();
    }
  }
};
btnRoll.addEventListener('click', randomDice);

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add the current score to the definite player score
    scores[currentPlayerTurn] += currentScore;
    document.getElementById(`score--${currentPlayerTurn}`).textContent =
      scores[currentPlayerTurn];

    //Check if the current score is >= to 100
    if (scores[currentPlayerTurn] >= 100) {
      //finish the game
      getDice.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${currentPlayerTurn}`)
        .classList.add('player--winner');
      document
        .getElementsByClassName(`.player--${currentPlayerTurn}`)
        .classList.remove('player--active');
      document
        .getElementById(`#name--${currentPlayerTurn}`)
        .classList.add('name');
    } else {
      //switch to the next player
      switchCurrentPlayer();
    }
  }
});

//Set name
const askTheName1 = () => {
  const asking = prompt(`What's the player's 1 name ? `);
  document.querySelector('#name--0').textContent = asking;
};
player0Name.addEventListener('click', askTheName1);

const askTheName2 = () => {
  const asking = prompt(`What's the player's 2 name ? `);
  document.querySelector('#name--1').textContent = asking;
};
player1Name.addEventListener('click', askTheName2);
