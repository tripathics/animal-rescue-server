import { Router } from 'express';
import { authenticate, authenticateOrg } from '../middlewares/authenticate.middleware.js';
import { createPost, getPosts } from '../controllers/post.controller.js';
import { uploadPostPictures } from '../middlewares/media.middleware.js';

const router = Router();

router.post('/create', authenticateOrg, uploadPostPictures, createPost);
router.get('/', getPosts);

export default router;
