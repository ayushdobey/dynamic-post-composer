import { Router } from 'express';
import { allowRoles, protect } from '../middleware/authMiddleware.js';

const router = Router();
router.get('/user/dashboard', protect, allowRoles('user', 'admin'), (req, res) => {
  res.json({ message: `Welcome ${req.user.name}! This is a protected user resource.`, access: 'user-and-admin' });
});
router.get('/admin/dashboard', protect, allowRoles('admin'), (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.name}! You can manage users and system settings.`, access: 'admin-only' });
});
export default router;
