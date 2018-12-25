import { Router } from 'express';

import { createUser } from '../../controllers/api/users';
import { jwtMiddleware } from '../../middlewares/jwt';
import authMiddleware from '../../middlewares/auth';

const router = Router();

router.post('/users',
    jwtMiddleware,
    authMiddleware.isAdmin,
    createUser);

export default router;
