import { compare, hash } from 'bcrypt';
import { Router } from 'express';
import { JWT_SECRET, JWT_EXPIRATION } from './config.js';
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import { findUserByUsernameAsync, userExistsAsync, createUserAsync } from '../../db/models/user.model.js';

const routes = Router();

routes.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });

    if (await userExistsAsync(username)) return res.status(400).json({ error: 'User already exists' });
    
    const hashedPassword = await hash(password, 10);
    await createUserAsync(username, hashedPassword);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal SERVICE error' });
  }
});

routes.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });
    
    const user = await findUserByUsernameAsync(username);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: 'Internal SERVICE error' });
  }
});

export default routes;
