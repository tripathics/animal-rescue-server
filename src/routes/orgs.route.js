import { Router } from 'express';
import { getOrgs, getNearbyOrgs, submitRescueRequest } from '../controllers/orgs.controller.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';

const router = Router();

router.get('/', getOrgs);
router.get('/nearby', getNearbyOrgs);
router.post('/rescue', authenticate, submitRescueRequest);


export default router;
