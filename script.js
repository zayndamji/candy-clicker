const upgrades = [
  {
    name: "Child",
    price: 10,
    quantity: 0,
    sps: 1
  }
]

let candyScore = parseInt(localStorage.getItem('candyScore')) || 0;
let scorePerSecond = parseInt(localStorage.getItem('scorePerSecond')) || 0;
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
  localStorage.setItem('scorePerSecond', scorePerSecond);
}

function addUpgrade(index, quantityRequested) {
  const { price, quantity, sps } = upgrades[index];

  if (price * quantityRequested > candyScore) return;

  scorePerSecond += quantityRequested * sps;
  candyScore -= price * quantityRequested;
  setScore();
}

setInterval(() => {
  candyScore += scorePerSecond;
  setScore();
}, 1000);