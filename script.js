// Initialize score or load it from local storage
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

// Reset the score
const resetScore = () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  scoreUpdateElement();
};

// Function to update the score display
function scoreUpdateElement() {
  document.querySelector('.js_score').innerHTML = `
    <span class="mr-2">Wins: ${score.wins}</span>
    <span class="mr-2">Losses: ${score.losses}</span>
    <span>Ties: ${score.ties}</span>
  `;
}

//create autoplay instance
let isAutoplaying = false;
let intervalId;

const autoPlay = () => {
  if (!isAutoplaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoplaying = true;
  } else {
    clearInterval(intervalId);
    isAutoplaying = false;
  }
};

// Function to randomly pick the computer's move
const pickComputerMove = () => {
  const randomSelect = Math.random();
  let computerMove = '';

  if (randomSelect >= 0 && randomSelect < 1 / 3) {
    computerMove = 'rock';
  } else if (randomSelect >= 1 / 3 && randomSelect < 2 / 3) {
    computerMove = 'paper';
  } else if (randomSelect >= 2 / 3 && randomSelect < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
};

// Function to play the game and display results
const playGame = (playerMove) => {
  const computerMove = pickComputerMove();
  let result = '';

  // Determine the result based on the player's move and computer's move
  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie';
    } else if (computerMove === 'paper') {
      result = 'You lose';
    } else if (computerMove === 'scissors') {
      result = 'You win';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win';
    } else if (computerMove === 'paper') {
      result = 'Tie';
    } else if (computerMove === 'scissors') {
      result = 'You lose';
    }
  } else if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose';
    } else if (computerMove === 'paper') {
      result = 'You win';
    } else if (computerMove === 'scissors') {
      result = 'Tie';
    }
  }

  // Create image elements for computerMove
  let computerMoveImage = '';
  if (computerMove === 'rock') {
    computerMoveImage =
      '<img src="public/images/rock-emoji.png" alt="rock" class="w-10 sm:w-12 md:w-14 lg:w-16" />';
  } else if (computerMove === 'paper') {
    computerMoveImage =
      '<img src="public/images/paper-emoji.png" alt="paper" class="w-10 sm:w-12 md:w-14 lg:w-16" />';
  } else if (computerMove === 'scissors') {
    computerMoveImage =
      '<img src="public/images/scissors-emoji.png" alt="scissors" class="w-10 sm:w-12 md:w-14 lg:w-16" />';
  }

  // Create image elements for playerMove
  let playerMoveImage = '';
  if (playerMove === 'rock') {
    playerMoveImage =
      '<img src="public/images/rock-emoji.png" alt="rock" class="w-10 sm:w-12 md:w-14 lg:w-16" />';
  } else if (playerMove === 'paper') {
    playerMoveImage =
      '<img src="public/images/paper-emoji.png" alt="paper" class="w-10 sm:w-12 md:w-14 lg:w-16" />';
  } else if (playerMove === 'scissors') {
    playerMoveImage =
      '<img src="public/images/scissors-emoji.png" alt="scissors" class="w-10 sm:w-12 md:w-14 lg:w-16" />';
  }

  // Update HTML elements with the images and result
  document.querySelector('.js_result').innerHTML = ` ${result}`;
  document.querySelector(
    '.js_moves'
  ).innerHTML = `<span class="text-xl sm:text-2xl">You</span>
                <span class="pr-2" >${playerMoveImage}</span>
                <span class="pl-2">${computerMoveImage}</span>
                <span class="text-xl sm:text-2xl">Computer</span>`;

  // Update the score based on the result
  if (result === 'You win') {
    score.wins += 1;
  } else if (result === 'You lose') {
    score.losses += 1;
  } else if (result === 'Tie') {
    score.ties += 1;
  }

  // Store the updated score in local storage and update the score display
  localStorage.setItem('score', JSON.stringify(score));
  scoreUpdateElement();
};
