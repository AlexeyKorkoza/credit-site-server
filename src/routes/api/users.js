import { Router } from 'express';

import { users } from '../../controllers';
import { authMiddleware, jwtMiddleware } from '../../middlewares';
import validator from '../../validator';

const router = Router();

router.post('/users',
    jwtMiddleware,
    authMiddleware.isAdmin,
    validator.newUser,
    users.createUser);

export default router;
