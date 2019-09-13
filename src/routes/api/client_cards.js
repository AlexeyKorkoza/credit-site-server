import { Router } from 'express';

import { client_cards } from '../../controllers';
import { authMiddleware, verifyJwtToken } from '../../middlewares';

const router = Router();

router.post('/clients-cards',
    verifyJwtToken,
    authMiddleware.isManager,
    client_cards.createClientCard);

router.put('/client-cards/:id/',
    verifyJwtToken,
    authMiddleware.isManager,
    client_cards.updateClientCard);

router.put('/client-cards/:id/coefficient',
    verifyJwtToken,
    authMiddleware.isAdmin,
    client_cards.updateTerritorialCoefficient);

export default router;
