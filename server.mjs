import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs/promises';

const app = express();
const PORT = 3001;
const DATA_FILE = './src/data/data.json';

app.use(cors());
app.use(bodyParser.json());

// Get all data
app.get('/api/data', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    res.json(JSON.parse(data));
      res.send('Galaxica API is running!');

  } catch (err) {
    res.status(500).json({ error: 'Failed to read data.' });
  }
});

// Add new item
app.post('/api/data', async (req, res) => {
  try {
    const newItem = req.body;
    const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
    data.push(newItem);
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item.' });
  }
});

// Update item
app.put('/api/data/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updatedItem = req.body;
    const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
    const idx = data.findIndex(item => item.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Item not found.' });
    data[idx] = { ...data[idx], ...updatedItem };
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    res.json(data[idx]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item.' });
  }
});

// Delete item
app.delete('/api/data/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    let data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
    data = data.filter(item => item.id !== id);
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item.' });
  }
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});