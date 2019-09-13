import { Router } from 'express';

import { admins } from '../../controllers';
import { authMiddleware, verifyJwtToken } from '../../middlewares';
import validators from '../../validator';

const route = Router();

route.get('/admins/:id',
    verifyJwtToken,
    authMiddleware.isAdmin,
    admins.getAdminData);

route.put('/admins/:id',
    verifyJwtToken,
    authMiddleware.isAdmin,
    admins.updateAdminData);

route.put('/admins/:id/change-password',
    verifyJwtToken,
    authMiddleware.isAdmin,
    validators.changePassword,
    admins.changeAdminPassword);

export default route;
