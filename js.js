let primaryArray = [];
const objectsArr = [];
const tableHeader = [
  `№`,
  `Перевозка`,
  `Салон`,
  `Кат. 80`,
  `Кат. 20`,
  `Блокнот`,
  `Кружки`,
  `Упак.`,
  `Папки`,
  `Шампанское`,
  `Полотенце`,
  `Другое`,
  `Кол-во мест`,
  `Заявка`,
];
let ordersNum = 0;
let tableRowsNum = 0;

//cell generator
// const arrayForCellGen = [`num`, ];
// const createCell = (cellClass, path) => {
//   const cell = document.createElement(`div`);
//   cell.classList.add(`cell`);
//   cell.classList.add(`${cellClass}`);
//   cell.textContent = path;
//   return table.appendChild(cell);
// }
//table generatnig
const tableGenerator = () => {
  document.querySelector(`.table-block`).style.display = `flex`;
  const date = new Date();
  const month =
    date.getMonth() + 1 > 9
      ? +date.getMonth() + 1
      : "0" + (date.getMonth() + 1);
  const today = `${
    date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
  }.${month}.${date.getFullYear()}`;
  const tomorrow = `${
    date.getDate() + 1 > 9 ? date.getDate() + 1 : "0" + date.getDate() + 1
  }.${month}.${date.getFullYear()}`;
  const time = `${
    date.getHours() > 9 ? date.getHours() : "0" + date.getHours()
  }:${date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()}`;
  const tableInfo = document.querySelector(`.table-info`);
  tableInfo.innerHTML = `<div><p>Дата отгрузки: ${tomorrow}</p> <p>Дата сборки: ${today}</p> <p>Начало работы: ${time}</p></div><div><p>Заявок: ${ordersNum}</p> <p>Строк: ${tableRowsNum}</p></div>`;
  const table = document.querySelector(`.table`);
  tableHeader.forEach((el) => {
    const cell = document.createElement(`div`);
    cell.classList.add("cell");
    cell.classList.add("table-header");
    cell.textContent = el;
    table.appendChild(cell);
  });
  let number = 0;
  objectsArr.forEach((obj) => {
    obj.shops.forEach((shop) => {
      //table row number
      number += 1;
      const num = document.createElement(`div`);
      num.classList.add(`cell`);
      num.classList.add(`num`);
      num.textContent = number;
      table.appendChild(num);
      //car
      const car = document.createElement(`div`);
      car.classList.add(`cell`);
      car.classList.add(`car`);
      car.textContent = obj.car;
      table.appendChild(car);
      //shop name
      const name = document.createElement(`div`);
      name.classList.add(`cell`);
      name.classList.add(`name`);
      name.textContent = shop.name //maybe should cut off pref
      table.appendChild(name);
      //materials
      //80
      const thick = document.createElement(`div`);
      thick.classList.add(`cell`);
      thick.classList.add(`thick`);
      thick.textContent = shop.thickCatalog;
      table.appendChild(thick);
      //20
      const thin = document.createElement(`div`);
      thin.classList.add(`cell`);
      thin.classList.add(`thin`);
      thin.textContent = shop.thinCatalog;
      table.appendChild(thin);
      //notebook
      const note = document.createElement(`div`);
      note.classList.add(`cell`);
      note.classList.add(`note`);
      note.textContent = shop.notebook;
      table.appendChild(note);
      //cups
      const cup = document.createElement(`div`);
      cup.classList.add(`cell`);
      cup.classList.add(`cup`);
      cup.textContent = shop.cup;
      table.appendChild(cup);
      //pack
      const pack = document.createElement(`div`);
      pack.classList.add(`cell`);
      pack.classList.add(`pack`);
      pack.textContent = shop.pack;
      table.appendChild(pack)
      //folder
      const folder = document.createElement(`div`);
      folder.classList.add(`cell`);
      folder.classList.add(`folder`);
      folder.textContent = shop.folder;
      table.appendChild(folder);
      //vine
      const vine = document.createElement(`div`);
      vine.classList.add(`cell`);
      vine.classList.add(`vine`);
      vine.textContent = shop.vine;
      table.appendChild(vine);
      //towel
      const towel = document.createElement(`div`);
      towel.classList.add(`cell`);
      towel.classList.add(`towel`);
      towel.textContent = shop.towel;
      table.appendChild(towel);
      //other
      const other = document.createElement(`div`);
      other.classList.add(`cell`);
      other.classList.add(`other`);
      other.textContent = ``;
      shop.otherMats.forEach(mat => {
        other.textContent += `${mat[0]} - ${mat[1]}`;
      })
      table.appendChild(other);
      //number of boxes
      const boxes = document.createElement(`div`);
      boxes.classList.add(`cell`);
      boxes.classList.add(`boxes`);
      boxes.textContent = ``;
      table.appendChild(boxes);
      //orders
      const orders = document.createElement(`div`);
      orders.classList.add(`cell`);
      orders.classList.add(`orders`);
      orders.textContent = ``;
      shop.orders.forEach(order => orders.textContent += order);
      table.appendChild(orders)
    });
  });
};

