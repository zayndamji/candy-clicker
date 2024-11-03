const upgrades = [
  {
    name: "Child",
    price: 10,
    quantity: 0,
    cps: 1
  }
]

let candyScore = parseInt(localStorage.getItem('candyScore')) || 0;
let candiesPerSecond = parseInt(localStorage.getItem('candiesPerSecond')) || 0;
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
  localStorage.setItem('candiesPerSecond', candiesPerSecond);
}

function addUpgrade(index, quantityRequested) {
  if (quantityRequested == undefined) quantityRequested = Infinity;

  for (let i = 0; i < quantityRequested; i++) {
    if (candyScore < upgrades[index].price) break;

    candiesPerSecond += upgrades[index].cps;
    upgrades[index].quantity += 1;
    candyScore -= upgrades[index].price;
    upgrades[index].price = Math.round(upgrades[index].price * 1.5);
  }

  refreshDisplays();
}

setInterval(() => {
  candyScore += candiesPerSecond;
  refreshDisplays();
}, 1000);