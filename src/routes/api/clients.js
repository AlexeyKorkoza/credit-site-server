import { Router } from 'express';

import { clients } from '../../controllers';
import { authMiddleware, verifyJwtToken } from '../../middlewares';

const router = Router();

router.get('/clients',
    verifyJwtToken,
    authMiddleware.isAdmin,
    clients.getAllClients,
);

router.get('/clients/:id',
    verifyJwtToken,
    authMiddleware.isManagerOrAdmin,
    clients.getClient,
);

router.get('/clients/:id/loans',
    verifyJwtToken,
    authMiddleware.isManager,
    clients.getClientLoans);

router.post('/clients',
    verifyJwtToken,
    authMiddleware.isManager,
    clients.addClient);

router.put('/clients/:id',
    verifyJwtToken,
    authMiddleware.isManagerOrAdmin,
    clients.editClient);

router.put('/clients/:id/deletion',
    verifyJwtToken,
    authMiddleware.isManager,
    clients.markDeletionClient);

router.delete('/clients/:id',
    verifyJwtToken,
    authMiddleware.isAdmin,
    clients.removeClient);

export default router;
