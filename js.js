let primaryArray = [];
const carIndexes = [];
// const shopIndexes = [];
// const orderIndexes = [];
// const objectsArr = [];

//upload file
document.getElementById("file").onchange = function () {
  let file = this.files[0];
  let reader = new FileReader();
  reader.onload = function (progressEvent) {
    let primary = this.result.split("\n");
    primaryArray = Array.from(primary);
    // console.log(primary.filter(el => el.match(/\w+\s\d+/g) || el.includes(`Наемная машина`)));
    primary.forEach((el, i) => {
      if (el.match(/\w+\s\d+/g) || el.includes(`Наемная машина`))
        carIndexes.push(i);
      // if (el.includes(`_`)) shopIndexes.push(i);
      // if (el.includes(`Рекламация`)) orderIndexes.push(i);
    });
    const cars = [];
    for (let i = 0; i < carIndexes.length; i += 1) {
      const temp = primary.slice(carIndexes[i], carIndexes[i + 1]);
      cars.push(temp);
      // console.log(temp)
    }
    // console.log(cars);
    cars[cars.length - 1].pop();
    cars.forEach(arr => {
      arr.forEach((str, i) => {
        const obj = {};
        obj.shops = [];
        const subArr = str.split(';');
        // if (subArr[1].length === 1) subArr.pop();
        const titleContent = subArr[0];
        if (i === 0) obj.car = titleContent;
        if (titleContent.includes(`_`)) obj.shops.push({titleContent: {orders: [], materials: []}});
        // if (titleContent.includes(`Рекламация`)) obj.shops.titleContent.orders.push(titleContent)
        console.log(obj)
      })
    });
    // console.log()
  };
  reader.readAsText(file, "windows-1251");
};
