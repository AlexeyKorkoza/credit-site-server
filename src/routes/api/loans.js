import { Router } from 'express';

import { loans } from '../../controllers';
import { authMiddleware, jwtMiddleware } from '../../middlewares';

const router = Router();

router.get('/loans',
    jwtMiddleware,
    authMiddleware.isManagerOrAdmin,
    loans.getLoans);

router.get('/loans/:id',
    jwtMiddleware,
    authMiddleware.isAdmin,
    loans.getLoan);

router.post('/loans',
    jwtMiddleware,
    authMiddleware.isManager,
    loans.createLoan);

router.put('/loans/:id',
    jwtMiddleware,
    authMiddleware.isAdmin,
    loans.updateLoan);

router.put('/loans/:id/issue',
    jwtMiddleware,
    authMiddleware.isAdmin,
    loans.updateIssueLoan);

export default router;
