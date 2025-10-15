const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Connect MongoDB
mongoose.connect('mongodb+srv://jeevaa24mca_db_user:jeeva@cluster0.wlgzlrd.mongodb.net/')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log(err));

// User Schema
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String
}));

// Routes

// Sign Up
app.get('/signup', (req, res) => res.render('signup'));
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (await User.findOne({ username })) return res.send('Username exists!');
  const hash = await bcrypt.hash(password, 10);
  await User.create({ username, password: hash });
  res.redirect('/login');
});

// Login
app.get('/login', (req, res) => res.render('login'));
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.send('Invalid login!');
  if (!(await bcrypt.compare(password, user.password))) return res.send('Invalid login!');
  res.cookie('username', username, { httpOnly: true });
  res.redirect('/dashboard');
});

// Dashboard
app.get('/dashboard', (req, res) => {
  if (!req.cookies.username) return res.redirect('/login');
  res.render('dashboard', { username: req.cookies.username });
});

// Logout
app.get('/logout', (req, res) => {
  res.clearCookie('username');
  res.redirect('/login');
});

// Default route
app.get('/', (req, res) => res.redirect('/login'));

// Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
