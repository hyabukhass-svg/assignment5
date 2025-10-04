/*
  Name: Huda Abukhass
  Date: 10.03.2025
  CSC 372-01

  This JavaScript file controls the Rock-Paper-Scissors game logic.
  It handles player input, computer shuffling and choice, deciding winners,
  updating the scoreboard, and resetting the game.
*/

const choices = ["scissors", "rock", "paper"];
const choiceImages = {
  scissors: "images/scissors.PNG",
  rock: "images/rock.PNG",
  paper: "images/paper.PNG"
};

let wins = 0, losses = 0, ties = 0;

// Event listeners for player choices
document.querySelectorAll(".choice").forEach(img => {
  img.addEventListener("click", () => {
    document.querySelectorAll(".choice").forEach(i => i.classList.remove("selected"));
    img.classList.add("selected");
    playRound(img.id);
  });
});

function playRound(playerChoice) {
  let computerImg = document.getElementById("computer-image");
  let resultText = document.getElementById("result");

  // Shuffle images every 500ms for 3 seconds
  let shuffleCount = 0;
  let shuffleInterval = setInterval(() => {
    let rand = choices[Math.floor(Math.random() * 3)];
    computerImg.src = choiceImages[rand];
    shuffleCount++;
    if (shuffleCount >= 6) {
      clearInterval(shuffleInterval);
      // Final computer choice
      let computerChoice = choices[Math.floor(Math.random() * 3)];
      computerImg.src = choiceImages[computerChoice];
      let outcome = decideWinner(playerChoice, computerChoice);
      resultText.textContent = outcome;
      updateScore(outcome);
    }
  }, 500);
}

function decideWinner(player, computer) {
  if (player === computer) return "It's a tie!";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "You win!";
  }
  return "Computer wins!";
}

function updateScore(outcome) {
  if (outcome === "You win!") {
    wins++;
    document.getElementById("wins").textContent = wins;
  } else if (outcome === "Computer wins!") {
    losses++;
    document.getElementById("losses").textContent = losses;
  } else {
    ties++;
    document.getElementById("ties").textContent = ties;
  }
}

document.getElementById("reset").addEventListener("click", () => {
  wins = losses = ties = 0;
  document.getElementById("wins").textContent = wins;
  document.getElementById("losses").textContent = losses;
  document.getElementById("ties").textContent = ties;
  document.getElementById("computer-image").src = "images/question-mark.PNG";
  document.getElementById("result").textContent = "Make your move!";
  document.querySelectorAll(".choice").forEach(i => i.classList.remove("selected"));
});
