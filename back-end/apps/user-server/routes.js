import { hashSync, compareSync } from 'bcrypt';
import { Router } from 'express';
import { JWT_SECRET, JWT_EXPIRATION } from './config.js';
import jwt from 'jsonwebtoken';
const { sign } = jwt;

const routes = Router();
const users = new Map();

routes.get('/', (_, res) => {
  res.send('User server is running');
});

routes.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.has(username)) return res.status(400).json({ error: 'User already exists' });
  const hasedPassword = hashSync(password, 10);
  users.set(username, hasedPassword);
  res.status(201).json({ message: 'User registered successfully' });
});

routes.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.get(username);
  if (!user || !compareSync(password, user)) return res.status(401).json({ error: 'Invalid credentials' });
  const token = sign({ username }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  res.json({ token });
});

export default routes;
