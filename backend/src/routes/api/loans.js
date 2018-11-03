import express from 'express';

import {
    createLoan,
    updateLoan,
    updateIssueLoan,
} from '../../controllers/api/loans';

const route = express.Route();

route.post('/loans', createLoan);
route.put('/loans/:id', updateLoan);
route.put('/loans/:id/issue', updateIssueLoan);

export default route;
