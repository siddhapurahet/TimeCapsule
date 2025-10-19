import express from 'express';
import { signin, signup, getOnlineUsers, updateUserActivity, logout } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/online', getOnlineUsers);
router.post('/activity', updateUserActivity);
router.post('/logout', logout);

export default router;