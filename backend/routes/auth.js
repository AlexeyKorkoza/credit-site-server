import express from 'express';

import { logIn } from '../controllers/auth';

const route = express();

route.post('/login', logIn);

export default route;
