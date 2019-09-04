import { Router } from 'express';

import { clients } from '../../controllers';
import { authMiddleware, jwtMiddleware } from '../../middlewares';

const router = Router();

router.get('/clients',
    jwtMiddleware,
    authMiddleware.isAdmin,
    clients.getAllClients,
);

router.get('/clients/:id',
    jwtMiddleware,
    authMiddleware.isManagerOrAdmin,
    clients.getClient,
);

router.get('/clients/:id/loans',
    jwtMiddleware,
    authMiddleware.isManager,
    clients.getClientLoans);

router.post('/clients',
    jwtMiddleware,
    authMiddleware.isManager,
    clients.addClient);

router.put('/clients/:id',
    jwtMiddleware,
    authMiddleware.isManagerOrAdmin,
    clients.editClient);

router.put('/clients/:id/deletion',
    jwtMiddleware,
    authMiddleware.isManager,
    clients.markDeletionClient);

router.delete('/clients/:id',
    jwtMiddleware,
    authMiddleware.isAdmin,
    clients.removeClient);

export default router;
