import multer from 'multer';
import storage, { MAX_AVATAR_SIZE, MAX_POST_SIZE } from '../config/storage.config.js';

export const updateAvatarFile = multer({
  storage,
  limits: { fileSize: MAX_AVATAR_SIZE }, // 2MB
}).single('avatar');

export const uploadPostPictures = multer({
  storage,
  limits: { fileSize: MAX_POST_SIZE }, // 2MB
}).array('pictures', 5); // Allow up to 5 files
