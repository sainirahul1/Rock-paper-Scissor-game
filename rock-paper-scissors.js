let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

  const moveIcons = {
    Rock: 'images/rock-emoji.png',
    Paper: 'images/paper-emoji.png',
    Scissors: 'images/scissors-emoji.png'
  };

  function updateScoreElement(result, playerMove, computerMove) {
    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = 
      playerMove && computerMove
        ? `You <img class="move-icon" src="${moveIcons[playerMove]}" alt="${playerMove}"> 
           <img class="move-icon" src="${moveIcons[computerMove]}" alt="${computerMove}"> Computer`
        : '';

    document.querySelector('.js-score').innerHTML = 
      `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }

  function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'Scissors') {
      result = computerMove === 'Rock' ? 'You lose.' :
               computerMove === 'Paper' ? 'You win!' : 'Tie.';
    } else if (playerMove === 'Paper') {
      result = computerMove === 'Rock' ? 'You win!' :
               computerMove === 'Paper' ? 'Tie.' : 'You lose.';
    } else if (playerMove === 'Rock') {
      result = computerMove === 'Rock' ? 'Tie.' :
               computerMove === 'Paper' ? 'You lose.' : 'You win!';
    }

    if (result === 'You win!') {
      score.wins++;
    } else if (result === 'You lose.') {
      score.losses++;
    } else {
      score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement(result, playerMove, computerMove);
  }

  function pickComputerMove() {
    const randomNumber = Math.random();
    return randomNumber < 1 / 3 ? 'Rock'
         : randomNumber < 2 / 3 ? 'Paper'
         : 'Scissors';
  }

  function resetScore() {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement('Score reset.', '', '');
  }

  // On first load
  updateScoreElement('Start playing!', '', '');