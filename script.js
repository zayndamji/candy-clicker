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
  localStorage.setItem('upgrades', JSON.stringify(upgrades));

  for (let i = 0; i < upgrades.length; i++) {
    document.getElementById('price' + i).textContent = upgrades[i].price;
    document.getElementById('quantity' + i).textContent = upgrades[i].quantity;
  }
}

function addUpgrade(index, quantityRequested) {
  if (quantityRequested == undefined) quantityRequested = Infinity;

  for (let i = 0; i < quantityRequested; i++) {
    if (candyScore < upgrades[index].price) break;

    upgrades[index].quantity += 1;
    candyScore -= upgrades[index].price;
    upgrades[index].price = Math.floor(upgrades[index].price * 1.2);
  }

  refreshDisplays();
}

setInterval(() => {
  candyScore += getCandiesPerSecond();
  refreshDisplays();
}, 1000);

document.getElementById('reset').addEventListener('click', () => {
  candyScore = 0;

  for (let i = 0; i < upgrades.length; i++) {
    upgrades[i].price = upgrades[i].originalPrice;
    upgrades[i].quantity = 0;
  }

  refreshDisplays();
});

function getCandiesPerSecond() {
  let cps = 0;
  for (const upgrade of upgrades) {
    cps += upgrade.quantity * upgrade.cps;
  }
  return cps;
}