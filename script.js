let candyScore = 0;
const candy = document.getElementById('candy');
const score = document.getElementById('score');

candy.addEventListener('click', () => {
  candyScore++;
  score.innerHTML = candyScore;
});