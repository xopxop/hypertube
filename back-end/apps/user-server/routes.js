import { hashSync, compareSync } from 'bcrypt';
import { Router } from 'express';
import { JWT_SECRET, JWT_EXPIRATION } from './config.js';
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import { findUserByUsernameAsync, userExistsAsync, createUserAsync } from './user.model.js';

const routes = Router();

routes.get('/', (_, res) => {
  res.send('User server is running');
});

routes.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (await userExistsAsync(username)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const hasedPassword = hashSync(password, 10);
  await createUserAsync(username, hasedPassword);
  res.status(201).json({ message: 'User registered successfully' });
});

routes.post('/login', async(req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsernameAsync(username);
  if (!user || !compareSync(password, user.password)) return res.status(401).json({ error: 'Invalid credentials' });
  const token = sign({ username }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  res.json({ token });
});

export default routes;
