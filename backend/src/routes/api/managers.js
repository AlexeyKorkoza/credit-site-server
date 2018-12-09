import express from 'express';

import {
    updateAttributesManager,
    updateProfileManager,
    changePassword,
    blockManager,
} from '../../controllers/api/managers';
import { jwtMiddleware } from "../../middlewares/jwt";
import authMiddleware from '../../middlewares/auth';

const route = express.Router();

route.put('/managers/:id', updateAttributesManager);

route.put('/managers/update-profile',
    jwtMiddleware,
    authMiddleware.isAdmin,
    updateProfileManager);

route.put('/managers/change-password',
    jwtMiddleware,
    authMiddleware.isAdmin,
    changePassword);

route.put('/managers/block',
    jwtMiddleware,
    authMiddleware.isAdmin,
    blockManager);

export default route;
