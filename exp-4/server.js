const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Student = require('./models/user');

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://jeevaa24mca_db_user:jeeva@cluster0.wlgzlrd.mongodb.net/')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');

// ROUTES

// Home page – list all students
app.get('/', async (req, res) => {
  const students = await Student.find();
  res.render('index', { students });
});

// Add student form
app.get('/add', (req, res) => {
  res.render('add');
});

// Create student (POST)
app.post('/add', async (req, res) => {
  const { name, email, age } = req.body;
  await Student.create({ name, email, age });
  res.redirect('/');
});

// Edit form
app.get('/edit/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render('edit', { student });
});

// Update student (POST)
app.post('/edit/:id', async (req, res) => {
  const { name, email, age } = req.body;
  await Student.findByIdAndUpdate(req.params.id, { name, email, age });
  res.redirect('/');
});

// Delete student
app.get('/delete/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
