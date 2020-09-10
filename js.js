let primaryArray = [];
const carIndexes = [];
const shopIndexes = [];
const orderIndexes = [];
const objectsArr = [];

//creating objects by cars
const cteatingObjects = () => {
  for (let i = 0; i < primaryArray.length; i += 1) {
    if (carIndexes.includes(i)) obj.car = primaryArray[i];
    if (shopIndexes.includes(i)) obj.shops = [primaryArray[i]];

  }
}


//upload file
document.getElementById("file").onchange = function () {
  let file = this.files[0];
  let reader = new FileReader();
  reader.onload = function (progressEvent) {
    let primary = this.result.split("\n");
    primaryArray = Array.from(primary);
    // console.log(primary.filter(el => el.match(/\w+\s\d+/g) || el.includes(`Наемная машина`)));
    primary.forEach((el, i) => {
      if (el.match(/\w+\s\d+/g) || el.includes(`Наемная машина`)) carIndexes.push(i);
      if (el.includes(`_`)) shopIndexes.push(i);
      if (el.includes(`Рекламация`)) orderIndexes.push(i);
    }); 

  };
  reader.readAsText(file, "windows-1251");
};
