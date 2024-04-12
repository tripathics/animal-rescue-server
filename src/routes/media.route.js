import { Router } from 'express';
import { getPostImg, getAvatar } from '../controllers/media.controller.js';

const router = Router();

router.get('/post-media/:filename', getPostImg);
router.get('/avatars/:filename', getAvatar);

export default router;
