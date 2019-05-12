import { Router } from 'express';

import {
    getAdminData,
    updateAdminData,
} from '../../controllers/api/admins';
import { jwtMiddleware } from '../../middlewares/jwt';
import authMiddleware from '../../middlewares/auth';

const route = Router();

route.get('/admins/:id',
    jwtMiddleware,
    authMiddleware.isAdmin,
    getAdminData);

route.put('/admins/:id',
    jwtMiddleware,
    authMiddleware.isAdmin,
    updateAdminData);

export default route;
