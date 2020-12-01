const username = document.querySelector('#username');
const saveScoreButton = document.querySelector('#saveScoreButton');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScore = JSON.parse(localStorage.getItem('highScore')) || [];

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
  saveScoreButton.disabled = !username.value;
});

function saveHighScore(e) {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  highScore.push(score);

  highScore.sort((a, b) => b.score - a.score);

  highScore.splice(5);

  localStorage.setItem('highScore', JSON.stringify(highScore));
  window.location.assign('/');
}
