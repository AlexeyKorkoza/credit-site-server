import express from 'express';

import {
    addClient,
    editClient,
    markDeletionClient,
    removeClient,
} from '../../controllers/api/clients';
import { jwtMiddleware } from '../../middlewares/jwt';
import authMiddleware from '../../middlewares/auth';

const route = express.Route();

route.post('/clients',
    jwtMiddleware,
    authMiddleware.isManager,
    addClient);

route.put('/clients/:id', editClient);

route.put('/clients/:id/deletion',
    jwtMiddleware,
    authMiddleware.isManager,
    markDeletionClient);

route.delete('/clients/:id', removeClient);

export default route;
