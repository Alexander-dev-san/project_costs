let allBuys = [];
let valueInputShop = '';
let valueInputPrice = '';
let valueNum = 0;
let inputShop = null;
let inputPrice = null;

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

onClickAdd = () => {
  valueNum += 1 
  allBuys.push({
    numShop: valueNum,
    shopName: valueInputShop,
    shopDate: '12.02.2021',
    shopPrice: valueInputPrice
  });

  render();
}

let render = () => {
  const content = document.getElementById('content-page');
  while(content.firstChild) {
    content.removeChild(content.firstChild);
  }

  allBuys.map((item, index) => {
    const block = document.createElement('div');
    block.id = `tasks-${index}`;
    block.className = 'content-page_block';

    const shopNumBlock = document.createElement('div');
    shopNumBlock.className = 'block-shopNum';
    const shopNum = document.createElement('span');
    shopNum.innerText = item.numShop;
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
    textBlock.appendChild(shopDateVal);
    block.appendChild(textBlock);

    const priceBlock = document.createElement('div');
    priceBlock.className = 'block-price';
    const shopPrice = document.createElement('p');
    shopPrice.innerText = `${item.shopPrice} p`;
    priceBlock.appendChild(shopPrice);
    block.appendChild(priceBlock);

    const blockImg = document.createElement('div');
    blockImg.className = 'block-imgs';
    const button1 = document.createElement('button');
    const img1 = document.createElement('img');
    img1.src = 'img/edit.svg';
    img1.alt = 'edit';
    button1.appendChild(img1);
    const button2 = document.createElement('button');
    const img2 = document.createElement('img');
    img2.src = 'img/delete.svg';
    img2.alt = 'edit';
    button2.appendChild(img2);
    blockImg.appendChild(button1);
    blockImg.appendChild(button2);
    block.appendChild(blockImg);

    content.appendChild(block);
    console.log(content);
  });
}

