import multer from 'multer';
import storage, { MAX_AVATAR_SIZE, MAX_POST_SIZE } from '../config/storage.config.js';

export const updateAvatarFile = multer({
  storage,
  limits: { fileSize: MAX_AVATAR_SIZE }, // 2MB
}).single('avatar');

export const uploadPostPictures = multer({
  storage,
  limits: { fileSize: MAX_POST_SIZE }, // 2MB
}).single('pictures'); // Allow up to 10 files
