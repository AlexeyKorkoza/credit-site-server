import express from 'express';

import {
    logIn,
    updateRefreshToken,
    logOut,
} from '../controllers/auth';
import { jwtMiddleware } from '../middlewares/jwt';

const route = express();

route.post('/login', logIn);
route.put('/refresh-token', jwtMiddleware, updateRefreshToken);
route.get('/logout', jwtMiddleware, logOut);

export default route;
