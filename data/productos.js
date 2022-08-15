const data = [];
let id = 0;

const list = () => {
  return data;
};

const findOne = (id) => {
  return data.find((product) => product.id === id);
};

const add = (title, price, thumbnail) => {
  const product = { id: ++id, title, price, thumbnail };
  data.push(product);
  return product;
};

const findAllMatch = (title) => {
  const newArr = data.filter((product) => product.title === title);
  return newArr;
};

const remove = (id) => {
  data.forEach((product, i) => {
    if (product.id === id) data.splice(i, 1);
  });
};

const update = ({id}, newProduct) => {
  const data = findOne(parseInt(id));
    data.title = newProduct.title;
    data.price = newProduct.price;
    data.thumbnail = newProduct.thumbnail;
};

module.exports = { list, findOne, add, findAllMatch, remove, update };