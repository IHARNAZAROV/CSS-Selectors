const highScoreList = document.querySelector('#highScoreList');
const highScore = JSON.parse(localStorage.getItem('highScore')) || [];

highScoreList.innerHTML = highScore.map((score) => `<li class="high-score">${score.name} - ${score.score} points </li>`).join('');
