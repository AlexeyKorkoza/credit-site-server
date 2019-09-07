import express from 'express';

import { auth } from '../controllers';
import { jwtMiddleware } from '../middlewares';
import validator from '../validator';

const route = express();

route.post('/login', validator.login, auth.logIn);
route.put('/refresh-token', jwtMiddleware, auth.updateRefreshToken);
route.get('/logout', jwtMiddleware, auth.logOut);

export default route;
