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
refreshDisplays();

candy.addEventListener('click', () => {
  candyScore++;
  refreshDisplays();
});

function refreshDisplays() {
  score.innerHTML = candyScore;
  localStorage.setItem('candyScore', candyScore);
  localStorage.setItem('scorePerSecond', scorePerSecond);
}

function addUpgrade(index, quantityRequested) {
  if (quantityRequested == undefined) quantityRequested = Infinity;

  for (let i = 0; i < quantityRequested; i++) {
    if (candyScore < upgrades[index].price) break;

    scorePerSecond += upgrades[index].sps;
    upgrades[index].quantity += 1;
    candyScore -= upgrades[index].price;
    upgrades[index].price = Math.round(upgrades[index].price * 1.5);
  }

  refreshDisplays();
}

setInterval(() => {
  candyScore += scorePerSecond;
  refreshDisplays();
}, 1000);