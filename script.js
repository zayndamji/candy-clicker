const upgrades = localStorage.getItem('upgrades') ? JSON.parse(localStorage.getItem('upgrades')) : [
  {
    name: "Child",
    originalPrice: 10,
    price: 10,
    quantity: 0,
    cps: 1
  },
  {
    name: "Parent",
    originalPrice: 250,
    price: 250,
    quantity: 0,
    cps: 5
  }
]

let candyScore = localStorage.getItem('candyScore') ? parseInt(localStorage.getItem('candyScore')) : 0;

refreshDisplays();

document.getElementById('candy').addEventListener('click', () => {
  candyScore++;
  refreshDisplays();
});

function refreshDisplays() {
  document.getElementById('score').textContent = candyScore;
  document.getElementById('cps').textContent = getCandiesPerSecond();
  
  localStorage.setItem('candyScore', candyScore);
  localStorage.setItem('upgrades', JSON.stringify(upgrades));

  for (let i = 0; i < upgrades.length; i++) {
    document.getElementById('price' + i).textContent = upgrades[i].price;
    document.getElementById('quantity' + i).textContent = upgrades[i].quantity;

    let maxQuantityPurchasable = 0;
    while (true) {
      if (Math.floor(upgrades[i].price * Math.pow(1.2, maxQuantityPurchasable)) <= candyScore) {
        maxQuantityPurchasable += 1;
      } else {
        break;
      }
    }

    console.log(maxQuantityPurchasable);

    if (maxQuantityPurchasable < 1) {
      document.getElementById('buy1button' + i).disabled = true;
      document.getElementById('buy1button' + i).classList.add('button-invalid');
      document.getElementById('buy1button' + i).classList.remove('button-valid');

      document.getElementById('buymaxbutton' + i).disabled = true;
      document.getElementById('buymaxbutton' + i).classList.add('button-invalid');
      document.getElementById('buymaxbutton' + i).classList.remove('button-valid');
    } else {
      document.getElementById('buy1button' + i).disabled = false;
      document.getElementById('buy1button' + i).classList.remove('button-invalid');
      document.getElementById('buy1button' + i).classList.add('button-valid');

      document.getElementById('buymaxbutton' + i).disabled = false;
      document.getElementById('buymaxbutton' + i).classList.remove('button-invalid');
      document.getElementById('buymaxbutton' + i).classList.add('button-valid');
    }

    if (maxQuantityPurchasable < 10) {
      document.getElementById('buy10button' + i).disabled = true;
      document.getElementById('buy10button' + i).classList.add('button-invalid');
      document.getElementById('buy10button' + i).classList.remove('button-valid');
    } else {
      document.getElementById('buy10button' + i).disabled = false;
      document.getElementById('buy10button' + i).classList.remove('button-invalid');
      document.getElementById('buy10button' + i).classList.add('button-valid');
    }
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
  localStorage.clear();
  location.reload(true);
});

function getCandiesPerSecond() {
  let cps = 0;
  for (const upgrade of upgrades) {
    cps += upgrade.quantity * upgrade.cps;
  }
  return cps;
}