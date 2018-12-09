import express from 'express';

import {
    updateClientCard,
    updateTerritorialCoefficient,
} from '../../controllers/api/client_cards';
import { jwtMiddleware } from '../../middlewares/jwt';
import authMiddleware from '../../middlewares/auth';

const route = express.Route();

route.put('/client-cards/:id/',
    jwtMiddleware,
    authMiddleware.isManager,
    updateClientCard);

route.put('/client-cards/:id/coefficient',
    jwtMiddleware,
    authMiddleware.isAdmin,
    updateTerritorialCoefficient);

export default route;
