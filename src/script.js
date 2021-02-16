let allBuys = JSON.parse(localStorage.getItem('costs')) || [];
let valueInputShop = '';
let valueInputPrice = 0;
let valueNum = 0;
let inputShop = null;
let inputPrice = null;
let sumValue = 0;
let dateNow = new Date().toJSON().slice(0,10).replace(/-/g,'-');
let chekEdite = false;

window.onload = async function addElement() {
  inputShop = document.getElementById('info-shop');
  inputPrice = document.getElementById('info-price');
  inputShop.addEventListener('change', updateValueShop);
  inputPrice.addEventListener('change', updateValuePrice);

  const resp = await fetch('http://localhost:8000/allCosts', {
    method: 'GET'
  });

  let result = await resp.json();
  allBuys = result.data ? result.data : [];
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

onClickAdd = async () => {
  if (valueInputShop) {
    const resp = await fetch('http://localhost:8000/createCost', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        shopName: valueInputShop,
        shopDate: dateNow,
        shopPrice: valueInputPrice
      })
    });

    let result = await resp.json();
    allBuys = result.data ? result.data : [];

    inputShop.value = '';
    inputPrice.value = '';
    valueInputShop = '';

    render();

  } else {
    alert("Введите название Магазина!!!");
  }
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
  sumValue = 0;
  allBuys.forEach((item, index) => {
    sumValue = sumValue + Number(item.shopPrice);
  });
  sumText.innerText = `Итого: ${sumValue} р`;
  sumText.className = 'animated rubberBand'
  blockSum.appendChild(sumText);

  chekEdite = false;

  allBuys.map( (item, index) => {
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
    let dateText = new Date(Date.parse(item.shopDate));
    shopDateVal.innerText = dateText.toLocaleDateString('ru-RU');
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
      if(chekEdite === false){
        onchange(item, index, shopName, shopDateVal, shopPrice, myShopName, buttonEdt, buttonDel);
        chekEdite = true
      } else {
        render();
      }
    }

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
    shopDateInput.value = dateNow;
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

    btnSaveEdite.onclick = async () => {
      item.shopName = shopNameInput.value;
      item.shopDate = shopDateInput.value;
      item.shopPrice = shopPriceInput.value;

      const resp = await fetch('http://localhost:8000/changeCost', {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          _id: allBuys[index]._id,
          shopName: shopNameInput.value,
          shopDate: shopDateInput.value,
          shopPrice: shopPriceInput.value
        })
      });

      let result = await resp.json();
      allBuys = result.data;
      render();

    }
    
    btnBackEdite.onclick = () => {
      render();
    }
  
}

btnBack = () => {
  
}

onDeleteContainer = async (index) => {
  const resp = await fetch(`http://localhost:8000/deleteCost?id=${allBuys[index]._id}`, {
    method: 'DELETE'
  });

  let result = await resp.json();
  allBuys = result.data;
  render();
}