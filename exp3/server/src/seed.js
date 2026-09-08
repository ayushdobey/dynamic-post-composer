import 'dotenv/config';
import { connectDatabase } from './config/db.js';
import User from './models/User.js';

try {
  await connectDatabase();
  const email = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
  const existing = await User.findOne({ email });
  if (existing) console.log('Admin already exists:', email);
  else {
    await User.create({ name: process.env.ADMIN_NAME || 'Lab Admin', email, password: process.env.ADMIN_PASSWORD || 'Admin@123', role: 'admin' });
    console.log('Admin created:', email);
  }
} catch (error) { console.error('Seed failed:', error.message); process.exitCode = 1; }
finally { await (await import('mongoose')).default.disconnect(); }
