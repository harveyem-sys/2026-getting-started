//import './style.css'

import { GuessingGame } from "./guessing-game";

const btnAnswer = document.getElementById("btnAnswer");
const userMessageDiv = document.getElementById("userMessage");
const errorDiv = document.getElementById("errorMessage");
const btnReset = document.getElementById("btnReset");
const scoreboardDiv = document.getElementById("scoreboard");
const answerInputElement = document.getElementById("userAnswer") as HTMLInputElement | null;

let maxGuess = 10;

let wins = 0;
let losses = 0;

function updateScoreboard() {
  if (scoreboardDiv) {
    scoreboardDiv.innerText = `Wins: ${wins} | Losses: ${losses}`;
  }
}

// This clears out the text messages from the screen when a new number is put in
function handleInput() {
  if (userMessageDiv) userMessageDiv.innerText = "";
  if (errorDiv) errorDiv.innerText = "";
}

// Hook up the input element to clear the text whenever it changes
answerInputElement?.addEventListener("input", handleInput);

// stay here
function handleAnswerClick() {
    
    if (game.isGameOver) {
      return;
    }

    errorDiv!.innerText = "";
    userMessageDiv!.innerText = "";

    let answer = getUserAnswer();

    let result = game.guess(answer)

    if (result.isError) {
      errorDiv!.innerText = result.message
    } else {
      userMessageDiv!.innerText = result.message

      if (game.isGameOver) {
        if (game.playerWon) { 
          wins++;
        } else {
          losses++;
        }
        updateScoreboard();
      }
    }
}

btnAnswer?.addEventListener("click", handleAnswerClick);

function handleResetClick () {
  userMessageDiv!.innerText = " New Game Starting:3"
  errorDiv!.innerText = ""; 

  game = new GuessingGame(maxGuess, 3)
}

btnReset?.addEventListener("click", handleResetClick);

// stay here
function getUserAnswer(): number | null {
  if (answerInputElement == null) {
    return null;
  }

  let answer = Number(answerInputElement.value);

  if (Number.isNaN(answer) || answer == 0) {
    return null;
  }

  // Note: This clears the physical input box right after clicking submit
  answerInputElement.value = "";
  answerInputElement.focus();
  return answer;
}

let game = new GuessingGame(maxGuess, 3);
updateScoreboard();