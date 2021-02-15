let allBuys = [];
let valueInputShop = '';
let valueInputPrice = 5000;
let valueNum = 0;
let inputShop = null;
let inputPrice = null;
let sumValue = 0;
let dateNow = new Date().toJSON().slice(0,10).replace(/-/g,'/');

window.onload = async function addElement() {
  inputShop = document.getElementById('info-shop');
  inputPrice = document.getElementById('info-price');

  inputShop.addEventListener('change', updateValueShop);
  inputPrice.addEventListener('change', updateValuePrice);
  render();
}

updateValueShop = (event) => {
  valueInputShop = event.target.value;
}
updateValuePrice = (event) => {
  valueInputPrice = event.target.value;
}

function sizeCost() {
  let size = document.getElementById("info-price").value;
  let textSize = document.getElementById("size");
  textSize.innerText = `${size} р`;
}

function sizeCostEdite() {
  let size = document.getElementById("shopPriceInputId").value;
  let textSize = document.getElementById("sizeEdite");
  textSize.innerText = `${size} р`;
}

onClickAdd = () => {
  allBuys.push({
    shopName: valueInputShop,
    shopDate: dateNow,
    shopPrice: valueInputPrice
  });

  render();
}

let render = () => {
  const content = document.getElementById('content-page');
  while(content.firstChild) {
    content.removeChild(content.firstChild);
  }
  const blockSum = document.getElementById('sum');
  while(blockSum.firstChild) {
    blockSum.removeChild(blockSum.firstChild);
  }
  const sumText = document.createElement('p');
  sumValue = 0
  allBuys.forEach((item, index) => {
    sumValue = sumValue + Number(item.shopPrice);
  });
  sumText.innerText = `Итого: ${sumValue}`;
  sumText.className = 'animated rubberBand'
  blockSum.appendChild(sumText);

  allBuys.map((item, index) => {
    const block = document.createElement('div');
    block.id = `tasks-${index}`;
    block.className = 'content-page_block animated bounce';


    const shopNumBlock = document.createElement('div');
    shopNumBlock.className = 'block-shopNum';
    const shopNum = document.createElement('span');
    shopNum.innerText = index + 1;
    const shopText = document.createElement('p');
    shopText.innerText = 'ПОКУПКА';
    shopNumBlock.appendChild(shopNum);
    shopNumBlock.appendChild(shopText);
    block.appendChild(shopNumBlock);

    const textBlock = document.createElement('div');
    textBlock.className = 'block-text';
    const shopName = document.createElement('p');
    shopName.className = 'block-text_name';
    shopName.innerText = 'Магазин: ';
    const myShopName = document.createElement('span');
    myShopName.innerText = item.shopName;
    shopName.appendChild(myShopName);
    const shopDate = document.createElement('p');
    shopDate.className = 'block-text_date';
    shopDate.innerText = 'Дата: ';
    const shopDateVal = document.createElement('span');
    shopDateVal.innerText = item.shopDate;
    shopDate.appendChild(shopDateVal);
    textBlock.appendChild(shopName);
    textBlock.appendChild(shopDate);
    block.appendChild(textBlock);

    const priceBlock = document.createElement('div');
    priceBlock.className = 'block-price';
    const shopPrice = document.createElement('p');
    shopPrice.innerText = `${item.shopPrice} p`;
    let shopPriceText = document.createElement('p');
    shopPriceText.id = 'sizeEdite';
    priceBlock.appendChild(shopPrice);
    block.appendChild(priceBlock);

    const blockImg = document.createElement('div');
    blockImg.className = 'block-imgs';
    const buttonEdt = document.createElement('button');
    buttonEdt.id = 'buttoneEdt';
    const img1 = document.createElement('img');
    img1.src = 'img/edit.svg';
    img1.alt = 'edit';
    buttonEdt.appendChild(img1);
    blockImg.appendChild(buttonEdt);
    buttonEdt.onclick = () => {
      onchange(item, index, shopName, shopDateVal, shopPrice, myShopName, buttonEdt, buttonDel);
    };
    const buttonDel = document.createElement('button');
    const img2 = document.createElement('img');
    img2.src = 'img/delete.svg';
    img2.alt = 'edit';
    buttonDel.onclick = () => {
      onDeleteContainer(index);
    };
    buttonDel.appendChild(img2);
    blockImg.appendChild(buttonDel);
    block.appendChild(blockImg);

    content.appendChild(block);
  });
}

onchange = (item, index, shopName, shopDateVal, shopPrice, myShopName, buttonEdt, buttonDel) => {
  let shopNameInput = document.createElement(`input`);
  let shopDateInput = document.createElement(`input`);
  let shopPriceInput = document.createElement(`input`);
  const btnSaveEdite = document.createElement('button');
  const btnBackEdite = document.createElement('button');
  let imgSaveEdite = document.createElement('img');
  let imgBackEdite = document.createElement('img');

  imgSaveEdite.src = 'img/done.svg';
  imgSaveEdite.alt = 'edit';
  btnSaveEdite.appendChild(imgSaveEdite);

  imgBackEdite.src = 'img/shopping-cart.svg';
  imgBackEdite.alt = 'editBack';
  btnBackEdite.appendChild(imgBackEdite);

  shopNameInput.value = item.shopName;
  shopDateInput.value = item.shopDate;
  shopPriceInput.value = item.shopPrice;

  shopNameInput.className = 'inputEdite';
  shopDateInput.className = 'inputEdite';
  shopPriceInput.className = 'inputEdite';

  shopNameInput.maxLength = '20';
  shopDateInput.type = 'date'; 
  shopPriceInput.type = 'number';

  myShopName.replaceWith(shopNameInput);
  shopDateVal.replaceWith(shopDateInput);
  shopPrice.replaceWith(shopPriceInput);
  buttonEdt.replaceWith(btnSaveEdite);
  buttonDel.replaceWith(btnBackEdite);

  btnSaveEdite.onclick = () => {
    item.shopName = shopNameInput.value;
    item.shopDate = shopDateInput.value;
    item.shopPrice = shopPriceInput.value;

    render();
  }

  btnBackEdite.onclick = () => {
    render();
  }
}

onDeleteContainer = async (index) => {
  delete allBuys[index];
  render();
}

