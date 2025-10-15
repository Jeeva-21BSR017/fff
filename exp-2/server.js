const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 300;

// Set Handlebars as the view engine
app.set('view engine', 'hbs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Route: Display form
app.get('/', (req, res) => {
  res.render('form');
});

// Route: Handle form submission
app.post('/submit', (req, res) => {
  const formData = req.body;

  // Save data to JSON file
  fs.writeFileSync('data.json', JSON.stringify(formData, null, 2));

  // Redirect to display page
  res.redirect('/display');
});

// Route: Display data using Handlebars
app.get('/display', (req, res) => {
  if (fs.existsSync('data.json')) {
    const data = JSON.parse(fs.readFileSync('data.json'));
    res.render('display', { data });
  } else {
    res.send('No data found.');
  }
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
