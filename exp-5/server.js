const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware


// ✅ Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

const DATA_FILE = path.join(__dirname, 'todos.json');

// ✅ Route to get todos
app.get('/todos', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) return res.json([]);
    res.json(JSON.parse(data || '[]'));
  });
});

// ✅ Route to save todos
app.post('/todos', (req, res) => {
  const todos = req.body.todos || req.body;
  fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), err => {
    if (err) return res.json({ success: false });
    res.json({ success: true });
  });
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
