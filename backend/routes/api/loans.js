import express from 'express';

import {
    updateLoan,
} from '../../controllers/api/loans';

const route = express.Route();

route.put('/loans/:id', updateLoan);

export default route;
