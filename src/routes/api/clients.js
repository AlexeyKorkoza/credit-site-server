import { Router } from 'express';

import {
    addClient,
    editClient,
    markDeletionClient,
    removeClient,
} from '../../controllers/api/clients';
import { jwtMiddleware } from '../../middlewares/jwt';
import authMiddleware from '../../middlewares/auth';

const router = Router();

router.post('/clients',
    jwtMiddleware,
    authMiddleware.isManager,
    addClient);

router.put('/clients/:id',
    jwtMiddleware,
    authMiddleware.isManagerOrAdmin,
    editClient);

router.put('/clients/:id/deletion',
    jwtMiddleware,
    authMiddleware.isManager,
    markDeletionClient);

router.delete('/clients/:id',
    jwtMiddleware,
    authMiddleware.isAdmin,
    removeClient);

export default router;
