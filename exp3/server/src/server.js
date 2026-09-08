import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { connectDatabase } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) throw new Error('JWT_SECRET must be set to at least 32 characters in server/.env');
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'JWT RBAC API is running.' }));
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use((req, res) => res.status(404).json({ message: 'Route not found.' }));
app.use((error, req, res, next) => { console.error(error); res.status(500).json({ message: 'Something went wrong on the server.' }); });

connectDatabase().then(() => app.listen(process.env.PORT || 5000, () => console.log(`API running on port ${process.env.PORT || 5000}`))).catch((error) => { console.error('Database connection failed:', error.message); process.exit(1); });
