"use strict";

var allBuys = JSON.parse(localStorage.getItem('costs')) || [];
var valueInputShop = '';
var valueInputPrice = 0;
var valueNum = 0;
var inputShop = null;
var inputPrice = null;
var sumValue = 0;
var dateNow = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
var chekEdite = false;

window.onload = function addElement() {
  var resp, result;
  return regeneratorRuntime.async(function addElement$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          inputShop = document.getElementById('info-shop');
          inputPrice = document.getElementById('info-price');
          inputShop.addEventListener('change', updateValueShop);
          inputPrice.addEventListener('change', updateValuePrice);
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch('http://localhost:8000/allCosts', {
            method: 'GET'
          }));

        case 6:
          resp = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(resp.json());

        case 9:
          result = _context.sent;
          allBuys = result.data ? result.data : [];
          render();

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
};

updateValueShop = function updateValueShop(event) {
  valueInputShop = event.target.value;
};

updateValuePrice = function updateValuePrice(event) {
  valueInputPrice = event.target.value;
};

function sizeCost() {
  var size = document.getElementById("info-price").value;
  var textSize = document.getElementById("size");
  textSize.innerText = "".concat(size, " \u0440");
}

onClickAdd = function onClickAdd() {
  var resp, result;
  return regeneratorRuntime.async(function onClickAdd$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!valueInputShop) {
            _context2.next = 14;
            break;
          }

          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch('http://localhost:8000/createCost', {
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
          }));

        case 3:
          resp = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(resp.json());

        case 6:
          result = _context2.sent;
          allBuys = result.data ? result.data : [];
          inputShop.value = '';
          inputPrice.value = '';
          valueInputShop = '';
          render();
          _context2.next = 15;
          break;

        case 14:
          alert("Введите название Магазина!!!");

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var render = function render() {
  var content = document.getElementById('content-page');

  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  var blockSum = document.getElementById('sum');

  while (blockSum.firstChild) {
    blockSum.removeChild(blockSum.firstChild);
  }

  var sumText = document.createElement('p');
  sumValue = 0;
  allBuys.forEach(function (item, index) {
    sumValue = sumValue + Number(item.shopPrice);
  });
  sumText.innerText = "\u0418\u0442\u043E\u0433\u043E: ".concat(sumValue, " \u0440");
  sumText.className = 'animated rubberBand';
  blockSum.appendChild(sumText);
  chekEdite = false;
  allBuys.map(function (item, index) {
    var block = document.createElement('div');
    block.id = "tasks-".concat(index);
    block.className = 'content-page_block animated bounce';
    var shopNumBlock = document.createElement('div');
    shopNumBlock.className = 'block-shopNum';
    var shopNum = document.createElement('span');
    shopNum.innerText = index + 1;
    var shopText = document.createElement('p');
    shopText.innerText = 'ПОКУПКА';
    shopNumBlock.appendChild(shopNum);
    shopNumBlock.appendChild(shopText);
    block.appendChild(shopNumBlock);
    var textBlock = document.createElement('div');
    textBlock.className = 'block-text';
    var shopName = document.createElement('p');
    shopName.className = 'block-text_name';
    shopName.innerText = 'Магазин: ';
    var myShopName = document.createElement('span');
    myShopName.innerText = item.shopName;
    shopName.appendChild(myShopName);
    var shopDate = document.createElement('p');
    shopDate.className = 'block-text_date';
    shopDate.innerText = 'Дата: ';
    var shopDateVal = document.createElement('span');
    var dateText = new Date(Date.parse(item.shopDate));
    shopDateVal.innerText = dateText.toLocaleDateString('ru-RU');
    shopDate.appendChild(shopDateVal);
    textBlock.appendChild(shopName);
    textBlock.appendChild(shopDate);
    block.appendChild(textBlock);
    var priceBlock = document.createElement('div');
    priceBlock.className = 'block-price';
    var shopPrice = document.createElement('p');
    shopPrice.innerText = "".concat(item.shopPrice, " p");
    var shopPriceText = document.createElement('p');
    shopPriceText.id = 'sizeEdite';
    priceBlock.appendChild(shopPrice);
    block.appendChild(priceBlock);
    var blockImg = document.createElement('div');
    blockImg.className = 'block-imgs';
    var buttonEdt = document.createElement('button');
    buttonEdt.id = 'buttoneEdt';
    var img1 = document.createElement('img');
    img1.src = 'img/edit.svg';
    img1.alt = 'edit';
    buttonEdt.appendChild(img1);
    blockImg.appendChild(buttonEdt);

    buttonEdt.onclick = function () {
      if (chekEdite === false) {
        onchange(item, index, shopName, shopDateVal, shopPrice, myShopName, buttonEdt, buttonDel);
        chekEdite = true;
      } else {
        render();
      }
    };

    var buttonDel = document.createElement('button');
    var img2 = document.createElement('img');
    img2.src = 'img/delete.svg';
    img2.alt = 'edit';

    buttonDel.onclick = function () {
      onDeleteContainer(index);
    };

    buttonDel.appendChild(img2);
    blockImg.appendChild(buttonDel);
    block.appendChild(blockImg);
    content.appendChild(block);
  });
};

onchange = function onchange(item, index, shopName, shopDateVal, shopPrice, myShopName, buttonEdt, buttonDel) {
  var shopNameInput = document.createElement("input");
  var shopDateInput = document.createElement("input");
  var shopPriceInput = document.createElement("input");
  var btnSaveEdite = document.createElement('button');
  var btnBackEdite = document.createElement('button');
  var imgSaveEdite = document.createElement('img');
  var imgBackEdite = document.createElement('img');
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

  btnSaveEdite.onclick = function _callee() {
    var resp, result;
    return regeneratorRuntime.async(function _callee$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            item.shopName = shopNameInput.value;
            item.shopDate = shopDateInput.value;
            item.shopPrice = shopPriceInput.value;
            _context3.next = 5;
            return regeneratorRuntime.awrap(fetch('http://localhost:8000/changeCost', {
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
            }));

          case 5:
            resp = _context3.sent;
            _context3.next = 8;
            return regeneratorRuntime.awrap(resp.json());

          case 8:
            result = _context3.sent;
            allBuys = result.data;
            render();

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    });
  };

  btnBackEdite.onclick = function () {
    render();
  };
};

btnBack = function btnBack() {};

onDeleteContainer = function onDeleteContainer(index) {
  var resp, result;
  return regeneratorRuntime.async(function onDeleteContainer$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(fetch("http://localhost:8000/deleteCost?id=".concat(allBuys[index]._id), {
            method: 'DELETE'
          }));

        case 2:
          resp = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(resp.json());

        case 5:
          result = _context4.sent;
          allBuys = result.data;
          render();

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
};