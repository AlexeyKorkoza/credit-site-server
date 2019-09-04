import { Router } from 'express';

import { managers } from '../../controllers';
import { authMiddleware, jwtMiddleware } from '../../middlewares';

const router = Router();

router.get('/managers',
    jwtMiddleware,
    authMiddleware.isAdmin,
    managers.getManagersData);

router.get('/managers/:id',
    jwtMiddleware,
    authMiddleware.isManagerOrAdmin,
    managers.getManagerData);

router.get('/managers/:id/clients',
    jwtMiddleware,
    authMiddleware.isManager,
    managers.getManagerClients);

router.post('/managers',
    jwtMiddleware,
    authMiddleware.isAdmin,
    managers.createNewManager);

router.put('/managers/:id',
    jwtMiddleware,
    authMiddleware.isManager,
    managers.updateAttributesManager);

router.put('/managers/:id/update-profile',
    jwtMiddleware,
    authMiddleware.isAdmin,
    managers.updateProfileManager);

router.put('/managers/:id/change-password',
    jwtMiddleware,
    authMiddleware.isManagerOrAdmin,
    managers.changePassword);

router.put('/managers/:id/block-manager',
    jwtMiddleware,
    authMiddleware.isAdmin,
    managers.blockManager);

export default router;
