import { Router } from 'express';

import { loans } from '../../controllers';
import { authMiddleware, verifyJwtToken } from '../../middlewares';

const router = Router();

router.get('/loans',
    verifyJwtToken,
    authMiddleware.isManagerOrAdmin,
    loans.getLoans);

router.get('/loans/:id',
    verifyJwtToken,
    authMiddleware.isAdmin,
    loans.getLoan);

router.post('/loans',
    verifyJwtToken,
    authMiddleware.isManager,
    loans.createLoan);

router.put('/loans/:id',
    verifyJwtToken,
    authMiddleware.isAdmin,
    loans.updateLoan);

router.put('/loans/:id/issue',
    verifyJwtToken,
    authMiddleware.isAdmin,
    loans.updateIssueLoan);

export default router;
