import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import {
  login, register, logout,
  checkEmailNotExists, readUser, checkEmailExists, updatePassword,
  updateProfile, updateAvatar
} from '../controllers/user.controller.js';
import { updateAvatarFile } from '../middlewares/media.middleware.js';
import { generate } from '../controllers/otp.controller.js';

const router = Router();

router.get('/u', authenticate, readUser);
router.post('/register-otp-gen', checkEmailNotExists, generate);
router.post('/auth-otp-gen', checkEmailExists, generate);
router.post('/update-password', updatePassword);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.post('/update-profile', authenticate, updateProfile);
router.patch('/update-avatar', authenticate, updateAvatarFile, updateAvatar);


export default router;
