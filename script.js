let candyScore = localStorage.getItem('candyScore') || 0;
const candy = document.getElementById('candy');
const score = document.getElementById('score');
setScore();

candy.addEventListener('click', () => {
  candyScore++;
  setScore();
});

function setScore() {
  score.innerHTML = candyScore;
  localStorage.setItem('candyScore', candyScore);
}