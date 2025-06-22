require('dotenv').config({path: '../../.env.common'});
require('dotenv').config({path: './.env'});
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PORT = process.env.USER_SERVER_PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

const app = express();
app.use(express.json());

const users = new Map();

app.get('/', (req, res) => {
  res.send('User server is running');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.has(username)) return res.status(400).json({ error: 'User already exists' });
  const hasedPassword = bcrypt.hashSync(password, 10);
  users.set(username, hasedPassword);
  console.log(users);
  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.get(username);
  if (!user || !bcrypt.compareSync(password, user)) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`User server is running on port ${PORT}`);
});