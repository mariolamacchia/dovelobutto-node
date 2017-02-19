const app = require('express')();
const bodyParser = require('body-parser')

const { products, bins } = require('./db.json');
const PAGE_LENGTH = 20;

const isEmail = email => !!email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});

app.use(bodyParser.json());

app.get('/bins', (req, res) => {
  res.send({
    data: bins,
    _links: {
      self: '/bins',
    },
  });
});

app.get('/products', (req, res) => {
  const page = Number(req.query.page) || 0;
  const name = req.query.name || '';
  const first = (page || 0) * PAGE_LENGTH;
  const last = first + PAGE_LENGTH;
  const foundProducts = products.filter(v => (v.name.includes(name || '')));
  const data = foundProducts.slice(first, last);
  const links = {};

  links.self = `/products?name=${name}&page=${page}`;
  if (foundProducts.length > last) {
    links.next = `/products?name=${name}&page=${page+1}`;
  }
  if (page > 0) {
    links.prev = `/products?name=${name}&page=${page-1}`;
  }

  res.json({
    data,
    _links: links,
  });
});

app.get('/products/:name', (req, res) => {
  const { name } = req.params;
  const data = products.find(product => product.name === name);
  product ? res.json({ product }) : res.sendStatus(403);
});

app.post('/email', (req, res) => {
  res.sendStatus(isEmail(req.body.email || '') ? 201 : 422);
});

app.listen(3000);
