import { Router } from 'express';

import { users } from '../../controllers';
import { authMiddleware, verifyJwtToken } from '../../middlewares';
import validator from '../../validator';

const router = Router();

router.post('/users',
    verifyJwtToken,
    authMiddleware.isAdmin,
    validator.newUser,
    users.createUser);

export default router;
