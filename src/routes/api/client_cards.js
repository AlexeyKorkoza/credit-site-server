import { Router } from 'express';

import {
    createClientCard,
    updateClientCard,
    updateTerritorialCoefficient,
} from '../../controllers/api/client_cards';
import { jwtMiddleware } from '../../middlewares/jwt';
import authMiddleware from '../../middlewares/auth';

const router = Router();

router.post('/clients-cards',
    jwtMiddleware,
    authMiddleware.isManager,
    createClientCard);

router.put('/client-cards/:id/',
    jwtMiddleware,
    authMiddleware.isManager,
    updateClientCard);

router.put('/client-cards/:id/coefficient',
    jwtMiddleware,
    authMiddleware.isAdmin,
    updateTerritorialCoefficient);

export default router;
