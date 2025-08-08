import { compare, hash } from 'bcrypt';
import { Router } from 'express';
import { JWT_SECRET, JWT_EXPIRATION } from './config.js';
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import { AuthUserRepository } from '../../db/repositories/auth-user.repository.js';
import { UserProfileRepository } from '../../db/repositories/user-profile.repository.js';

const routes = Router();

routes.post('/signup', async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;
    console.log('🔐 Sign-up request:', { username, email, firstName, lastName });

    if (!username || !password || !email || !firstName || !lastName) return res.status(400).json({ error: 'All fields are required' });
    if (await AuthUserRepository.userExistsAsync(username)) return res.status(400).json({ error: 'User already exists' });
    if (await AuthUserRepository.emailExistsAsync(email)) return res.status(400).json({ error: 'Email already registered' });

    const hashedPassword = await hash(password, 10);
    const userId = await AuthUserRepository.createUserAsync({ username, email, hashedPassword });
    // need to call user service to create user profile
    await UserProfileRepository.createProfileAsync({ userId , firstName, lastName });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('❌ Error during sign-up:', error);
    res.status(500).json({ error: 'Internal SERVICE error' });
  }
});

routes.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const user = await AuthUserRepository.findUserByEmailAsync(email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { userId, username, hashedPassword } = user;
    
    const isPasswordValid = await compare(password, hashedPassword);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = sign({ userId, username }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    res.json({ token });
  } catch (error) {
    console.error('❌ Error during login:', error);
    res.status(500).json({ error: 'Internal SERVICE error' });
  }
});

export default routes;
