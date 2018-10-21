import express from 'express';

import {
    updateLoan,
    updateIssueLoan,
} from '../../controllers/api/loans';

const route = express.Route();

route.put('/loans/:id', updateLoan);
route.put('/loans/:id/issue', updateIssueLoan);

export default route;
