import express from 'express';

import { logIn, updateRefreshToken } from '../controllers/auth';
import { jwtMiddleware } from '../middlewares/jwt';

const route = express();

route.post('/login', logIn);
route.put('/refresh-token', jwtMiddleware, updateRefreshToken);

export default route;
