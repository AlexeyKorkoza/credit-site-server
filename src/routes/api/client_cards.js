import { Router } from 'express';

import { client_cards } from '../../controllers';
import { authMiddleware, jwtMiddleware } from '../../middlewares';

const router = Router();

router.post('/clients-cards',
    jwtMiddleware,
    authMiddleware.isManager,
    client_cards.createClientCard);

router.put('/client-cards/:id/',
    jwtMiddleware,
    authMiddleware.isManager,
    client_cards.updateClientCard);

router.put('/client-cards/:id/coefficient',
    jwtMiddleware,
    authMiddleware.isAdmin,
    client_cards.updateTerritorialCoefficient);

export default router;
