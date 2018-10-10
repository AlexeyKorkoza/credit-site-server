import express from 'express';

import users from './users';
import managers from './managers';

const route = express.Router();

route.use('/', users);
route.use('/', managers);

export default route;
