import express from 'express';

import {
    updateClientCard,
    updateTerritorialCoefficient,
} from '../../controllers/api/client_cards';

const route = express.Route();

route.put('/client-cards/:id/', updateClientCard);
route.put('/client-cards/:id/coefficient', updateTerritorialCoefficient);

export default route;
