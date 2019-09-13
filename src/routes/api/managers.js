import { Router } from 'express';

import { managers } from '../../controllers';
import { authMiddleware, verifyJwtToken } from '../../middlewares';

const router = Router();

router.get('/managers',
    verifyJwtToken,
    authMiddleware.isAdmin,
    managers.getManagersData);

router.get('/managers/:id',
    verifyJwtToken,
    authMiddleware.isManagerOrAdmin,
    managers.getManagerData);

router.get('/managers/:id/clients',
    verifyJwtToken,
    authMiddleware.isManager,
    managers.getManagerClients);

router.post('/managers',
    verifyJwtToken,
    authMiddleware.isAdmin,
    managers.createNewManager);

router.put('/managers/:id',
    verifyJwtToken,
    authMiddleware.isManager,
    managers.updateAttributesManager);

router.put('/managers/:id/update-profile',
    verifyJwtToken,
    authMiddleware.isAdmin,
    managers.updateProfileManager);

router.put('/managers/:id/change-password',
    verifyJwtToken,
    authMiddleware.isManagerOrAdmin,
    managers.changePassword);

router.put('/managers/:id/block-manager',
    verifyJwtToken,
    authMiddleware.isAdmin,
    managers.blockManager);

export default router;
