import express from 'express';

import { createUser } from '../../controllers/api/users';
import { jwtMiddleware } from '../../middlewares/jwt';
import authMiddleware from '../../middlewares/auth';

const route = express.Router();

route.post('/users',
    jwtMiddleware,
    authMiddleware.isAdmin,
    createUser);

export default route;
