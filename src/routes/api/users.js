import { Router } from 'express';

import { createUser } from '../../controllers/api/users';
import { jwtMiddleware } from '../../middlewares/jwt';
import authMiddleware from '../../middlewares/auth';
import validator from '../../validator';

const router = Router();

router.post('/users',
    jwtMiddleware,
    authMiddleware.isAdmin,
    validator.newUser,
    createUser);

export default router;
