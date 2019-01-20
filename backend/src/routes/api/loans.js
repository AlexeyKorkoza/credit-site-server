import { Router } from 'express';

import {
    createLoan,
    updateLoan,
    updateIssueLoan,
} from '../../controllers/api/loans';
import { jwtMiddleware } from '../../middlewares/jwt';
import authMiddleware from '../../middlewares/auth';

const router = Router();

router.post('/loans',
    jwtMiddleware,
    authMiddleware.isManager,
    createLoan);

router.put('/loans/:id',
    jwtMiddleware,
    authMiddleware.isAdmin,
    updateLoan);

router.put('/loans/:id/issue',
    jwtMiddleware,
    authMiddleware.isAdmin,
    updateIssueLoan);

export default router;