//upload file
document.getElementById("file").onchange = function () {
  const carIndexes = [];
  let file = this.files[0];
  let reader = new FileReader();
  reader.onload = function (progressEvent) {
    let primary = this.result.split("\n");
    primaryArray = Array.from(primary);
    primary.forEach((el, i) => {
      if (el.match(/\w+\s\d+/g) || el.includes(`Наемная машина`))
        carIndexes.push(i);
    });
    const cars = [];
    for (let i = 0; i < carIndexes.length; i += 1) {
      const temp = primary.slice(carIndexes[i], carIndexes[i + 1]);
      cars.push(temp);
    }
    cars[cars.length - 1].pop();
    cars.forEach((arr) => {
      const obj = {};
      obj.car = arr[0];
      obj.shops = [];
      let shopIndexes = [];
      arr.forEach((str, i) => {
        if (str.includes(`_`)) shopIndexes.push(i);
      });
      const shops = [];
      for (let i = 0; i < shopIndexes.length; i += 1) {
        const temp = arr.slice(shopIndexes[i], shopIndexes[i + 1]);
        shops.push(temp);
      }
      shops.forEach((shop) => {
        tableRowsNum += 1;
        const sub = {};
        sub.name = shop[0];
        const orders = [];
        const materials = [];
        shop.forEach((str) => {
          str = str.split('"').join("");
          str.includes(`Рекламация`)
            ? orders.push(str.split(" ")[1])
            : str === sub.name
            ? null
            : materials.push(str.split(";"));
        });
        sub.orders = orders;
        sub.materials = materials;
        obj.shops.push(sub);
        ordersNum += orders.length;
      });
      
      obj.shops.forEach(shop => {
        shop.otherMats = [];
        shop.materials.forEach(mat => {
          if (mat[0].includes(`80 полос`)) mat[0].includes(`(48 часов)`) ? shop.thickCatalog = `${mat[1]} МСК` : shop.thickCatalog = `${mat[1]} РЕГ`;
          if (mat[0].includes(`20 полос`)) mat[0].includes(`(48 часов)`) ? shop.thinCatalog = `${mat[1]} МСК` : shop.thinCatalog = `${mat[1]} РЕГ`;
          if (mat[0].includes(`Блокнот`)) shop.notebook = mat[1];
          if (mat[0].includes(`Кружка белая с логотипом`)) shop.cup = mat[1];
          if (mat[0].includes(`Упаковка для кружки (мал.)`)) shop.pack = mat[1];
          if (mat[0].includes(`Папка картонная`)) shop.folder = mat[1];
          if (mat[0].includes(`Шампанское`)) shop.vine = mat[1];
          if (mat[0].includes(`Полотенце с логотипом в тубусе`)) shop.towel = mat[1];
          shop.otherMats.push(mat[1]);
        });
      });
      objectsArr.push(obj);
    });
    tableGenerator();
  };
  reader.readAsText(file, "windows-1251");
};
