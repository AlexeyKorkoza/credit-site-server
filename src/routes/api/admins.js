import { Router } from 'express';

import { admins } from '../../controllers';
import { authMiddleware, jwtMiddleware } from '../../middlewares';
import validators from '../../validator';

const route = Router();

route.get('/admins/:id',
    jwtMiddleware,
    authMiddleware.isAdmin,
    admins.getAdminData);

route.put('/admins/:id',
    jwtMiddleware,
    authMiddleware.isAdmin,
    admins.updateAdminData);

route.put('/admins/:id/change-password',
    jwtMiddleware,
    authMiddleware.isAdmin,
    validators.changePassword,
    admins.changeAdminPassword);

export default route;
