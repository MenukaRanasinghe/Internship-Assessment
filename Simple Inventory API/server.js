const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let items = [];
let currentId = 1;

app.post('/api/items', (req, res) => {
  const { name, quantity, price } = req.body;

  if (!name || quantity == null || price == null) {
    return res.status(400).json({ error: 'Missing required fields: name, quantity, or price.' });
  }
  if (quantity < 0) {
    return res.status(400).json({ error: 'Quantity must be >= 0.' });
  }
  if (price <= 0) {
    return res.status(400).json({ error: 'Price must be > 0.' });
  }

  const newItem = { id: currentId++, name, quantity, price };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: 'Item not found.' });
  res.json(item);
});

app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: 'Item not found.' });

  const { name, quantity, price } = req.body;

  if (!name || quantity == null || price == null) {
    return res.status(400).json({ error: 'Missing required fields: name, quantity, or price.' });
  }
  if (quantity < 0) {
    return res.status(400).json({ error: 'Quantity must be >= 0.' });
  }
  if (price <= 0) {
    return res.status(400).json({ error: 'Price must be > 0.' });
  }

  item.name = name;
  item.quantity = quantity;
  item.price = price;

  res.json(item);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Inventory API running on http://localhost:${PORT}`);
});
