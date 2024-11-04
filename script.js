document.getElementById('reset').addEventListener('click', () => {
  localStorage.clear();
  location.reload(true);
});

const upgrades = localStorage.getItem('upgrades') ? JSON.parse(localStorage.getItem('upgrades')) : [
  {
    name: "Child",
    pluralName: "Children",
    description: "A child will run from house to house to get you candy.",
    originalPrice: 10,
    price: 10,
    quantity: 0,
    cps: 1
  },
  {
    name: "Parent",
    pluralName: "Parents",
    description: "A parent will go the store and buy you as much candy as you want.",
    originalPrice: 250,
    price: 250,
    quantity: 0,
    cps: 5
  },
  {
    name: "Class",
    pluralName: "Classes",
    description: "All the children in your classroom will give you candy.",
    originalPrice: 6250,
    price: 6250,
    quantity: 0,
    cps: 25
  },
  {
    name: "School",
    pluralName: "Schools",
    description: "The children, parents, and teachers of the school will gather candy for you.",
    originalPrice: 6250,
    price: 6250,
    quantity: 0,
    cps: 125
  },
  {
    name: "State",
    pluralName: "States",
    description: "The entire state will sell its bonds to give you candy.",
    originalPrice: 156250,
    price: 156250,
    quantity: 0,
    cps: 600
  },
  {
    name: "Country",
    pluralName: "Countries",
    description: "The government will increase the national debt to give you candy.",
    originalPrice: 3906250,
    price: 3906250,
    quantity: 0,
    cps: 3000
  },
  {
    name: "World",
    pluralName: "Worlds",
    description: "The government will increase the national debt to give you candy.",
    originalPrice: 97656250,
    price: 97656250,
    quantity: 0,
    cps: 15000
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
    quantity.append('Quantity Owned: ', quantityChild, ' ' + upgrades[i].pluralName);

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

function getCandiesPerSecond() {
  let cps = 0;
  for (const upgrade of upgrades) {
    cps += upgrade.quantity * upgrade.cps;
  }
  return cps;
}