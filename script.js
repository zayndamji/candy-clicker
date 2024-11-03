const upgrades = localStorage.getItem('upgrades') ? JSON.parse(localStorage.getItem('upgrades')) : [
  {
    name: "Child",
    originalPrice: 10,
    price: 10,
    quantity: 0,
    cps: 1
  }
]

let candyScore = localStorage.getItem('candyScore') ? parseInt(localStorage.getItem('candyScore')) : 0;
let candiesPerSecond = localStorage.getItem('candiesPerSecond') ? parseInt(localStorage.getItem('candiesPerSecond')) : 0;

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
  localStorage.setItem('upgrades', JSON.stringify(upgrades));

  for (let i = 0; i < upgrades.length; i++) {
    document.getElementById('price' + i).textContent = upgrades[i].price;
  }
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

document.getElementById('reset').addEventListener('click', () => {
  candyScore = 0;
  candiesPerSecond = 0;

  for (let i = 0; i < upgrades.length; i++) {
    upgrades[i].price = upgrades[i].originalPrice;
    upgrades[i].quantity = 0;
  }

  refreshDisplays();
});