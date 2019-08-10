import { Router } from 'express';

import {
    getAdminData,
    updateAdminData,
    changeAdminPassword,
} from '../../controllers/api/admins';
import { jwtMiddleware } from '../../middlewares/jwt';
import authMiddleware from '../../middlewares/auth';
import validators from '../../validator';

const route = Router();

route.get('/admins/:id',
    jwtMiddleware,
    authMiddleware.isAdmin,
    getAdminData);

route.put('/admins/:id',
    jwtMiddleware,
    authMiddleware.isAdmin,
    updateAdminData);

route.put('/admins/:id/change-password',
    jwtMiddleware,
    authMiddleware.isAdmin,
    validators.changePassword,
    changeAdminPassword);

export default route;
