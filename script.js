const moves = ['rock', 'paper', 'scissors'];
const symbols = { rock: '✊', paper: '✋', scissors: '✌️' };
const beats = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
const scores = { wins: 0, ties: 0, losses: 0 };
let round = 1;

const $ = (id) => document.getElementById(id);
const label = (move) => move[0].toUpperCase() + move.slice(1);

function play(player) {
  const computer = moves[Math.floor(Math.random() * moves.length)];
  $('player-hand').textContent = symbols[player];
  $('computer-hand').textContent = symbols[computer];
  $('player-hand').classList.add('active');
  $('computer-hand').classList.add('active');
  $('player-name').textContent = label(player);
  $('computer-name').textContent = label(computer);

  if (player === computer) {
    scores.ties++;
    $('result').textContent = "It's a draw. Go again?";
  } else if (beats[player] === computer) {
    scores.wins++;
    $('result').textContent = 'Nice one. You win!';
  } else {
    scores.losses++;
    $('result').textContent = 'Computer wins this round.';
  }

  for (const key of Object.keys(scores)) {
    $(key).textContent = String(scores[key]).padStart(2, '0');
  }
  round++;
  $('round-label').textContent = `ROUND ${String(round).padStart(2, '0')}`;
}

document.querySelectorAll('[data-choice]').forEach((button) => {
  button.addEventListener('click', () => play(button.dataset.choice));
});

$('reset').addEventListener('click', () => {
  for (const key of Object.keys(scores)) {
    scores[key] = 0;
    $(key).textContent = '00';
  }
  round = 1;
  $('round-label').textContent = 'ROUND 01';
  $('player-hand').textContent = '?';
  $('computer-hand').textContent = '?';
  $('player-hand').classList.remove('active');
  $('computer-hand').classList.remove('active');
  $('player-name').textContent = 'Waiting for you';
  $('computer-name').textContent = 'Keeping it secret';
  $('result').textContent = 'Your move. Your rules.';
});
