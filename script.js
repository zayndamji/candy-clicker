const upgrades = localStorage.getItem('upgrades') ? JSON.parse(localStorage.getItem('upgrades')) : [
  {
    name: "Child",
    description: "A child will run from house to house, gathering 1 candy per second.",
    originalPrice: 10,
    price: 10,
    quantity: 0,
    cps: 1
  },
  {
    name: "Parent",
    description: "A parent will buy you candy when you ask, gathering 5 candy per second.",
    originalPrice: 250,
    price: 250,
    quantity: 0,
    cps: 5
  }
]

let candyScore = localStorage.getItem('candyScore') ? parseInt(localStorage.getItem('candyScore')) : 0;

generateUpgrades();
refreshDisplays();

document.getElementById('candy').addEventListener('click', () => {
  candyScore++;
  refreshDisplays();
});

function generateUpgrades() {
  for (let i = 0; i < upgrades.length; i++) {
    const upgrade = document.createElement('div');
    upgrade.classList.add('upgrade');

    const contents = document.createElement('div');
    contents.classList.add('contents');

    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = upgrades[i].name + ' (' + upgrades[i].cps + ' CPS)';

    const description = document.createElement('div');
    description.classList.add('description');
    description.textContent = upgrades[i].description;

    const price = document.createElement('div');
    price.classList.add('price');
    const priceChild = document.createElement('span');
    priceChild.id = 'price' + i;
    price.append('Price: ', priceChild, ' Candies');

    const quantity = document.createElement('div');
    quantity.classList.add('quantity');
    const quantityChild = document.createElement('span');
    quantityChild.id = 'quantity' + i;
    quantity.append('Quantity Owned: ', quantityChild, ' Parents');

    contents.append(title, document.createElement('div'), description, document.createElement('div'), price, quantity);

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    const buy1 = document.createElement('button');
    buy1.onclick = () => { addUpgrade(i, 1); };
    buy1.classList.add('button', 'button-invalid');
    buy1.id = 'buy1button' + i;
    buy1.disabled = true;
    buy1.textContent = 'Buy 1';

    const buy10 = document.createElement('button');
    buy10.onclick = () => { addUpgrade(i, 10); };
    buy10.classList.add('button', 'button-invalid');
    buy10.id = 'buy10button' + i;
    buy10.disabled = true;
    buy10.textContent = 'Buy 10';

    const buyMax = document.createElement('button');
    buyMax.onclick = () => { addUpgrade(i); };
    buyMax.classList.add('button', 'button-invalid');
    buyMax.id = 'buymaxbutton' + i;
    buyMax.disabled = true;
    buyMax.textContent = 'Buy Max';

    buttons.append(buy1, buy10, buyMax);

    upgrade.append(contents, buttons);

    document.getElementById('upgradesParent').append(upgrade);
  }
}

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