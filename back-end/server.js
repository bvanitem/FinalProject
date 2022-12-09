const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

let products = [];
let id = 0;

app.get('/api/products', (req, res) => {
    console.log("In get");
    res.send(products);
});

app.get('/api/products/:id', (req, res) => {
    console.log("In get by id");
    let id = parseInt(req.params.id);
    let index = products.map(product => {
        return product.id;
      })
      .indexOf(id);
    if (index === -1) {
      res.status(404)
        .send("Sorry, that product doesn't exist");
      return;
    };
    res.send(products[index]);
});

app.post('/api/products', (req, res) => {
    console.log("In post");
    id = id + 1;
    let product = {
        id: id,
        name: req.body.name,
        price: req.body.price,
        image: req.body.image
    };
    products.push(product);
    res.send(product);
});

app.delete('/api/products/:id', (req, res) => {
  console.log("In delete");
  let id = parseInt(req.params.id);
  let removeIndex = products.map(product => {
      return product.id;
    })
    .indexOf(id);
  if (removeIndex === -1) {
    res.status(404)
      .send("Sorry, that product doesn't exist");
    return;
  }
  products.splice(removeIndex, 1);
  res.sendStatus(200);
});

let items = [];

app.get('/api/cart', (req, res) => {
    console.log("In get");
    res.send(items);
});

app.post('/api/cart/:id', (req, res) => {
  console.log("In post");
  let id = parseInt(req.params.id);
  let item = {
      id: id,
      quantity: 1
    };
  const foundItem = items.find(item => item.id == id)
  if (foundItem) {
    foundItem.quantity +=1
    item = foundItem;
  }
  else {
    items.push(item);
  }
  res.send(item);
});

app.put('/api/cart/:id/:quantity', (req, res) => {
  console.log("In put");
  let id = parseInt(req.params.id);
  let quantity = parseInt(req.params.quantity);
  const foundItem = items.find(item => item.id == id)
  if (!foundItem){
    res.sendStatus(404);
    return;
  }
  
  foundItem.quantity = quantity;
  if (foundItem.quantity <=0){
    items = items.filter((item) => item.id != id);
  }
  res.send(foundItem);
});

app.delete('/api/cart/:id', (req, res) => {
  console.log("In delete");
  let id = parseInt(req.params.id);
  let removeIndex = items.map(item => {
      return item.id;
    })
    .indexOf(id);
  if (removeIndex === -1) {
    res.status(404)
      .send("Sorry, that product doesn't exist");
    return;
  }
  items.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));