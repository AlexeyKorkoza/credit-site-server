import express from 'express';

import { auth } from '../controllers';
import { verifyJwtToken } from '../middlewares';
import validator from '../validator';

const route = express();

route.post('/login', validator.login, auth.logIn);
route.put('/refresh-token', verifyJwtToken, auth.updateRefreshToken);
route.get('/logout', verifyJwtToken, auth.logOut);

export default route;
