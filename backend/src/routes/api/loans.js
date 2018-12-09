import express from 'express';

import {
    createLoan,
    updateLoan,
    updateIssueLoan,
} from '../../controllers/api/loans';
import { jwtMiddleware } from '../../middlewares/jwt';
import authMiddleware from '../../middlewares/auth';

const route = express.Route();

route.post('/loans',
    jwtMiddleware,
    authMiddleware.isManager,
    createLoan);

route.put('/loans/:id',
    jwtMiddleware,
    authMiddleware.isAdmin,
    updateLoan);

route.put('/loans/:id/issue',
    jwtMiddleware,
    authMiddleware.isAdmin,
    updateIssueLoan);

export default route;
