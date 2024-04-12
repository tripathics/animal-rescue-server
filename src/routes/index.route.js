import { Router } from 'express';
import userRoute from './user.route.js';
import otpRoute from './otp.route.js';
import mediaRoute from './media.route.js';
import postRoute from './post.route.js';
import orgsRoute from './orgs.route.js';

const router = Router();

router.use('/api/users', userRoute);
router.use('/api/orgs', orgsRoute);
router.use('/api/otp', otpRoute);
router.use('/api/posts', postRoute);
router.use('/media', mediaRoute)

export default router;
