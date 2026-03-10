const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = process.env.DATA_DIR || './data';

// Создаём директорию для данных если её нет
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// API Endpoints

// Получить все сохранённые бункеры
app.get('/api/bunkers', (req, res) => {
  try {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
    const bunkers = files.map(file => {
      const content = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
      const data = JSON.parse(content);
      return {
        id: file.replace('.json', ''),
        name: data.name,
        created: data.created,
        itemCount: data.items.length
      };
    });
    res.json(bunkers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Создать новый бункер
app.post('/api/bunkers', (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const id = crypto.randomBytes(8).toString('hex');
    const bunker = {
      id,
      name,
      created: new Date().toISOString(),
      items: [],
      password: crypto.randomBytes(16).toString('hex')
    };

    fs.writeFileSync(path.join(DATA_DIR, `${id}.json`), JSON.stringify(bunker, null, 2));
    res.json(bunker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получить конкретный бункер
app.get('/api/bunkers/:id', (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, `${req.params.id}.json`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Bunker not found' });
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const bunker = JSON.parse(content);
    // Не отправляем пароль на фронтенд
    delete bunker.password;
    res.json(bunker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Добавить элемент в бункер
app.post('/api/bunkers/:id/items', (req, res) => {
  try {
    const { label, value } = req.body;
    if (!label || !value) {
      return res.status(400).json({ error: 'Label and value are required' });
    }

    const filePath = path.join(DATA_DIR, `${req.params.id}.json`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Bunker not found' });
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const bunker = JSON.parse(content);

    const item = {
      id: crypto.randomBytes(4).toString('hex'),
      label,
      value: crypto.createHash('sha256').update(value).digest('hex'), // хешируем значение
      created: new Date().toISOString(),
      revealed: false
    };

    bunker.items.push(item);
    fs.writeFileSync(filePath, JSON.stringify(bunker, null, 2));

    res.json({ id: item.id, label, created: item.created });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удалить элемент из бункера
app.delete('/api/bunkers/:id/items/:itemId', (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, `${req.params.id}.json`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Bunker not found' });
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const bunker = JSON.parse(content);
    bunker.items = bunker.items.filter(item => item.id !== req.params.itemId);
    fs.writeFileSync(filePath, JSON.stringify(bunker, null, 2));

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удалить бункер
app.delete('/api/bunkers/:id', (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, `${req.params.id}.json`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Bunker not found' });
    }

    fs.unlinkSync(filePath);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Bunkr Storage Server запущен на http://localhost:${PORT}`);
  console.log(`📁 Данные сохраняются в: ${path.resolve(DATA_DIR)}`);
});
