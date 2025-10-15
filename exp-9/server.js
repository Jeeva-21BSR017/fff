const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// ✅ Serve files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// API: Get questions by topic
app.get('/questions/:topic', (req, res) => {
  const topic = req.params.topic;
  const data = JSON.parse(fs.readFileSync('questions.json'));
  res.json(data[topic] || []);
});

// API: Submit answers
app.post('/submit', (req, res) => {
  const { topic, answers } = req.body;
  const data = JSON.parse(fs.readFileSync('questions.json'));
  const questions = data[topic] || [];
  let score = 0;

  questions.forEach((q, i) => {
    if (answers[i] === q.answer) score++;
  });

  res.json({ score, total: questions.length });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
