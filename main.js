const PLAYER1 = document.getElementById("player1");
const PLAYER2 = document.getElementById("player2");
const P1_GLOBAL_SCORE = document.getElementById("global-score-0");
const P2_GLOBAL_SCORE = document.getElementById("global-score-1");
const HOLD_BTN = document.getElementsByClassName("hold")[0];
const ROLL_BTN = document.getElementsByClassName("roll-dice")[0];
let score, roundScore, activePlayer, dice, sum;

score = [0, 0];
roundScore = 0;
activePlayer = 0;
sum = 0;

function rollDice() {
  dice = Math.floor(Math.random() * 6) + 1;
  return dice;
}

function diceDisplay(diceRoll) {
  let diceArr = [
    '<i class="fas fa-dice-one"></i>',
    '<i class="fas fa-dice-two"></i>',
    '<i class="fas fa-dice-three"></i>',
    '<i class="fas fa-dice-four"></i>',
    '<i class="fas fa-dice-five"></i>',
    '<i class="fas fa-dice-six"></i>',
  ];

  document.getElementsByClassName("dice-display")[0].innerHTML =
    diceArr[diceRoll - 1];
  document.querySelector(".dice-display i").style.animationPlayState =
    "running";
}

diceDisplay(rollDice());

// new game button
document
  .getElementsByClassName("new-game")[0]
  .addEventListener("click", function () {
    activePlayer = 0;
    diceDisplay(rollDice());
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    P1_GLOBAL_SCORE.textContent = 0;
    P2_GLOBAL_SCORE.textContent = 0;
    PLAYER2.classList.remove("active-player-bg");
    PLAYER1.classList.add("active-player-bg");

    ROLL_BTN.addEventListener("click", rollClick);
    HOLD_BTN.addEventListener("click", holdClick);

    sum = 0;
    score = [0, 0];
  });

// roll dice button

function rollClick() {
  rollDice();
  if (dice === 1) {
    diceDisplay(1);
    sum = 0;
    document.getElementById("score-" + activePlayer).textContent = 0;
    // might be able to use ternary operator instead of this nested if statement
    // activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    if (activePlayer === 0) {
      activePlayer = 1;
      PLAYER1.classList.remove("active-player-bg");
      PLAYER2.classList.add("active-player-bg");
    } else {
      activePlayer = 0;
      PLAYER2.classList.remove("active-player-bg");
      PLAYER1.classList.add("active-player-bg");
    }
  } else {
    diceDisplay(dice);
    sum += dice;
    document.getElementById("score-" + activePlayer).textContent = sum;
  }
}

ROLL_BTN.addEventListener("click", rollClick);

// hold button
function holdClick() {
  if (activePlayer === 0) {
    score[0] += sum;
    if (score[0] >= 100) {
      P1_GLOBAL_SCORE.textContent = score[0];
      document.querySelector("#player1 h2").textContent = "WINNER";
      ROLL_BTN.removeEventListener("click", rollClick);
      HOLD_BTN.removeEventListener("click", holdClick);
      document.getElementById("score-" + activePlayer).textContent = 0;
    } else {
      P1_GLOBAL_SCORE.textContent = score[0];
      document.getElementById("score-" + activePlayer).textContent = 0;
      PLAYER1.classList.remove("active-player-bg");
      PLAYER2.classList.add("active-player-bg");
      activePlayer = 1;
    }
  } else {
    score[1] += sum;
    if (score[1] >= 100) {
      P2_GLOBAL_SCORE.textContent = score[1];
      document.querySelector("#player2 h2").textContent = "WINNER";
      ROLL_BTN.removeEventListener("click", rollClick);
      HOLD_BTN.removeEventListener("click", holdClick);
      document.getElementById("score-" + activePlayer).textContent = 0;
    } else {
      P2_GLOBAL_SCORE.textContent = score[1];
      document.getElementById("score-" + activePlayer).textContent = 0;
      PLAYER2.classList.remove("active-player-bg");
      PLAYER1.classList.add("active-player-bg");
      activePlayer = 0;
    }
  }
  sum = 0;
}
