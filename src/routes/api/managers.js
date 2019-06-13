import { Router } from 'express';

import {
    createNewManager,
    updateAttributesManager,
    updateProfileManager,
    changePassword,
    blockManager,
    getManagerData,
    getManagersData,
} from '../../controllers/api/managers';
import { jwtMiddleware } from '../../middlewares/jwt';
import authMiddleware from '../../middlewares/auth';

const router = Router();

router.get('/managers',
    jwtMiddleware,
    authMiddleware.isAdmin,
    getManagersData);

router.get('/managers/:id',
    jwtMiddleware,
    authMiddleware.isManagerOrAdmin,
    getManagerData);

router.post('/managers',
    jwtMiddleware,
    authMiddleware.isAdmin,
    createNewManager);

router.put('/managers/:id',
    jwtMiddleware,
    authMiddleware.isManager,
    updateAttributesManager);

router.put('/managers/:id/update-profile',
    jwtMiddleware,
    authMiddleware.isAdmin,
    updateProfileManager);

router.put('/managers/:id/change-password',
    jwtMiddleware,
    authMiddleware.isManagerOrAdmin,
    changePassword);

router.put('/managers/:id/block-manager',
    jwtMiddleware,
    authMiddleware.isAdmin,
    blockManager);

export default router;
