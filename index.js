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

app.get('/products', (req, res) => {
  res.json({
    data: products
      .filter(p => p.name.includes(req.query.name || ''))
      .slice(0, 10)
      .map(p => Object.assign({}, p, {
        bin: bins.find(b => b.id === p.bin),
      }))
  });
});

app.post('/products', (req, res) => {
  if (
    (req.body.email && isEmail(req.body.email)) &&
    (typeof req.body.name === 'string' && req.body.name.trim() !== '')
  ) {
    res.sendStatus(200);
  } else {
    res.sendStatus(422);
  }
});

app.listen(3000);
