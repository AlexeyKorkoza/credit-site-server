import { Router } from 'express';

import {
    updateClientCard,
    updateTerritorialCoefficient,
} from '../../controllers/api/client_cards';
import { jwtMiddleware } from '../../middlewares/jwt';
import authMiddleware from '../../middlewares/auth';

const router = Router();

router.put('/client-cards/:id/',
    jwtMiddleware,
    authMiddleware.isManager,
    updateClientCard);

router.put('/client-cards/:id/coefficient',
    jwtMiddleware,
    authMiddleware.isAdmin,
    updateTerritorialCoefficient);

export default router;
