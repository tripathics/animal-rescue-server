import { Router } from 'express';
import { authenticate, authenticateOrg } from '../middlewares/authenticate.middleware.js';
import { createPost, getPosts, getDonationPosts, getPostById } from '../controllers/post.controller.js';
import { uploadPostPictures } from '../middlewares/media.middleware.js';

const router = Router();

router.post('/create', authenticateOrg, uploadPostPictures, createPost);
router.get('/', getPosts);
router.get('/donations', getDonationPosts);
router.get('/:id', getPostById);

export default router;
