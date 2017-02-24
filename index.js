const app = require('express')();
const bodyParser = require('body-parser')

const { products, bins } = require('./db.json');
const PAGE_LENGTH = 10;

const isEmail = email => !!email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

// Set necessary headers.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');

  next();
});

app.use(bodyParser.json());

// Define routes for application.
app.get('/products', (req, res) => {
  let found = products.find(p => p.name === req.query.name);

  if (found) {
    found = Object.assign({}, found, {
      bin: bins.find(b => b.id === found.bin),
    });
  } else {
    found = { name: req.query.name, bin: null };
  }

  const rest = products
    .filter(p => (
        p.name.includes(req.query.name || '') && p.name !== req.query.name
    ))
    .slice(0, PAGE_LENGTH - 1)
    .map(p => Object.assign({}, p, {
      bin: bins.find(b => b.id === p.bin),
    }));

  res.json({
    data: [found, ...rest],
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

app.listen(process.env.PORT || 3000);
