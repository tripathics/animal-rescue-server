import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import {
  login, register, logout,
  checkEmailNotExists, readUser, checkEmailExists, updatePassword,
} from '../controllers/user.controller.js';
import { generate } from '../controllers/otp.controller.js';

const router = Router();

router.get('/u', authenticate, readUser);
router.post('/register-otp-gen', checkEmailNotExists, generate);
router.post('/auth-otp-gen', checkEmailExists, generate);
router.post('/update-password', updatePassword);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
